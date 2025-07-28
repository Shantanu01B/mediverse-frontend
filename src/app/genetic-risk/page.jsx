"use client";
import { useState } from "react";
import axios from "axios";

export default function GeneticRiskChecker() {
  const [formData, setFormData] = useState({
    familyHistory: "",
    lifestyle: "",
    medicalConditions: "",
  });

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!formData.familyHistory || !formData.lifestyle || !formData.medicalConditions) {
    setError("Please fill in all fields");
    return;
  }

  setLoading(true);
  setResult(null);
  setError("");

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/genetic/check-risk`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    setResult(data);
  } catch (err) {
    console.error("Error calculating risk:", err);
    setError("Error calculating risk. Please try again.");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6 text-white text-center">
            <h1 className="text-3xl font-bold">Genetic Risk Assessment</h1>
            <p className="mt-2 opacity-90">Evaluate your genetic predisposition to health conditions</p>
          </div>

          {/* Main Content */}
          <div className="p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Family History */}
              <div>
                <label htmlFor="familyHistory" className="block text-lg font-medium text-gray-800 mb-3">
                  Family Medical History
                </label>
                <textarea
                  id="familyHistory"
                  name="familyHistory"
                  placeholder="List any genetic conditions or diseases in your family (e.g. heart disease, diabetes, cancer)"
                  value={formData.familyHistory}
                  onChange={handleChange}
                  rows="3"
                  className="w-full border border-gray-300 rounded-lg p-4 text-gray-800 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all"
                />
              </div>

              {/* Lifestyle Factors */}
              <div>
                <label htmlFor="lifestyle" className="block text-lg font-medium text-gray-800 mb-3">
                  Lifestyle Factors
                </label>
                <textarea
                  id="lifestyle"
                  name="lifestyle"
                  placeholder="Describe your lifestyle habits (e.g. smoking, alcohol, exercise, diet)"
                  value={formData.lifestyle}
                  onChange={handleChange}
                  rows="3"
                  className="w-full border border-gray-300 rounded-lg p-4 text-gray-800 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all"
                />
              </div>

              {/* Medical Conditions */}
              <div>
                <label htmlFor="medicalConditions" className="block text-lg font-medium text-gray-800 mb-3">
                  Existing Medical Conditions
                </label>
                <textarea
                  id="medicalConditions"
                  name="medicalConditions"
                  placeholder="List any current medical conditions (e.g. high blood pressure, diabetes)"
                  value={formData.medicalConditions}
                  onChange={handleChange}
                  rows="3"
                  className="w-full border border-gray-300 rounded-lg p-4 text-gray-800 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all"
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-center pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-medium text-lg disabled:opacity-70 disabled:cursor-not-allowed transition-colors shadow-md hover:shadow-lg w-full sm:w-auto"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Analyzing...
                    </span>
                  ) : (
                    'Assess Genetic Risk'
                  )}
                </button>
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
                  <p className="text-red-700 font-medium">{error}</p>
                </div>
              )}
            </form>

            {/* Results Section */}
            {result && (
              <div className="mt-8 space-y-6">
                <h2 className="text-2xl font-semibold text-gray-800 border-b pb-2">Risk Assessment Results</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Risk Level */}
                  <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                    <h3 className="text-lg font-medium text-gray-800 mb-3">Risk Level</h3>
                    <div className={`inline-flex items-center px-4 py-2 rounded-full text-lg font-semibold ${
                      result.riskLevel === 'High' ? 'bg-red-100 text-red-800' :
                      result.riskLevel === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {result.riskLevel}
                    </div>
                  </div>

                  {/* Risk Score */}
                  <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                    <h3 className="text-lg font-medium text-gray-800 mb-3">Risk Score</h3>
                    <div className="text-3xl font-bold text-purple-600">
                      {result.riskScore}/100
                    </div>
                  </div>
                </div>

                {/* Recommendations */}
                <div className="bg-blue-50 border-l-4 border-blue-500 p-5 rounded-lg">
                  <h3 className="text-lg font-medium text-blue-800 mb-3">Recommendations</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-800">Consider genetic counseling for detailed assessment</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-800">Schedule regular health screenings</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-800">Maintain healthy lifestyle habits</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {/* Disclaimer */}
            <div className="mt-8 bg-red-50 border-l-4 border-red-500 p-5 rounded-lg">
              <div className="flex items-start">
                <svg className="h-5 w-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
                </svg>
                <div>
                  <h3 className="text-lg font-medium text-red-800">Important Disclaimer</h3>
                  <p className="mt-1 text-red-700">
                    This genetic risk assessment provides general information only and is not a substitute for professional medical advice. 
                    The results are estimates based on the information provided and should be interpreted by a qualified healthcare professional.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}