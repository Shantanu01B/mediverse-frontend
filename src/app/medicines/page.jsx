"use client";
import { useState } from "react";
import { Pill, Stethoscope, Syringe, HeartPulse, ClipboardCheck } from "lucide-react";

export default function MedicineInfo() {
  const [medicine, setMedicine] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleCheck = async () => {
    if (!medicine.trim()) {
      setResponse("Please enter a medicine name.");
      return;
    }

    setIsLoading(true);
    setResponse("");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/medicines/ask`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ medicine }),
      });

      const data = await res.json();
      setResponse(data.reply || data.error);
    } catch (err) {
      console.error(err);
      setResponse("Something went wrong. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Lucide Icons (Visible) */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-50">
        <Pill className="absolute top-10 left-10 w-24 h-24 text-emerald-400" />
        <Stethoscope className="absolute top-1/3 right-10 w-20 h-20 text-teal-500" />
        <Syringe className="absolute bottom-24 left-20 w-20 h-20 text-cyan-500" />
        <HeartPulse className="absolute bottom-10 right-20 w-24 h-24 text-rose-400" />
        <ClipboardCheck className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-28 h-28 text-indigo-400" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="bg-white rounded-xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-teal-600 to-emerald-600 p-8 text-white text-center">
            <h1 className="text-4xl font-bold">Medicine Information</h1>
            <p className="mt-2 text-xl opacity-95">Comprehensive drug information</p>
          </div>

          {/* Input Section */}
          <div className="p-8 bg-white">
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <input
                type="text"
                placeholder="e.g. Paracetamol, Amoxicillin, Ibuprofen..."
                value={medicine}
                onChange={(e) => setMedicine(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleCheck()}
                className="flex-1 border-2 border-gray-200 rounded-lg px-6 py-4 text-lg text-gray-900 bg-white focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
              />
              <button
                onClick={handleCheck}
                disabled={isLoading || !medicine.trim()}
                className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-4 rounded-lg font-semibold text-lg disabled:opacity-70 disabled:cursor-not-allowed transition-colors w-full sm:w-auto"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Searching...
                  </span>
                ) : (
                  'Get Info'
                )}
              </button>
            </div>
            <p className="mt-3 text-gray-500 text-sm">
              Enter brand or generic name. Include dosage if known.
            </p>
          </div>

          {/* Results Section */}
          <div className="p-8 bg-gray-50 border-t border-gray-200">
            {response ? (
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-900">Medicine Details</h2>
                <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                  <div className="text-gray-800 text-base leading-relaxed whitespace-pre-wrap">
                    {response.split('\n').map((paragraph, i) => (
                      <p key={i} className="mb-4 last:mb-0">{paragraph}</p>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <h3 className="mt-2 text-lg font-medium text-gray-900">No results yet</h3>
                <p className="mt-1">Enter a medicine name above to get detailed information</p>
              </div>
            )}
          </div>

          {/* Disclaimer */}
          <div className="bg-blue-50 border-t-2 border-blue-500 p-6">
            <div className="flex items-start">
              <svg className="h-5 w-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
              </svg>
              <div>
                <h3 className="text-lg font-medium text-blue-800">Medical Disclaimer</h3>
                <p className="mt-1 text-blue-700">
                  This information is for educational purposes only. Always consult a healthcare professional before taking any medication.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}