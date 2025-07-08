import { useState, useEffect } from "react";

import { CheckCircle, Clock } from "lucide-react"; // or use any icon lib

import axios from "axios";

const KYCSection = ({ title, verified, fields, onSubmit }) => {
  const [showForm, setShowForm] = useState(false);
  const [formValues, setFormValues] = useState({});

  useEffect(() => {
    if (verified) {
      setShowForm(false);
    }
  }, [verified]);

  const handleChange = (key, value) => {
    setFormValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formValues);
  };



  return (
    <div className="bg-green-800/80 p-5 mb-6 rounded-lg border border-white/30 text-white">
      <div className="flex justify-between items-center mb-2">
  <h3 className="text-xl font-semibold text-white">{title}</h3>
  <div className="flex items-center space-x-4">
    {/* {verified ? (
      <span className="flex items-center text-green-300 text-sm font-medium">
        ✅ Verified
      </span>
    ) : (
      <span className="flex items-center text-yellow-300 text-sm font-medium">
        ⏳ Pending
      </span>
    )} */}

    {!verified && (
      <button
        onClick={() => setShowForm((prev) => !prev)}
        className="text-lg text-green-200 underline hover:text-white"
      >
        {showForm ? "Cancel" : "Verify"}
      </button>
    )}
  </div>
</div>

      {showForm && (
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {fields.map((field) => (
            <div key={field.key}>
              <label className="block mb-1 font-medium text-sm text-gray-200">
                {field.label}
              </label>
              <input
                type="text"
                placeholder={field.label}
                className="w-full placeholder-white bg-green-700/70 text-white text-lg border border-white/50 focus:outline-none focus:ring-1 focus:ring-green-400 px-3 py-2 rounded"
                value={formValues[field.key] || ""}
                onChange={(e) => handleChange(field.key, e.target.value)}
              />
            </div>
          ))}
          <div className="text-right pt-2">
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded text-sm focus:ring-2 focus:ring-green-400"
            >
              Submit
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default KYCSection;
