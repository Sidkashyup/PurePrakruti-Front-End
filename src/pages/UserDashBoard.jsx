
import React, { useEffect, useState, useContext } from 'react';

import { AuthContext } from "../AuthContext";
import { Chart } from 'react-google-charts';
import { color, motion } from "framer-motion";
import { FileText } from "lucide-react";

import KYCSection from "../components/KYCSection";


import natureImg from '../resource/natureImg.png';

import { handleDownload } from './CarbonFootprint';
import axios from "axios";



export const UserDashBoard = () => {
  const authContext = useContext(AuthContext);
  // const user = authContext?.user;
  const { user, setUser } = useContext(AuthContext);
  const userId = user?.userId;
  const userName = user?.userName;
  const [showKYCModal, setShowKYCModal] = useState(false);

  const openKYCModal = () => setShowKYCModal(true);
  const closeKYCModal = () => setShowKYCModal(false);
  

  const [dieselVehiclesData, setDieselVehiclesData] = useState([]);
  const [dieselVehiclesData1, setDieselVehiclesData1] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("fuel");
  const [selectedFuel, setSelectedFuel] = useState("Quick Download");
  const [selectedDateRange, setSelectedDateRange] = useState("Weekly");
  const [routeWiseEmissionData, setRouteWiseEmissionData] = useState([]);



  const [timeFilter, setTimeFilter] = useState("All");
  const [filteredData, setFilteredData] = useState([]);
  const data = React.useMemo(() => {
    if (routeWiseEmissionData.length === 0) {
      return [["Route", "Emission"], ["No Data", 1]];
    }
    const sorted = [...routeWiseEmissionData].sort((a, b) => b.totalEmission - a.totalEmission);
    const top10 = sorted.slice(0, 10);
    const othersSum = sorted.slice(10).reduce((sum, route) => sum + route.totalEmission, 0);

    const chartData = [
      ["Route", "Emission"],
      ...top10.map((route) => [route.route, route.totalEmission]),
    ];

    if (othersSum > 0) {
      chartData.push(["Others", othersSum]);
    }

    return chartData;
  }, [routeWiseEmissionData]);


//   const refreshUser = async () => {
//   try {
//     const response = await axios.get(`http://localhost:4500/api/auth/user/${user._id}`);
//     setUser(response.data); // ⬅️ updates AuthContext
//   } catch (error) {
//     console.error("❌ Failed to refresh user:", error);
//   }
// };

// useEffect(() => {
//   if (user?.userId || user?._id) {
//     refreshUser(); // ⬅️ THIS fetches full user data including KYC status
//   }
// }, []);



  const getDateRange = (range) => {
  const today = new Date();
  const endDate = today.toISOString().split("T")[0];

  let startDate;

  switch (range) {
    case "Daily":
      startDate = endDate;
      break;
    case "Weekly":
      startDate = new Date(today.setDate(today.getDate() - 7)).toISOString().split("T")[0];
      break;
    case "Monthly":
      startDate = new Date(today.setMonth(today.getMonth() - 1)).toISOString().split("T")[0];
      break;
    case "Yearly":
      startDate = new Date(today.setFullYear(today.getFullYear() - 1)).toISOString().split("T")[0];
      break;
    default:
      startDate = endDate;
  }

  return { startDate, endDate };
};



  useEffect(() => {
    if (!userId) {
      setLoading(true);
      return;
    }

    const fetchCarbonFootprintData = async () => {
      try {
        const [response1, response2, routeResponse] = await Promise.all([
          fetch(`http://localhost:4500/api/vehicle/carbonfootprint/dieselvehicles/${userId}`),
          fetch(`http://localhost:4500/api/vehicle/carbonfootprint/dieselvehicles1/${userId}`),
          fetch(`http://localhost:4500/api/vehicle/routewiseEmission/${userId}`)
        ]);

        if (!response1.ok) throw new Error(`Failed to fetch dieselvehicles data ${error}`);
        if (!response2.ok) throw new Error(`Failed to fetch dieselvehicles1 data ${error}`);
        if (!routeResponse.ok) throw new Error("Failed to fetch route-wise emission data");

        const data1 = await response1.json();
        const data2 = await response2.json();
        const routeData = await routeResponse.json();

        console.log('pdf Data', data2);

        setDieselVehiclesData(data1?.carbonFootprintData || []);
        setFilteredData(data1?.carbonFootprintData || []);
        setDieselVehiclesData1(data2?.carbonFootprintData || []);
        setRouteWiseEmissionData(routeData?.routewiseEmissionData || []);
      } catch (err) {
        setError(err.message || "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchCarbonFootprintData();
  }, [userId]);

  useEffect(() => {
    if (!dieselVehiclesData.length) return;

    let filtered = [];
    let dateLabels = new Map();
    const now = new Date();

    dieselVehiclesData.forEach((item) => {
      const itemDate = new Date(item.date);
      let label = "";

      if (timeFilter === "All") {
        label = itemDate.toISOString().split("T")[0];
      } else if (timeFilter === "Week") {
        const weekAgo = new Date();
        weekAgo.setDate(now.getDate() - 7);
        if (itemDate >= weekAgo) {
          label = itemDate.toLocaleDateString("en-US", { weekday: "short" });
        }
      } else if (timeFilter === "Month") {
        label = `Week ${Math.ceil(itemDate.getDate() / 7)}`;
      } else if (timeFilter === "Year") {
        label = itemDate.toLocaleDateString("en-US", { month: "long" });
      }

      if (label) {
        dateLabels.set(label, (dateLabels.get(label) || 0) + parseFloat(item.carbonFootprint));
      }
    });

    filtered = Array.from(dateLabels.entries()).map(([date, value]) => ({
      date,
      carbonFootprint: value,
    }));

    setFilteredData(filtered);
  }, [timeFilter, dieselVehiclesData]);

  if (loading) return;


  // const downloadCSVReport = async () => {
  //   try {
  //     // Construct the URL for the API call with selected filters
  //     const response = await fetch(
  //       `http://localhost:4500/api/vehicle/carbonfootprintbyfueltype?fuelType=${selectedFuel}&${selectedDateRange}=true`
  //     );
      

  //     if (!response.ok) {
  //       throw new Error("Failed to fetch report data");
  //     }

  //     const data = await response.json();

  //     // Check if data contains carbonFootprintData
  //     if (!data.carbonFootprintData) {
  //       throw new Error("No carbon footprint data available");
  //     }

  //     // Create CSV content
  //     const csvContent = [
  //       ["Date", "VechileNumber", "Fuel Type", "Carbon Emission (kg CO2)", "Last Updated"],
  //       ...data.carbonFootprintData.map((item) => [
  //         item.date,
  //         item.vehicleNumber,
  //         item.fuelType,
  //         item.carbonFootprint,
  //         new Date(item.updatedAt).toLocaleDateString(),
  //       ]),
  //     ]
  //       .map((row) => row.join(","))
  //       .join("\n");

  //     // Create a Blob and trigger the download
  //     const blob = new Blob([csvContent], { type: "text/csv" });
  //     const url = window.URL.createObjectURL(blob);
  //     const link = document.createElement("a");
  //     link.href = url;
  //     link.setAttribute("download", `Carbon_Footprint_Report_${selectedFuel}.csv`);
  //     document.body.appendChild(link);
  //     link.click();
  //     document.body.removeChild(link);

  //   } catch (error) {
  //     console.error("Error downloading report:", error);
  //   }
  // };

  const downloadCSVReport = async () => {
  try {
    if (!selectedFuel && !selectedDateRange) {
      alert("Please select fuel type or date range");
      return;
    }

    let url = `http://localhost:4500/api/vehicle/carbonfootprintbyfueltype?`;

    if (selectedFuel) url += `fuelType=${selectedFuel}&`;

    if (selectedDateRange) {
      const { startDate, endDate } = getDateRange(selectedDateRange);
      url += `startDate=${startDate}&endDate=${endDate}`;
    }

    console.log("Requesting report from:", url);

    const response = await fetch(url);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Backend error response:", errorText);
      throw new Error("Failed to fetch report data");
    }

    const data = await response.json();

    if (!data.carbonFootprintData || !data.carbonFootprintData.length) {
      throw new Error("No carbon footprint data available");
    }

    // Generate CSV and download...
    const csvContent = [
      ["Date", "VechileNumber", "Fuel Type", "Carbon Emission (kg CO2)", "Last Updated", "Download PDF Link"],
      ...data.carbonFootprintData.map((item) => [
        item.date,
        item.vehicleNumber,
        item.fuelType,
        item.carbonFootprint,
        new Date(item.updatedAt).toLocaleDateString(),
        item.pdfUrl ? `=("${item.pdfUrl}")` : "No PDF Available"
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const blobUrl = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = blobUrl;
    link.setAttribute("download", `Carbon_Footprint_Report_${selectedFuel || selectedDateRange}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

  } catch (error) {
    console.error("Error downloading report:", error);
  }
};



  const topEmittingVehicle =
    dieselVehiclesData.length > 0
      ? dieselVehiclesData.reduce(
        (max, item) =>
          parseFloat(item.carbonFootprint) > parseFloat(max.carbonFootprint) ? item : max,
        dieselVehiclesData[0]
      )
      : null;

  const totalVehicles = dieselVehiclesData1.length;
  const totalEmission = dieselVehiclesData.reduce((total, item) => total + parseFloat(item.carbonFootprint), 0);

  // const data = routeWiseEmissionData.length > 0
  //   ? [
  //     ["Route", "Emission"],
  //     ...routeWiseEmissionData.map((route) => [route.route, route.totalEmission]),
  //   ]
  //   : [["Route", "Emission"], ["No Data", 1]]; // Placeholder data to avoid errors


  const options = {
    title: "",
    titleTextStyle: {
      fontSize: 30,
      bold: true,
      color: "#FFFFFF",
    },
    backgroundColor: "#e3ffea",
    pieHole: 0, // Full pie (0) or donut (0.4)
    slices: {
      0: { color: "#007bff" }, // Blue
      1: { color: "#ff9800" }, // Orange
      2: { color: "#e91e63" }, // Red
      3: { color: "#4caf50" }, // Green
      4: { color: "#9c27b0" }, // Purple
      5: { color: "#ffeb3b" }, // Yellow
    },
    legend: {
      position: "labeled",
      textStyle: { fontSize: 14 },
    },
    pieSliceText: "percentage",
    chartArea: { width: "90%", height: "90%" },
  };


    const handleAadharSubmit = async (formData) => {
  try {
    const response = await axios.post("http://localhost:4500/api/kyc/verify/aadhar", {
      ...formData,
      userId: user._id, // make sure 'user' is defined
    });


    console.log("✅ Aadhar Verified:", response.data);
    alert("Aadhar Verified Successfully!");
        // await refreshUser();
  } catch (error) {
    console.error("❌ Aadhar Verification Failed:", error.response?.data || error.message);
    alert("Aadhar verification failed.");
  }
};

    const handlePanSubmit = async (data) => {
  const requestBody = {
    panno: data.panno,
    PANFullName: data.PANFullName,
    userId: user?.userId || user?._id,        // ✅ FIXED THIS LINE
    code: "mock",
    code_verifier: "mock",
  };
  

  console.log("📤 Sending PAN request body:", requestBody);
  console.log("🟡 User ID (should be defined):", user?.userId);

  if (!requestBody.userId) {
    alert("❌ userId is missing! Cannot proceed.");
    return;
  }

  try {
    const response = await axios.post("http://localhost:4500/api/kyc/verify/pan", requestBody);
    console.log("✅ PAN Verified:", response.data);
    alert("PAN Verified Successfully!");
    // await refreshUser();
  } catch (err) {
    console.error("❌ PAN Verification Failed:", err?.response?.data?.message || err.message);
    alert("PAN verification failed.");
  }
};
    const handleDlSubmit = async (data) => {
      
  const requestBody = {
    dlnumber: data.dlnumber,
    dob: data.dob,
    userId: user?.userId,
  };

  console.log("🧾 User ID (should be defined):",user?.userId);
  console.log("📤 Sending DL request:", requestBody);

  try {
    const response = await axios.post("http://localhost:4500/api/kyc/verify/drivingLicence", requestBody);
    console.log("✅ DL Verified:", response.data);
    alert("Driving License Verified Successfully!");
    // await refreshUser();
  } catch (error) {
    console.error("❌ DL Verification Failed:", error?.response?.data?.message || error.message);
    alert("DL verification failed.");
  }
};


  return (
    <div className='w-screen'>
      <div
        style={{ backgroundImage: `url(${natureImg})` }}
        className="w-full min-h-[100px] bg-cover bg-center bg-no-repeat text-white p-6 text-center flex flex-wrap items-center justify-between"
      >
        <div className="text-lg md:text-2xl lg:text-3xl font-bold w-full md:w-[30%] lg:w-[20%] text-center md:text-left">
          Carbon Emission Analysis
        </div>
      </div>


      <div className="fixed top-5 right-32 z-50">
  <button 
    onClick={openKYCModal}
    className="bg-green-600 hover:bg-green-700 text-white text-2xl px-6 py-3 rounded-full shadow-lg"
  >
    Verify KYC
  </button>
</div>

{showKYCModal && (
  <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
    <div className="bg-green-900 backdrop-blur-md w-full max-w-3xl p-8 rounded-lg shadow-lg relative overflow-y-auto max-h-[90vh] border-white/60 border">
      {/* Close Button */}
      <button 
        onClick={closeKYCModal}
        className="absolute top-3 right-4 text-white hover:text-red-500 text-4xl"
      >
        &times;
      </button>

      <h2 className="text-3xl font-semibold mb-4 text-gray-100">KYC Verification</h2>

      <KYCSection
  title="Aadhar Verification"
  verified={user.kyc?.aadhar?.verified}
  fields={[
    { label: "Aadhar Number", key: "uid" },
    { label: "Name", key: "name" },
    { label: "DOB (YYYYMMDD)", key: "dob" },
    { label: "Gender (M/F)", key: "gender" },
    { label: "Mobile", key: "mobile" }
  ]}
  onSubmit={handleAadharSubmit}
/>
<KYCSection
  title="PAN Verification"
  verified={user?.kyc?.pan?.verified}
  fields={[
    { key: "panno", label: "PAN Number" },
    { key: "PANFullName", label: "Full Name (as per PAN)" },
  ]}
  user={user} 
  onSubmit={handlePanSubmit}
/>
<KYCSection
  title="Driving License Verification"
  verified={user?.kyc?.drivingLicence?.verified}
  fields={[
    { key: "dlnumber", label: "DL Number" },
    { key: "dob", label: "DOB (YYYYMMDD)" }
  ]}
  onSubmit={handleDlSubmit}
/>
    </div>
  </div>
)}


      


      <div className="min-h-full px-24 py-8 relative">
        <div>
          
          <img className="absolute top-0 left-0 w-full h-full object-cover z-0 opacity-90" src="/bglogin3.jpg" alt="Background image" />
          {/* <div className=" relative text-lg md:text-2xl lg:text-3xl font-bold w-full md:w-[30%] lg:w-[20%] text-center md:text-left text-white mt-4 mb-12">
          Carbon Emission Analysis
        </div> */}

          

        <motion.div
          className="flex justify-center align-middle mt-4 px-40 relative"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-white w-5/6">
            {/* Container for Cards */}
            <div className="flex flex-wrap justify-center md:justify-between gap-6">
              {/* Top Emitting Vehicle */}
              {/* {topEmittingVehicle && (
                
              )} */}

              <motion.div
                className="bg-gradient-to-r from-green-600/80 to-green-900 p-6 rounded-xl shadow-lg min-h-[170px] min-w-[350px] w-full sm:w-1/3 md:w-1/3 lg:w-2/4 xl:w-1/4 text-center border border-gray-300 hover:shadow-xl transform transition duration-300 hover:scale-105"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="font-bold text-2xl text-white">{`🚛 GreenLine Freight: ${topEmittingVehicle?.vehicleNumber ?? 'N/A'}`}</div>
                <h1 className="text-gray-200 text-xl mt-2">Top Emitting Vehicle</h1>
              </motion.div>

              {/* Total Vehicles */}
              <motion.div
                className="bg-gradient-to-r from-green-700 to-green-900 p-6 rounded-xl shadow-lg min-h-[170px] min-w-[350px] w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 text-center border border-gray-300 hover:shadow-xl transform transition duration-300 hover:scale-105"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <div className="font-bold text-2xl text-white">{`🚗 Total Vehicles: ${totalVehicles}`}</div>
                <h1 className="text-gray-200 text-xl mt-2">Total Vehicles Registered</h1>
              </motion.div>

              {/* Total Carbon Emission */}
              <motion.div
                className="bg-gradient-to-r from-green-700 to-green-900 p-6 rounded-xl shadow-lg min-h-[170px] min-w-[350px] w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 text-center border border-gray-300 hover:shadow-xl transform transition duration-300 hover:scale-105"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <div className="font-bold text-2xl text-white">{`🌱 Total Emission: ${totalEmission.toFixed(2)} kg`}</div>
                <h1 className="text-gray-200 text-xl mt-2">Total Carbon Emission</h1>
              </motion.div>
            </div>
          </div>
        </motion.div>
        </div>


        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-full-lg mx-auto mt-16 relative"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="bg-gradient-to-r from-green-700 to-green-900 p-4 rounded-xl shadow-lg w-fullrounded-lg border border-gray-300 w-full">
            <h2 className="text-2xl font-bold text-white mb-2 text-center">Emission Over Time</h2>
            <div className="w-full min-h-[400px] flex flex-col items-center justify-center">
              {filteredData.length > 0 ? (
                <Chart
                  chartType="ColumnChart"
                  width="100%"
                  height="350px"
                  options={{
                    colors: ["#004d0d"], // Green color
                    legend: { position: "none" }, // Hide legend if not needed
                    chartArea: { width: "90%" }, // Adjust chart area
                     backgroundColor: '#e3ffea'
                  }}
                  data={[
                    ["Date", "CO2 Emission (kg)"],
                    ...filteredData.map((item) => [
                      item.date, // Convert string to Date object
                      item.carbonFootprint,
                    ]),
                  ]}
                />
              ) : (
                <p className="text-gray-500 text-lg mt-4">No data available for the selected filter.</p>
              )}

              <div className="flex justify-center space-x-2 mt-4">
                {["All", "Week", "Month", "Year"].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setTimeFilter(filter)}
                    className={`px-4 py-2 rounded transition duration-200 ${timeFilter === filter ? "bg-green-600 text-white" : "bg-green-100"
                      } ${filteredData.length === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
                    disabled={filteredData.length === 0} // Disable buttons if no data
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-800 to-green-900 p-4 rounded-xl shadow-lg w-fullrounded-lg border border-gray-300 w-full">
            <h2 className="text-2xl font-bold mb-2 text-white text-center">
              Route-wise Emissions
            </h2>
            
            <div className="w-full min-h-[350px] flex justify-center items-center">
              {routeWiseEmissionData.length > 0 ? (
                <Chart chartType="PieChart" width="100%" height="370px" data={data}  options={options}  />
              ) : (
                <p className="text-gray-500 text-lg">No data available</p>
              )}
            </div>
          </div>

        </motion.div>

        <motion.div
          className="bg-gradient-to-r from-green-900 to-green-950/60 p-4 rounded-xl shadow-lg mt-16  relative"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold m-4 text-white">Fleet Emission Overview</h2>
          <div className="overflow-auto max-h-128 custom-scrollbar">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-green-700 text-xl text-white">
                  <th className="border p-6">Vehicle Number</th>
                  <th className="border p-6">Fuel Type</th>
                  <th className="border p-6">CO2 Emission (kg)</th>
                  <th className="border p-6">Distance (km)</th>
                  <th className="border p-6">Last Updated</th>
                  <th className="border p-6">Download PDF</th>
                </tr>
              </thead>
              <tbody>
                {dieselVehiclesData1.map((item, index) => (
                  <tr key={index} className="text-center text-xl text-white">
                    <td className="border p-6">{item.vehicleNumber}</td>
                    <td className="border p-6">{item.fuelType}</td>
                    <td className="border p-6">{item.carbonFootprint} kg</td>
                    <td className="border p-6">{item.totalDistance} km</td>
                    <td className="border p-6">{new Date(item.updatedAt).toLocaleDateString()}</td>
                    <td className="border p-6">
                      <button
                        onClick={() => handleDownload(item.pdfUrl)}
                        className="text-white px-2 py-1  items-center"
                      >
                        <FileText size={24} />
                      </button>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>



      



        {/* Download Report Button */}
        <div className="text-center mt-6 relative" >
          <button
            className="bg-green-600 text-white px-6 py-3 rounded-lg text-2xl hover:bg-green-700 focus:ring-2 focus:ring-blue-300"
            onClick={() => setIsModalOpen(true)}
          >
            Download Report
          </button>
        </div>

        {/* Modal Component */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-gradient-to-br from-green-800 to-green-900/90 backdrop-blur-md p-8 rounded-lg shadow-xl w-[700px] relative text-white border border-white/60">
              <div className="flex border-b pb-2">
                <button
                  className={`w-1/2 text-lg font-bold px-4 py-2 ${activeTab === "fuel" ? "text-gray-100 border-b-2 border-green-600" : "text-gray-300"}`}
                  onClick={() => setActiveTab("fuel")}
                >
                  By Fuel Type
                </button>
                <button
                  className={`w-1/2 text-lg font-bold px-4 py-2 ${activeTab === "date" ? "text-gray-100 border-b-2 border-green-600" : "text-gray-300"}`}
                  onClick={() => setActiveTab("date")}
                >
                  By Date
                </button>
              </div>

              {activeTab === "fuel" && (
                <div className="mt-4">
                  {["DIESEL", "PETROL", "CNG", "ETHANOL"].map((fuel) => (
                    <label key={fuel} className="block mt-2 text-gray-100 text-lg">
                      <input
                        type="radio"
                        name="fuelType"
                        value={fuel}
                        checked={selectedFuel === fuel}
                        onChange={() => setSelectedFuel(fuel)}
                        className="mr-2"
                      />
                      {fuel}
                    </label>
                  ))}
                </div>
              )}

              {activeTab === "date" && (
                <div className="mt-4">
                  {["Daily", "Weekly", "Monthly", "Yearly"].map((dateRange) => (
                    <label key={dateRange} className="block mt-2 text-gray-100 text-lg">
                      <input
                        type="radio"
                        name="dateRange"
                        value={dateRange}
                        checked={selectedDateRange === dateRange}
                        onChange={() => setSelectedDateRange(dateRange)}
                        className="mr-2"
                      />
                      {dateRange}
                    </label>
                  ))}
                </div>
              )}
              

              <div className="text-center mt-4">
                <button
                  className="bg-green-600 text-white px-6 py-4 text-lg rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-blue-300"
                  onClick={() => {
                    downloadCSVReport();
                    setIsModalOpen(false);
                  }}
                >
                  Download Report
                </button>
              </div>

              <button
                className="absolute top-3 right-3 text-4xl text-white hover:text-red-500"
                onClick={() => setIsModalOpen(false)}
              >
                &times;
              </button>
            </div>
            
          </div>
        )}
      </div>
    </div>
  );
};