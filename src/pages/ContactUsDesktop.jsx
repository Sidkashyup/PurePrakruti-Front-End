import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { ReactComponent as MailIcon } from '../resource/mail3.svg';
import { ReactComponent as LocIcon } from '../resource/loc.svg';
import { ReactComponent as CallIcon } from '../resource/call.svg';

export const ContactUsDesktop = () => {
	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		email: '',
		phone: '',
		message: '',
	});
	const [showSuccess, setShowSuccess] = useState(false);

	const { firstName, lastName, email, phone, message } = formData;

	const handleOnChange = (e) => {
		setFormData((prevData) => ({
			...prevData,
			[e.target.name]: e.target.value,
		}));
	};

	const handleOnSubmit = async (e) => {
		e.preventDefault();
		console.log('Form submitted!');
		try {
			const response = await axios.post('https://pureprakruti.com/api/query', {
				fullName: `${firstName} ${lastName}`,
				email,
				phone,
				message,
			});
			setShowSuccess(true);
			setTimeout(() => setShowSuccess(false), 3000);

			if (response.status === 200) {
				console.log('Query submitted successfully!');
				// tostershow();
			} else {
				console.error('Failed to submit query.');
			}

			console.log('formdata values', formData);
		} catch (error) {
			console.error('Error submitting query:', error);
		}

		setFormData({
			firstName: '',
			lastName: '',
			email: '',
			phone: '',
			message: '',
		});
	};

	// const tostershow = () => {
	//   toast.success('Query Raised successfully!', {
	//     position: "bottom-right",
	//     autoClose: 3000,
	//     hideProgressBar: false,
	//     closeOnClick: true,
	//     pauseOnHover: true,
	//     draggable: true,
	//     progress: undefined,
	//     className: 'bg-green-600 text-white',
	//     bodyClassName: 'text-sm',
	//     icon: <span style={{ fontSize: '20px' }}>✅</span>,
	//   });
	// };

	return (
		<div className="min-h-screen overflow-auto relative">
			<img
				className="absolute top-0 left-0 w-full h-full object-cover z-0"
				src="/bglogin3.jpg"
				alt="Background image ;"
			/>
			<ToastContainer />

			<div className="bg-green-0 relative pb-3 min-h-screen flex items-center justify-center">
				<div className="max-w-4xl mx-auto mt-10 text-center p-5">
					<h2 className="pt-15 text-5xl font-bold text-gray-100">Contact Us</h2>
					<p className="text-green-100 text-3xl mt-8">
						Join the revolution in road logistics by reducing carbon emissions
						and ensuring compliance with global environmental standards.
					</p>

					<div className="max-w-6xl mx-auto w-full mt-40 px-4">
						<div className="flex justify-center items-center mb-4">
							<span className="text-green-900 bg-green-200/90 font-semibold px-4 py-1 rounded-full mb-6 text-lg uppercase tracking-wider">
								Reach Out To Us
							</span>
						</div>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
							<div className="flex items-start gap-4">
								<MailIcon className="w-14 h-14 sm:w-12 sm:h-12 lg:w-16 lg:h-16 text-white " />
								<div>
									<h4 className="font-bold text-xl text-gray-100">
										Email Support
									</h4>
									<p className="text-gray-200 text-lg">
										Our team can respond in real time.
									</p>
									<a
										href="mailto:team@tsil.net.in"
										className="text-green-300 text-lg font-medium hover:underline"
									>
										team@tsil.net.in
									</a>
									<br />
									<a
										href="mailto:siddharth@tsil.net.in"
										className="text-green-300 text-lg font-medium hover:underline"
									>
										siddharth@tsil.net.in
									</a>
								</div>
							</div>
							<div className="flex items-start gap-4">
								<LocIcon className="w-14 h-14 scale-[2.3] mr-1 text-white" />
								<div>
									<h4 className="font-bold text-gray-100 text-xl">
										Visit Our Office
									</h4>
									<p className="text-gray-200 text-lg">
										Visit our location in real life.
									</p>
									<a
										href="https://maps.app.goo.gl/rRJx9bAN9PjNQMfe7"
										target="_blank"
										rel="noopener noreferrer"
										className="text-green-300 text-lg font-medium hover:underline"
									>
										Corporate Office: 609, Tower II, Pearls Omaxe, Netaji
										Subhash Place, Pitampura, New Delhi - 110034. Delhi, INDIA.
									</a>
								</div>
							</div>
							<div className="flex items-start gap-4">
								<CallIcon className="w-11 h-11 text-gray-100" />
								<div>
									<h4 className="font-bold text-gray-100 text-xl">
										Call Us Directly
									</h4>
									<p className="text-gray-200 text-lg">
										Available during working hours.
									</p>
									<a
										href="tel:+919661829944"
										className="text-green-300 text-lg font-medium hover:underline"
									>
										+91-96618 29944
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
				{showSuccess && (
					<div className="fixed top-10 right-10 bg-green-600 text-white p-6 text-xl rounded shadow-lg z-50">
						Query raised successfully!
					</div>
				)}

				<div className="max-w-5xl w-full mx-auto mt-20 bg-transparent p-3 rounded-lg shadow-lg flex flex-col md:flex-row gap-8 mb-6 overflow-hidden">
					<div className="w-full mx-auto bg-gradient-to-r from-green-900/70 to-green-950/50 backdrop-blur-md border border-white/80 p-3 md:p-10 rounded-lg flex flex-col gap-6">
						<form onSubmit={handleOnSubmit} className="flex flex-col gap-6">
							<div className="flex flex-col md:flex-row gap-6">
								<div className="w-full md:w-1/2 flex flex-col gap-8">
									<div className="">
										<label className="block text-gray-100 text-xl mb-2">
											First Name*
										</label>
										<input
											type="text"
											name="firstName"
											value={firstName}
											onChange={handleOnChange}
											className="w-full text-xl border border-white/60 rounded p-2 text-white placeholder-white/80 bg-green-700/50 backdrop-blur-md focus:outline-none focus:ring-1 focus:ring-green-400"
											placeholder="First Name"
											required
										/>
									</div>
									<div>
										<label className="block text-gray-100 text-xl mb-2">
											Last Name
										</label>
										<input
											type="text"
											name="lastName"
											value={lastName}
											onChange={handleOnChange}
											className="w-full text-xl border border-white/60 rounded p-2 text-white placeholder-white/80 bg-green-700/50 backdrop-blur-md focus:outline-none focus:ring-1 focus:ring-green-400"
											placeholder="Last Name"
										/>
									</div>
									<div>
										<label className="block text-gray-100 text-xl mb-2">
											Email*
										</label>
										<input
											type="email"
											name="email"
											value={email}
											onChange={handleOnChange}
											className="w-full text-xl border border-white/60 rounded p-2 text-white placeholder-white/80 bg-green-700/50 backdrop-blur-md focus:outline-none focus:ring-1 focus:ring-green-400"
											placeholder="example@gmail.com"
											required
										/>
									</div>
									<div>
										<label className="block text-gray-100 text-xl mb-2">
											Phone Number
										</label>
										<input
											type="text"
											name="phone"
											value={phone}
											onChange={handleOnChange}
											className="w-full text-xl border border-white/60 rounded p-2 text-white placeholder-white/80 bg-green-700/50 backdrop-blur-md focus:outline-none focus:ring-1 focus:ring-green-400"
											placeholder="+91"
										/>
									</div>
								</div>
								<div className=" md:w-1/2 h-[400px] w-full rounded-md overflow-hidden self-center">
									<iframe
										src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28911.023034541106!2d77.22371!3d28.6333333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd7fc38a8187%3A0x7abb73aa8c418882!2sParivahan%20Vings%20(KAL)%20Private%20Limited!5e0!3m2!1sen!2sin!4v1690137192828!5m2!1sen!2sin"
										className="w-full h-full"
										allowFullScreen
										loading="lazy"
										title="Map"
									></iframe>
								</div>
							</div>
							<div className="flex flex-col gap-0">
								<label className="block text-gray-100 text-xl mb-2">
									Query*
								</label>
								<textarea
									name="message"
									value={message}
									onChange={handleOnChange}
									className="w-full text-xl border border-white/60 rounded p-2 text-white placeholder-white/80 bg-green-700/50 backdrop-blur-md focus:outline-none focus:ring-1 focus:ring-green-400"
									placeholder="Enter your query here"
									rows="4"
									required
								/>
								<button
									className="bg-green-600 text-white text-lg px-12 py-4 mt-6 rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-blue-300 w-fit self-end"
									type="submit"
								>
									Send
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ContactUsDesktop;
