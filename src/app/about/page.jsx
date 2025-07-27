export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-700 to-green-600 text-white py-20 px-5 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Redefining Healthcare Through Innovation</h1>
          <p className="text-xl md:text-2xl">Bridging technology and compassionate care for better health outcomes</p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-5 py-12">
        {/* Mission Section */}
        <section className="flex flex-col md:flex-row items-center gap-12 mb-16">
          <div className="flex-1">
            <h2 className="text-3xl font-bold mb-6 text-blue-800">Our Mission</h2>
            <p className="mb-4 text-gray-700 text-lg">
              At Mediverse, we're transforming healthcare delivery through intelligent technology solutions 
              that empower both patients and providers. Our integrated platform combines clinical excellence 
              with cutting-edge innovation.
            </p>
            <p className="text-gray-700 text-lg">
              Founded in 2018 by a team of physicians and technologists, we now serve over 500 healthcare 
              organizations nationwide.
            </p>
          </div>
          <div className="flex-1 bg-gradient-to-br from-blue-100 to-green-50 rounded-xl p-8 h-64 flex items-center justify-center border border-blue-200">
            <div className="text-center">
              <div className="text-6xl mb-4 bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">🏥</div>
              <h3 className="text-xl font-semibold text-blue-800">Precision Healthcare Solutions</h3>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="bg-white p-8 rounded-xl shadow-md mb-16 border border-gray-100">
          <h2 className="text-3xl font-bold mb-8 text-blue-800">Leadership Team</h2>
          <p className="mb-8 text-gray-700 text-lg">Our executive team combines decades of clinical and technological expertise.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow border border-gray-100">
                <div className={`h-48 flex items-center justify-center ${member.bgGradient}`}>
                  <span className="text-6xl">{member.emoji}</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-blue-800">{member.name}</h3>
                  <p className="text-green-600 font-semibold mb-2">{member.title}</p>
                  <p className="text-gray-700">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-gradient-to-r from-blue-700 to-green-600 text-white p-8 rounded-xl mb-16">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Impact</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-blue-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-white p-8 rounded-xl shadow-md text-center border border-gray-100">
          <h2 className="text-3xl font-bold mb-6 text-blue-800">Join the Future of Healthcare</h2>
          <p className="mb-8 text-gray-700 text-lg max-w-2xl mx-auto">
            Discover how Mediverse can transform your practice or healthcare experience.
          </p>
          <button className="bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600 text-white px-8 py-3 rounded-lg font-semibold text-lg transition-all shadow-md hover:shadow-lg">
            Get Started
          </button>
        </section>
      </div>
    </div>
  );
}

const teamMembers = [
  {
    name: "Dr. Sarah Johnson",
    title: "CEO & Co-Founder",
    bio: "Cardiologist with 18 years clinical experience",
    emoji: "👩‍⚕️",
    bgGradient: "bg-gradient-to-br from-blue-100 to-blue-50"
  },
  {
    name: "Michael Chen",
    title: "CTO",
    bio: "AI/ML specialist from MIT",
    emoji: "👨‍💻",
    bgGradient: "bg-gradient-to-br from-green-100 to-green-50"
  },
  {
    name: "Dr. Priya Patel",
    title: "Chief Medical Officer",
    bio: "Triple-board certified physician",
    emoji: "🧑‍⚕️",
    bgGradient: "bg-gradient-to-br from-blue-50 to-green-100"
  }
];

const stats = [
  { value: "500K+", label: "Patients Empowered" },
  { value: "10K+", label: "Providers Supported" },
  { value: "98%", label: "Satisfaction Rate" },
  { value: "4.9/5", label: "Average Rating" }
];