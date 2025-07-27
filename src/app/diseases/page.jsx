"use client";
import { useState } from "react";
import {
  Activity,
  Bone,
  Brain,
  HeartPulse,
  Pill,
  Thermometer,
  Microscope,
  Stethoscope
} from "lucide-react";

export default function DiseaseInfo() {
  const [disease, setDisease] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleCheck = async () => {
    if (!disease.trim()) {
      setResponse("Please enter a disease name.");
      return;
    }

    setIsLoading(true);
    setResponse("");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/chatbot/ask`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ disease }),
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
      {/* Decorative Background Lucide Icons */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <Activity className="absolute top-16 left-10 text-red-300 w-24 h-24 opacity-40 rotate-12" />
        <Bone className="absolute top-1/4 right-12 text-orange-300 w-20 h-20 opacity-40 -rotate-12" />
        <Brain className="absolute bottom-1/3 left-20 text-purple-300 w-28 h-28 opacity-40 rotate-6" />
        <HeartPulse className="absolute bottom-20 right-24 text-pink-300 w-24 h-24 opacity-40 -rotate-6" />
        <Pill className="absolute top-32 right-1/4 text-blue-300 w-22 h-22 opacity-40" />
        <Thermometer className="absolute bottom-1/4 left-1/4 text-yellow-300 w-20 h-20 opacity-40 rotate-45" />
        <Microscope className="absolute top-1/2 right-1/4 text-green-300 w-26 h-26 opacity-30" />
        <Stethoscope className="absolute bottom-32 right-32 text-indigo-300 w-24 h-24 opacity-40 rotate-12" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-red-600 to-orange-600 p-6 text-white text-center">
            <h1 className="text-3xl font-bold">Disease Information</h1>
            <p className="mt-2 opacity-90">Comprehensive medical information about diseases</p>
          </div>

          {/* Input Section */}
          <div className="p-6 md:p-8 bg-white">
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <input
                type="text"
                placeholder="e.g. Diabetes, Hypertension, COVID-19..."
                value={disease}
                onChange={(e) => setDisease(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleCheck()}
                className="flex-1 border-2 border-gray-200 rounded-lg px-6 py-4 text-lg text-gray-900 bg-white focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all"
              />
              <button
                onClick={handleCheck}
                disabled={isLoading || !disease.trim()}
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-semibold text-lg disabled:opacity-70 disabled:cursor-not-allowed transition-colors w-full sm:w-auto"
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
          </div>

          {/* Results Section */}
          <div className="p-6 md:p-8 bg-gray-50 border-t border-gray-200">
            {response ? (
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-900">Analysis Results</h2>
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
                <h3 className="mt-2 text-lg font-medium text-gray-900">No results yet</h3>
                <p className="mt-1">Enter a disease name above to get detailed information</p>
              </div>
            )}
          </div>

          {/* Disclaimer */}
          <div className="bg-red-50 border-t-2 border-red-500 p-6">
            <div className="flex items-start">
              <svg className="h-5 w-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
              </svg>
              <div>
                <h3 className="text-lg font-medium text-red-800">Medical Disclaimer</h3>
                <p className="mt-1 text-red-700">
                  This information is for educational purposes only and is not medical advice. 
                  Always consult a healthcare professional for diagnosis and treatment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}