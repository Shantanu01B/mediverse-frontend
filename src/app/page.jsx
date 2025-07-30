'use client';

import { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { AuthContext } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  FaArrowRight, FaCheckCircle, FaShieldAlt, FaHeartbeat,
  FaCommentAlt, FaFlask, FaPills, FaChartLine, FaDna,
  FaRobot, FaLock, FaUserMd, FaFileMedical, FaStethoscope,
  FaStar, FaRegEnvelope, FaMapMarkerAlt, FaPhoneAlt,
  FaMicroscope
} from 'react-icons/fa';

export default function Home() {
  const router = useRouter();

  // AuthContext includes token (the login status) and user details
  const { token } = useContext(AuthContext);

  // Feature auto-rotator for "Why MediVerse"
  const [currentFeature, setCurrentFeature] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    document.title = "MediVerse | Home";
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentFeature((prev) => (prev + 1) % features.length);
        setIsVisible(true);
      }, 500);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // All your feature cards
  const featureCards = [
    {
      title: "Symptom Checker",
      desc: "Get AI-powered analysis of your symptoms with possible conditions and recommended actions.",
      icon: <FaStethoscope className="text-4xl" />,
      color: "bg-blue-100 hover:bg-blue-200",
      iconColor: "text-blue-600",
      path: "/symptom-checker",
    },
    {
      title: "Medicine Info",
      desc: "Access comprehensive information about medications, including side effects and interactions.",
      icon: <FaPills className="text-4xl" />,
      color: "bg-green-100 hover:bg-green-200",
      iconColor: "text-green-600",
      path: "/medicines",
    },
    {
      title: "Report Analyzer",
      desc: "Upload your lab reports and get easy-to-understand explanations of your results.",
      icon: <FaChartLine className="text-4xl" />,
      color: "bg-purple-100 hover:bg-purple-200",
      iconColor: "text-purple-600",
      path: "/report-analyzer",
    },
    {
      title: "Genetic Risk",
      desc: "Understand your predisposition to hereditary conditions based on family history.",
      icon: <FaDna className="text-4xl" />,
      color: "bg-yellow-100 hover:bg-yellow-200",
      iconColor: "text-yellow-600",
      path: "/genetic-risk",
    },
    {
      title: "Health Chatbot",
      desc: "24/7 AI assistant to answer your health questions and guide you to appropriate care.",
      icon: <FaRobot className="text-4xl" />,
      color: "bg-red-100 hover:bg-red-200",
      iconColor: "text-red-600",
      path: "/chatbot",
    },
    {
      title: "Disease Info",
      desc: "Explore detailed information about diseases, symptoms, treatments, and prevention.",
      icon: <FaMicroscope className="text-4xl" />,
      color: "bg-indigo-100 hover:bg-indigo-200",
      iconColor: "text-indigo-600",
      path: "/disease-info",
    }
  ];

  // Feature card click handler – does login redirect if needed
  function handleFeatureClick(targetPath) {
    if (token) {
      router.push(targetPath);
    } else {
      // Add ?next=targetPath for redirect after login
      router.push(`/login?next=${encodeURIComponent(targetPath)}`);
    }
  }

  // Sliding features (section below cards)
  const features = [
    {
      title: "AI-Powered Symptom Analysis",
      desc: "Get accurate health assessments based on your symptoms with our advanced AI.",
      icon: <FaHeartbeat className="text-4xl text-green-600" />,
      color: "from-green-100 to-green-50"
    },
    {
      title: "Comprehensive Medicine Database",
      desc: "Access detailed information about medications, including side effects and interactions.",
      icon: <FaPills className="text-4xl text-blue-600" />,
      color: "from-blue-100 to-blue-50"
    },
    {
      title: "Secure Health Records",
      desc: "Your medical data is encrypted and protected with enterprise-grade security.",
      icon: <FaShieldAlt className="text-4xl text-purple-600" />,
      color: "from-purple-100 to-purple-50"
    }
  ];

  // Testimonials for the bottom carousel
  const testimonials = [
    {
      quote: "MediVerse helped me understand my symptoms before visiting the doctor. Saved me time and anxiety!",
      author: "Sarah J., 32",
      role: "Frequent User"
    },
    {
      quote: "The medicine information is so comprehensive. I finally understand what I'm taking and why.",
      author: "Michael T., 45",
      role: "Patient"
    },
    {
      quote: "As a busy professional, having 24/7 access to health information is invaluable.",
      author: "Priya K., 28",
      role: "Tech Entrepreneur"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white text-gray-800 overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto py-10 md:py-20 px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-10 md:gap-0">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full md:w-1/2 z-10"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-blue-800 mb-4 sm:mb-6 leading-tight text-center md:text-left tracking-tight">
              Revolutionizing <span className="text-green-600">Healthcare</span> with AI
            </h1>
            <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 text-gray-700 leading-relaxed text-center md:text-left">
              Your personalized health companion. Get accurate symptom analysis, medicine information, and health insights powered by artificial intelligence.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-start">
              <Link href="/register">
                <button className="w-full sm:w-auto bg-green-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold shadow-lg hover:bg-green-700 transition duration-300 flex items-center justify-center">
                  Get Started <FaArrowRight className="ml-2" />
                </button>
              </Link>
              <Link href="/demo">
                <button className="w-full sm:w-auto border-2 border-blue-600 text-blue-700 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold hover:bg-blue-50 transition duration-300">
                  Live Demo
                </button>
              </Link>
            </div>
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-3 sm:gap-0">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-blue-200 border-2 border-white flex items-center justify-center">
                    <FaUserMd className="text-blue-700 text-lg sm:text-xl" />
                  </div>
                ))}
              </div>
              <div className="sm:ml-4 sm:mt-0 mt-2 flex flex-col items-center sm:items-start">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar key={star} className="w-4 h-4 text-yellow-400" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-gray-600 mt-1">Trusted by 10,000+ users</p>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="w-full md:w-[45%] mt-10 md:mt-0 relative flex justify-center"
          >
            {/* Blobs and Dashboard */}
            <div className="absolute -top-12 -right-10 w-40 h-40 sm:w-56 sm:h-56 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
            <div className="absolute -bottom-12 -left-10 w-40 h-40 sm:w-56 sm:h-56 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
            <div className="absolute top-0 left-1/3 w-28 h-28 sm:w-48 sm:h-48 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />
            <div className="relative z-10 bg-white p-6 sm:p-8 rounded-xl sm:rounded-2xl shadow-2xl border-4 sm:border-8 border-white w-full max-w-xs sm:max-w-md mx-auto">
              <div className="flex flex-col items-center">
                <FaFileMedical className="text-4xl sm:text-6xl text-blue-600 mb-2 sm:mb-4" />
                <h3 className="text-lg sm:text-xl font-bold text-center mb-1 sm:mb-2">Health Dashboard</h3>
                <p className="text-gray-600 text-center mb-3 sm:mb-4 text-sm sm:text-base">Your complete health overview</p>
                <div className="grid grid-cols-3 gap-2 sm:gap-4 w-full">
                  <div className="bg-blue-100 p-4 rounded-lg flex flex-col items-center">
                    <FaHeartbeat className="text-2xl text-blue-600 mb-1" />
                    <span className="text-xs">Symptoms</span>
                  </div>
                  <div className="bg-green-100 p-4 rounded-lg flex flex-col items-center">
                    <FaPills className="text-2xl text-green-600 mb-1" />
                    <span className="text-xs">Medicines</span>
                  </div>
                  <div className="bg-purple-100 p-4 rounded-lg flex flex-col items-center">
                    <FaChartLine className="text-2xl text-purple-600 mb-1" />
                    <span className="text-xs">Reports</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Ultra-Compact Fancy Feature Cards */}
<section className="py-10 px-4 sm:px-6">
  <div className="max-w-6xl mx-auto">
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="text-center mb-10"
    >
      <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent mb-2">AI Health Tools</h2>
      <p className="text-sm text-gray-500 max-w-md mx-auto">Smart features for smarter health decisions</p>
    </motion.div>

    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      {featureCards.map((card, index) => (
        <motion.div
          key={index}
          whileHover={{ y: -3, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`${card.color} p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-150 cursor-pointer border border-opacity-20 border-gray-200 flex flex-col`}
          onClick={() => handleFeatureClick(card.path)}
        >
          {/* Floating Icon */}
          <div className={`${card.iconColor} mb-3 p-2 rounded-lg bg-white bg-opacity-80 w-10 h-10 flex items-center justify-center shadow-xs mx-auto`}>
            {card.icon}
          </div>
          
          {/* Compact Content */}
          <h3 className="text-sm font-semibold text-center text-gray-800 mb-1 line-clamp-1">{card.title}</h3>
          <p className="text-xs text-gray-600 text-center mb-3 line-clamp-2">{card.desc}</p>
          
          {/* Micro Button */}
          <button className={`text-xs py-1.5 px-3 rounded-md font-medium mx-auto flex items-center ${
            token 
              ? "bg-white text-blue-600 border border-blue-200 hover:bg-blue-50"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}>
            {token ? "Use Tool" : "Unlock"}
          </button>
        </motion.div>
      ))}
    </div>
  </div>
</section>

      {/* Sliding Features Section */}
      <section className="py-10 md:py-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-10 md:mb-16"
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-blue-800 mb-2 md:mb-4">Why Choose MediVerse?</h2>
            <p className="text-base md:text-lg text-gray-600 max-w-xl mx-auto">
              We combine cutting-edge technology with medical expertise to deliver reliable health information.
            </p>
          </motion.div>
          <div className="relative h-80 sm:h-96 rounded-xl md:rounded-2xl overflow-hidden mb-12 md:mb-16">
            <AnimatePresence>
              {isVisible && (
                <motion.div
                  key={currentFeature}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                  className={`absolute inset-0 bg-gradient-to-r ${features[currentFeature].color} p-4 sm:p-8 md:p-12 rounded-xl md:rounded-2xl flex flex-col md:flex-row items-center justify-between`}
                >
                  <div className="w-full md:w-1/2 mb-6 md:mb-0">
                    <div className="mb-3 sm:mb-6 flex justify-center md:justify-start">
                      {features[currentFeature].icon}
                    </div>
                    <h3 className="text-lg sm:text-2xl md:text-3xl font-bold text-gray-800 mb-2 sm:mb-4">
                      {features[currentFeature].title}
                    </h3>
                    <p className="text-base sm:text-lg text-gray-700 mb-3 sm:mb-6">
                      {features[currentFeature].desc}
                    </p>
                    <button className="flex items-center text-blue-700 font-medium hover:text-blue-800 transition">
                      Learn more <FaArrowRight className="ml-2" />
                    </button>
                  </div>
                  <div className="w-full md:w-1/2 flex justify-center">
                    <div className="w-full max-w-xs sm:max-w-md rounded-lg shadow-lg border-2 sm:border-4 border-white bg-white p-4 sm:p-8 flex items-center justify-center">
                      {features[currentFeature].icon}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
              {features.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setIsVisible(false);
                    setTimeout(() => {
                      setCurrentFeature(idx);
                      setIsVisible(true);
                    }, 500);
                  }}
                  className={`w-3 h-3 rounded-full ${currentFeature === idx ? 'bg-green-600' : 'bg-gray-300'}`}
                  aria-label={`Show feature ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-10 md:py-16 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-10 md:mb-16"
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-blue-800 mb-2 md:mb-4">What Our Users Say</h2>
            <p className="text-base md:text-lg text-gray-600 max-w-xl mx-auto">
              Trusted by patients and healthcare professionals alike.
            </p>
          </motion.div>
          <div className="grid gap-6 md:gap-8 grid-cols-1 md:grid-cols-3">
            {testimonials.map((testimonial, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white p-6 sm:p-8 rounded-2xl shadow-md"
              >
                <div className="flex items-center mb-3 sm:mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar key={star} className="w-5 h-5 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 italic mb-4 sm:mb-6 text-sm sm:text-base">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-blue-200 mr-2 sm:mr-4 flex items-center justify-center">
                    <FaUserMd className="text-blue-700 text-lg sm:text-xl" />
                  </div>
                  <div>
                    <h4 className="font-bold">{testimonial.author}</h4>
                    <p className="text-xs sm:text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-20 px-4 sm:px-6 bg-gradient-to-r from-blue-600 to-green-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-4xl font-bold mb-4 md:mb-6"
          >
            Ready to Take Control of Your Health?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-base md:text-xl mb-6 md:mb-8"
          >
            Join thousands of users who trust MediVerse for their health information needs.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4"
          >
            <Link href="/register">
              <button className="w-full sm:w-auto bg-white text-blue-700 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold hover:bg-gray-100 transition shadow-lg">
                Get Started for Free
              </button>
            </Link>
            <Link href="/demo">
              <button className="w-full sm:w-auto border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold hover:bg-white hover:bg-opacity-10 transition">
                See How It Works
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-10 md:py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          <div>
            <h3 className="text-2xl font-bold text-white mb-4 sm:mb-6">
              Medi<span className="text-green-400">Verse</span>
            </h3>
            <p className="text-gray-400 mb-4 sm:mb-6">
              Your AI-powered health companion for better medical decisions.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition">
                <FaCommentAlt className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <FaHeartbeat className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <FaUserMd className="w-6 h-6" />
              </a>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 sm:mb-6">Quick Links</h4>
            <ul className="space-y-2 sm:space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-white transition">Home</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Features</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">About Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Contact</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Blog</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 sm:mb-6">Features</h4>
            <ul className="space-y-2 sm:space-y-3">
              <li><a href="symptom-checker" className="text-gray-400 hover:text-white transition">Symptom Checker</a></li>
              <li><a href="medicines" className="text-gray-400 hover:text-white transition">Medicine Info</a></li>
              <li><a href="report-analyzer" className="text-gray-400 hover:text-white transition">Report Analyzer</a></li>
              <li><a href="genetic-risk" className="text-gray-400 hover:text-white transition">Genetic Risks</a></li>
              <li><a href="chatbot" className="text-gray-400 hover:text-white transition">Health Chatbot</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 sm:mb-6">Contact Us</h4>
            <ul className="space-y-2 sm:space-y-3 text-gray-400">
              <li className="flex items-start">
                <FaMapMarkerAlt className="w-5 h-5 mr-2 sm:mr-3 mt-1" />
                <span>123 Health St, Medical City, MC 12345</span>
              </li>
              <li className="flex items-center">
                <FaPhoneAlt className="w-5 h-5 mr-2 sm:mr-3" />
                <span>(123) 456-7890</span>
              </li>
              <li className="flex items-center">
                <FaRegEnvelope className="w-5 h-5 mr-2 sm:mr-3" />
                <span>support@mediverse.com</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-6 md:pt-12 mt-8 md:mt-12 border-t border-gray-800 text-center text-gray-400">
          <p>© {new Date().getFullYear()} MediVerse. All rights reserved.</p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-6 mt-2 sm:mt-4 text-xs sm:text-sm">
            <a href="#" className="hover:text-white transition">Privacy Policy</a>
            <a href="#" className="hover:text-white transition">Terms of Service</a>
            <a href="#" className="hover:text-white transition">Cookie Policy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
