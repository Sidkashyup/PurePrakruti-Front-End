import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
// import Cookies from 'js-cookie';
// import pure from '../resource/co2.png';
import { AuthContext } from '../AuthContext';
import Cookies from 'js-cookie';
import pure from '../resource/PurePrakritibgImg.jpg';
import downloadIcon from '../resource/Vector.png';
import { AiOutlineClose } from 'react-icons/ai';
// import html2pdf from "html2pdf.js";

export const handleDownload = async (pdfUrl) => {
	try {
		const response = await fetch(pdfUrl);
		const blob = await response.blob();
		// console.log('pdf data is', blob)
		const url = window.URL.createObjectURL(blob);

		const a = document.createElement('a');
		a.href = url;
		a.download = 'certificate.pdf'; // Ensure a proper filename
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);

		window.URL.revokeObjectURL(url); // Cleanup
	} catch (error) {
		console.error('Error downloading PDF:', error);
	}
};

export const CarbonFootprint = () => {
	const authContext = useContext(AuthContext);
	const user = authContext?.user;
	const userId = user?.userId;

	const [formData, setFormData] = useState({
		VechileNumber: '',
		SourcePincode: '',
		DestinationPincode: '',
		MobilizationDistance: '',
		DemobilizationDistance: '',
		LoadedWeight: '',
	});
	const [response, setResponse] = useState(null);
	const [error, setError] = useState(null);
	const [showSignupMessage, setShowSignupMessage] = useState(false); // For signup prompt
	const [pdfUrl, setPdfUrl] = useState('');
	const [isFirstTime, setIsFirstTime] = useState(true);

	const userName = Cookies.get('userName'); // Get the userId from cookies

	useEffect(() => {
		const isFirstTimeData = localStorage.getItem('isFirstTime');
		console.log('isFirstTimeData', isFirstTimeData);
		setIsFirstTime(isFirstTimeData === 'false' ? false : true);
		setShowSignupMessage(!userId && isFirstTimeData === 'false' ? true : false);
	}, []);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value.toUpperCase(),
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError(null);
		setResponse(null);
		setShowSignupMessage(false);

		try {
			// Check for `userId` in cookies
			// const userId = Cookies.get('userId');

			// Check if the carbon footprint API has already been called
			// const isFirstTime = localStorage.getItem('isFirstTime') !== 'false'; // By default, it's true

			if (!userId) {
				if (isFirstTime) {
					// First-time submission without userId
					const { data } = await axios.post(
						'https://pureprakruti.com/api/vehicle/getCarbonFootPrints',
						formData
					);

					// Save the response and show a signup message for subsequent interactions
					setResponse(data);
					setShowSignupMessage(true);

					// Set the flag to false after the first submission
					localStorage.setItem('isFirstTime', 'false');

					const isFirstTimeData = localStorage.getItem('isFirstTime');
					// console.log('isFirstTimeData', isFirstTimeData);
					setIsFirstTime(isFirstTimeData === 'false' ? false : true);
				} else {
					// If it's not the first time, prompt the user to sign up or log in
					setShowSignupMessage(true);
				}
			} else {
				// User is logged in, fetch carbon emission details
				const { data } = await axios.post(
					'https://pureprakruti.com/api/vehicle/findCO2Emission',
					{
						...formData,
						userId,
					}
				);
				setResponse(data);

				const pdfUrlData = await axios.post(
					`https://pureprakruti.com/api/vehicle/generateCarbonFootprintPDF`,
					{
						id: data.id,
						userId,
					}
				);
				setPdfUrl(pdfUrlData.data.url);
				console.log(pdfUrlData.data.url);
			}
		} catch (err) {
			setError(
				err.response?.data?.message || 'An error occurred while fetching data.'
			);
		}
	};

	const closeModal = () => {
		setResponse(null);
		setFormData({
			VechileNumber: '',
			SourcePincode: '',
			DestinationPincode: '',
			MobilizationDistance: '',
			DeMobilizationDistance: '',
			LoadedWeight: '',
		});
	};

	return (
		<div className="w-screen min-h-screen overflow-auto items-center justify-center bg-cover bg-center bg-opacity-40 relative">
			<img
				className="absolute inset-0 w-full h-full object-center"
				src="/bglogin3.jpg"
				alt="Background image"
			/>

			<div className="absolute inset-0 bg-black/10" />

			<div className="relative z-10 w-full max-w-7xl mx-auto px-4 py-20 md:mt-24">
				<div className="text-center mb-12">
					<h2 className="text-4xl md:text-5xl font-bold text-gray-200 mb-4">
						Carbon Footprint Calculator
					</h2>
					<p className="text-lg md:text-2xl text-green-100">
						Calculate your vehicle's environmental impact and get certified
						emissions data
					</p>
				</div>

				<div className="flex justify-center">
					<div className="bg-gradient-to-r from-green-900/70 to-green-950/50 backdrop-blur-md border border-white/80 p-6 md:p-10 lg:p-12 rounded-lg shadow-xl max-w-5xl w-full">
						<form onSubmit={handleSubmit} className="space-y-6">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								{[
									'VechileNumber',
									'SourcePincode',
									'DestinationPincode',
									'MobilizationDistance',
									'DemobilizationDistance',
									'LoadedWeight',
								].map((field) => (
									<div key={field}>
										<label
											className="block text-xl font-medium mb-2 text-gray-100"
											htmlFor={field}
										>
											{field.replace(/([A-Z])/g, ' $1').trim()}
											{![
												'MobilizationDistance',
												'DemobilizationDistance',
											].includes(field) && '*'}
										</label>
										<input
											type="text"
											id={field}
											name={field}
											value={formData[field] || ''}
											onChange={handleChange}
											className="w-full px-6 py-3 border text-xl border-white/60 rounded text-white placeholder-white/80 bg-green-700/50 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-green-400"
											required={
												![
													'MobilizationDistance',
													'DemobilizationDistance',
												].includes(field)
											}
										/>
									</div>
								))}
							</div>

							<div className="w-full flex justify-end text-center">
								<button
									type="submit"
									className="px-8 py-4 w-full md:w-fit bg-green-600 text-white text-xl rounded-lg shadow hover:bg-green-700 focus:ring-2 focus:ring-green-400 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
									disabled={!isFirstTime && !userId}
								>
									Get Result
								</button>
							</div>
						</form>

						{error && (
							<p className="mt-4 text-red-500 text-center text-lg">
								Error: {error}
							</p>
						)}

						{response && (
							<div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
								<div className="bg-white p-6 md:p-8 rounded-lg shadow-xl w-full max-w-lg">
									<button
										onClick={closeModal}
										className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 transition-colors"
									>
										<AiOutlineClose size={24} />
									</button>

									<h2 className="text-3xl font-bold mb-6 text-center text-green-700">
										Emission Details
									</h2>

									<div className="space-y-3 text-green-800 text-lg">
										<p>
											<strong>Total CO2 Emission:</strong>{' '}
											{response.co2Emission} kg
										</p>
										<p>
											<strong>Vehicle Number:</strong> {response.vehicleNumber}
										</p>
										<p>
											<strong>Certificate Issue Date:</strong>{' '}
											{response.certificateIssueDate}
										</p>
										<p>
											<strong>Certificate Number:</strong>{' '}
											{response.certificateNumber}
										</p>
									</div>

									{userId && pdfUrl && (
										<button
											onClick={() => handleDownload(pdfUrl)}
											className="mt-6 flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 focus:ring-2 focus:ring-green-400 transition-colors"
										>
											Download
											<img
												src={downloadIcon}
												alt="Download Icon"
												className="w-5 h-5"
											/>
										</button>
									)}
								</div>
							</div>
						)}

						{showSignupMessage && (
							<p className="mt-6 text-center text-blue-400 text-lg">
								Please{' '}
								<a
									href="/signup"
									className="underline font-medium hover:text-blue-300"
								>
									sign up
								</a>{' '}
								to continue tracking your carbon emissions.
							</p>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};
