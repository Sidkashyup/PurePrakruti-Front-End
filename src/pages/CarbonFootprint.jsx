import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
// import Cookies from 'js-cookie';
// import pure from '../resource/co2.png';
import { AuthContext } from "../AuthContext";
import Cookies from 'js-cookie';
import pure from '../resource/PurePrakritibgImg.jpg';
import downloadIcon from '../resource/Vector.png';
import { AiOutlineClose } from "react-icons/ai";
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
        Vehicle_Number: '',
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


    const userName = Cookies.get("userName"); // Get the userId from cookies

    useEffect(() => {
        const isFirstTimeData = localStorage.getItem('isFirstTime');
        console.log('isFirstTimeData', isFirstTimeData);
        setIsFirstTime(isFirstTimeData === "false" ? false : true);
        setShowSignupMessage(!userId && isFirstTimeData === "false" ? true : false);
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
                    const { data } = await axios.post('http://localhost:4500/api/vehicle/getCarbonFootPrints', formData);

                    // Save the response and show a signup message for subsequent interactions
                    setResponse(data);
                    setShowSignupMessage(true);

                    // Set the flag to false after the first submission
                    localStorage.setItem('isFirstTime', 'false');

                    const isFirstTimeData = localStorage.getItem('isFirstTime');
                    // console.log('isFirstTimeData', isFirstTimeData);
                    setIsFirstTime(isFirstTimeData === "false" ? false : true);
                } else {
                    // If it's not the first time, prompt the user to sign up or log in
                    setShowSignupMessage(true);
                }
            } else {
                // User is logged in, fetch carbon emission details
                const { data } = await axios.post('http://localhost:4500/api/vehicle/findCO2Emission', {
                    ...formData,
                    userId,
                });
            //     // const { data } = await axios.post('http://localhost:4500/api/vehicle/calculateEmissionAndSave', {
            //     // userId,
            //     // sourcePincode: formData.SourcePincode,
            //     // destinationPincode: formData.DestinationPincode,
            //     // vehicleData: {
            //     //     // add more if you need
            //     //     mobilizationDistance: formData.MobilizationDistance,
            //     //     demobilizationDistance: formData.DemobilizationDistance,
            //     //     loadedWeight: formData.LoadedWeight,
            //     // }
            // });
                setResponse(data);

                const pdfUrlData = await axios.post(`http://localhost:4500/api/vehicle/generateCarbonFootprintPDF`, {
                    id: data.id,
                    userId,
                });
                setPdfUrl(pdfUrlData.data.url);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred while fetching data.');
        }
    };

    const closeModal = () => {
        setResponse(null);
        setFormData({
            Vehicle_Number: '',
            SourcePincode: '',
            DestinationPincode: '',
            MobilizationDistance: '',
            DeMobilizationDistance: '',
            LoadedWeight: '',
        });
    };

    return (
        <div
            className="w-screen min-h-screen overflow-auto items-center justify-center bg-cover bg-center bg-opacity-40 relative"
        >
            <img className="absolute top-0 left-0 w-full h-full object-cover z-0" src="/bglogin3.jpg" alt="Background image" />
            <div className='relative'>
            <div> 
                <h1 className="pt-40 text-5xl font-bold text-center mb-4 text-gray-200">Carbon Footprint Calculator</h1>
                <h2 className="pt-4 text-3xl text-center mb-8 text-green-100">Calculate your vehicle's environmental impact and get certified emissions data</h2>
            </div>
            <div className="flex justify-center items-center bg-opacity-40">
                <div className="bg-green-900/60 backdrop-blur-md border border-white/80 p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 rounded-lg shadow-xlmax-w-3xl w-full lg:max-w-4xl xl:max-w-5xl m-4 flex flex-col justify-center">
                    <form onSubmit={handleSubmit} className="space-y-2">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-12 text-gray-100">
                            {['Vehicle_Number', 'SourcePincode', 'DestinationPincode', 'MobilizationDistance', 'DemobilizationDistance', 'LoadedWeight'].map((field) => (
                                <div key={field}>
                                    <label className="block text-xl font-medium mb-2" htmlFor={field}>
                                        {field.replace(/([A-Z])/g, ' $1').trim()}{['MobilizationDistance', 'DemobilizationDistance'].includes(field) ? '' : '*'}
                                    </label>
                                    <input
                                        type="text"
                                        id={field}
                                        name={field}
                                        value={formData[field] || ""}
                                        onChange={handleChange}
                                        className="w-full px-6 py-3 border text-xl border-white/60 rounded p-2 text-white placeholder-white/80 bg-green-700/50 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-green-400"
                                        required={!['MobilizationDistance', 'DemobilizationDistance'].includes(field)}
                                    />
                                </div>
                            ))}
                        </div>

                        <div className="pt-16 text-center justify-center">
                            <button
                                type="submit"
                                className="px-8 py-4  bg-green-600 text-white text-xl rounded-lg shadow 
                                            hover:bg-green-700 focus:ring-2 focus:ring-blue-300 
                                            disabled:bg-gray-400 disabled:cursor-not-allowed"
                                disabled={!isFirstTime && !userId}
                            >
                                Get Result
                            </button>

                        </div>
                    </form>

                    {error && <p className="mt-4 text-red-500 text-center">Error: {error}</p>}

                    {response &&
                        (
                            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                                <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg md:w-3/4 lg:w-1/2 xl:w-1/3 relative">

                                    {/* Close Icon */}
                                    <button
                                        onClick={closeModal}
                                        className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                                    >
                                        <AiOutlineClose size={24} />
                                    </button>

                                    <h2 className="text-3xl font-bold mb-4 text-center text-green-700">Emission Details</h2>

                                    <div className="pl-5 space-y-2 text-green-800">
                                        <p><strong>Total CO2 Emission:</strong> {response.co2Emission} kg</p>
                                        <p><strong>Vehicle_Number:</strong> {response.vehicleNumber}</p>
                                        <p><strong>Certificate Issue Date:</strong> {response.certificateIssueDate}</p>
                                        <p><strong>Certificate Number:</strong> {response.certificateNumber}</p>
                                    </div>

                                    {/* Download Button */}
                                    {/* {userId && pdfUrl && <button
                                        onClick={generatePDF}
                                        className="mt-4 flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-900 focus:ring-2 focus:ring-blue-300"
                                    >
                                        Download
                                        <img src={downloadIcon} alt="Download Icon" className="w-5 h-5" />
                                    </button>} */}

                                    {/* {userId && pdfUrl && (
                                        <a
                                            href={pdfUrl}
                                            download="certificate.pdf" target="_blank" rel="noopener noreferrer"
                                            className="mt-4 flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-900 focus:ring-2 focus:ring-blue-300 w-32"
                                        >
                                            Download
                                            <img src={downloadIcon} alt="Download Icon" className="w-5 h-5" />
                                        </a>
                                    )} */}

                                    {userId && pdfUrl && (
                                        <button
                                            onClick={() => handleDownload(pdfUrl)}
                                            className="mt-4 flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-900 focus:ring-2 focus:ring-blue-300 w-32"
                                        >
                                            Download
                                            <img src={downloadIcon} alt="Download Icon" className="w-5 h-5" />
                                        </button>
                                    )}

                                </div>
                            </div>
                        )
                    }

                    {showSignupMessage && (
                        <p className="mt-4 text-center text-blue-600">
                            Please <a href="/signup" className="underline font-medium">sign up</a> to continue tracking your carbon emissions.
                        </p>
                    )}
                </div>
            </div>

        </div>
        </div>
    );
};