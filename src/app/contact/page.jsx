export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-700 to-green-600 text-white py-20 px-5 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Mediverse</h1>
          <p className="text-xl md:text-2xl">Our team is ready to assist you with any questions</p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-5 py-12">
        <div className="flex flex-col lg:flex-row gap-8 mb-12">
          {/* Contact Form */}
          <div className="flex-1 bg-white p-8 rounded-xl shadow-md border border-gray-100">
            <h2 className="text-3xl font-bold mb-8 text-blue-800">Send Us a Message</h2>
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block font-semibold mb-2 text-gray-700">Full Name</label>
                <input 
                  type="text" 
                  id="name" 
                  placeholder="Your name" 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block font-semibold mb-2 text-gray-700">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  placeholder="your.email@example.com" 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="subject" className="block font-semibold mb-2 text-gray-700">Subject</label>
                <select 
                  id="subject" 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Select a topic</option>
                  <option value="support">Technical Support</option>
                  <option value="partnership">Partnership Inquiry</option>
                  <option value="feedback">Product Feedback</option>
                  <option value="press">Press Inquiry</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="message" className="block font-semibold mb-2 text-gray-700">Your Message</label>
                <textarea 
                  id="message" 
                  placeholder="How can we help you?" 
                  rows="6"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                className="w-full bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600 text-white px-8 py-3 rounded-lg font-semibold text-lg transition-all shadow-md hover:shadow-lg"
              >
                Send Message
              </button>
            </form>
          </div>
          
          {/* Contact Info */}
          <div className="flex-1 space-y-6">
            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
              <h3 className="text-2xl font-bold text-blue-800 mb-6">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 hover:bg-blue-50 rounded-lg transition-colors">
                  <div className="bg-blue-100 p-3 rounded-full text-blue-600">
                    ✉️
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Email</h4>
                    <p className="text-gray-700">hello@mediverse.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 hover:bg-blue-50 rounded-lg transition-colors">
                  <div className="bg-green-100 p-3 rounded-full text-green-600">
                    📞
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Phone</h4>
                    <p className="text-gray-700">(800) 555-HEAL</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 hover:bg-blue-50 rounded-lg transition-colors">
                  <div className="bg-blue-100 p-3 rounded-full text-blue-600">
                    🕒
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Support Hours</h4>
                    <p className="text-gray-700">24/7 emergency support</p>
                    <p className="text-gray-700">Mon-Fri 8am-8pm EST (general inquiries)</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
              <h3 className="text-2xl font-bold text-blue-800 mb-6">Our Headquarters</h3>
              <div className="flex items-start gap-4 mb-6 p-4 hover:bg-blue-50 rounded-lg transition-colors">
                <div className="bg-green-100 p-3 rounded-full text-green-600">
                  📍
                </div>
                <div>
                  <p className="text-gray-700">123 Healthcare Innovation Way</p>
                  <p className="text-gray-700">Boston, MA 02134</p>
                  <p className="text-gray-700">United States</p>
                </div>
              </div>
              <div className="bg-gradient-to-r from-blue-100 to-green-50 rounded-lg h-48 flex items-center justify-center border border-blue-200">
                <div className="text-center">
                  <div className="text-4xl mb-2 bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">🗺️</div>
                  <p className="text-blue-800 font-medium">Boston, MA</p>
                  <p className="text-gray-600 text-sm">Visit us by appointment</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* FAQ Section */}
        <section className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
          <h2 className="text-3xl font-bold mb-8 text-blue-800">Common Questions</h2>
          
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="pb-6 border-b border-gray-200 last:border-0 group">
                <h3 className="text-xl font-semibold text-blue-700 mb-3 group-hover:text-green-600 transition-colors">
                  {faq.question}
                </h3>
                <p className="text-gray-700">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

const faqs = [
  {
    question: "How quickly will I receive a response?",
    answer: "Our team typically responds within 1 business day. For urgent matters, please call our support line."
  },
  {
    question: "Do you offer on-site demonstrations?",
    answer: "Yes, we can schedule product demos at your facility or virtually via our secure platform."
  },
  {
    question: "Is Mediverse HIPAA compliant?",
    answer: "Absolutely. We maintain the highest standards of healthcare data security and privacy."
  },
  {
    question: "What integration options are available?",
    answer: "Our platform integrates with all major EHR systems. Contact us for specific compatibility details."
  }
];