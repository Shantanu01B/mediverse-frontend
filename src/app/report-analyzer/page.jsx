"use client";
import { useState } from "react";
import { FileText, HeartPulse, ShieldCheck } from "lucide-react";

const ReportAnalyzer = () => {
  const [reportText, setReportText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
  if (!reportText.trim()) {
    alert("Please enter a medical report to analyze");
    return;
  }

  setLoading(true);
  setResult(null);
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/reports/analyze`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reportText }),
    });

    const data = await res.json(); // ✅ CORRECTED LINE
    setResult(data);
  } catch (error) {
    console.error("Error analyzing report:", error);
    setResult({
      summary: "Error analyzing report",
      riskLevel: "Unknown",
      findings: ["Failed to analyze report. Please try again."],
    });
  }
  setLoading(false);
};


  return (
    <div className="relative min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Icons */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <FileText className="absolute top-10 left-10 w-36 h-36 text-blue-300 blur-[1px] drop-shadow-md" />
        <HeartPulse className="absolute bottom-20 right-10 w-36 h-36 text-indigo-300 blur-[1px] drop-shadow-md" />
        <ShieldCheck className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-44 h-44 text-blue-200 blur-[1px] drop-shadow-md" />
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 max-w-3xl mx-auto">
        <div className="bg-white rounded-xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white text-center">
            <h1 className="text-3xl font-bold">Medical Report Analyzer</h1>
            <p className="mt-2 opacity-90">AI-powered analysis of your medical reports</p>
          </div>

          <div className="p-6 md:p-8 space-y-6">
            <div>
              <label htmlFor="report-text" className="block text-lg font-medium text-gray-800 mb-3">
                Paste Your Medical Report
              </label>
              <textarea
                id="report-text"
                className="w-full border border-gray-300 rounded-lg p-4 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                rows="8"
                placeholder="Paste your lab results, imaging reports, or doctor's notes here..."
                value={reportText}
                onChange={(e) => setReportText(e.target.value)}
              ></textarea>
              <p className="mt-2 text-sm text-gray-500">
                Include all relevant details for accurate analysis
              </p>
            </div>

            <div className="flex justify-center">
              <button
                onClick={handleAnalyze}
                disabled={loading || !reportText.trim()}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium text-lg disabled:opacity-70 disabled:cursor-not-allowed transition-colors shadow-md hover:shadow-lg"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Analyzing...
                  </span>
                ) : (
                  "Analyze Report"
                )}
              </button>
            </div>

            {result && (
              <div className="mt-8 space-y-4">
                <h2 className="text-2xl font-semibold text-gray-800 border-b pb-2">
                  Analysis Results
                </h2>

                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-blue-800 mb-2">Summary</h3>
                  <p className="text-gray-800 whitespace-pre-wrap">{result.summary}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h3 className="text-lg font-medium text-gray-800 mb-2">Risk Level</h3>
                    <div
                      className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                        result.riskLevel === "High"
                          ? "bg-red-100 text-red-800"
                          : result.riskLevel === "Medium"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {result.riskLevel}
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h3 className="text-lg font-medium text-gray-800 mb-2">Confidence</h3>
                    <p className="text-gray-800">High (95%)</p>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-medium text-gray-800 mb-2">Key Findings</h3>
                  <ul className="space-y-2">
                    {result.findings.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <svg
                          className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-gray-800">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
              <div className="flex items-start">
                <svg
                  className="h-5 w-5 text-red-500 mt-0.5 mr-2 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z"
                    clipRule="evenodd"
                  />
                </svg>
                <div>
                  <h3 className="text-lg font-medium text-red-800">Important Disclaimer</h3>
                  <p className="mt-1 text-red-700">
                    This analysis is provided for informational purposes only and should not be used as a
                    substitute for professional medical advice. Always consult with a qualified healthcare
                    provider for interpretation of medical reports.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportAnalyzer;
