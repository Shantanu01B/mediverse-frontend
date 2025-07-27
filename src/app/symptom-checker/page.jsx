"use client";
import { useState } from "react";
import {
  Stethoscope,
  HeartPulse,
  Pill,
  Syringe,
  Hospital,
} from "lucide-react";

export default function SymptomChecker() {
  const [symptom, setSymptom] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleCheck = async () => {
    if (!symptom.trim()) {
      setResponse("Please enter a symptom.");
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
        body: JSON.stringify({ symptom }),
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
        <Stethoscope className="absolute top-12 left-8 text-indigo-300 w-24 h-24 opacity-40 rotate-12" />
        <HeartPulse className="absolute top-40 right-10 text-red-300 w-28 h-28 opacity-40 -rotate-6" />
        <Pill className="absolute bottom-32 left-16 text-pink-300 w-20 h-20 opacity-40 rotate-12" />
        <Syringe className="absolute bottom-16 right-16 text-blue-300 w-24 h-24 opacity-40" />
        <Hospital className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-purple-300 w-36 h-36 opacity-30" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="bg-white rounded-xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-white text-center">
            <h1 className="text-4xl font-bold">Symptom Checker</h1>
            <p className="mt-2 text-xl opacity-95">
              AI-Powered Health Analysis
            </p>
          </div>

          {/* Input Section */}
          <div className="p-8 bg-white">
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <input
                type="text"
                placeholder="e.g. headache, fever, chest pain..."
                value={symptom}
                onChange={(e) => setSymptom(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleCheck()}
                className="flex-1 border-2 border-gray-200 rounded-lg px-6 py-4 text-lg text-gray-900 bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
              />
              <button
                onClick={handleCheck}
                disabled={isLoading || !symptom.trim()}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-lg font-semibold text-lg disabled:opacity-70 disabled:cursor-not-allowed transition-colors w-full sm:w-auto"
              >
                {isLoading ? (
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
                  "Check Symptoms"
                )}
              </button>
            </div>
            <p className="mt-3 text-gray-500 text-sm">
              Be specific about duration, severity, and other details
            </p>
          </div>

          {/* Results Section */}
          <div className="p-8 bg-gray-50 border-t border-gray-200">
            {response ? (
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-900">
                  Analysis Results
                </h2>
                <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                  <div className="text-gray-800 text-base leading-relaxed whitespace-pre-wrap">
                    {response.split("\n").map((paragraph, i) => (
                      <p key={i} className="mb-4 last:mb-0">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                  />
                </svg>
                <h3 className="mt-2 text-lg font-medium text-gray-900">
                  No results yet
                </h3>
                <p className="mt-1">
                  Describe your symptoms above to get analysis
                </p>
              </div>
            )}
          </div>

          {/* Disclaimer */}
          <div className="bg-blue-50 border-t-2 border-blue-500 p-6">
            <div className="flex items-start">
              <svg
                className="h-5 w-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0"
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
                <h3 className="text-lg font-medium text-blue-800">
                  Medical Disclaimer
                </h3>
                <p className="mt-1 text-blue-700">
                  This tool provides general health information and is not a
                  substitute for professional medical advice. Always consult a
                  healthcare provider for proper diagnosis and treatment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
