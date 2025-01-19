import { FaLightbulb, FaShareAlt, FaTools } from "react-icons/fa";

function InfoCards() {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-center my-8 p-2">
      <div className="max-w-sm rounded-lg overflow-hidden shadow-md bg-gray-800 text-white transform transition duration-500 hover:shadow-xl mx-auto">
        <div className="px-6 py-4">
          <FaTools className="text-teal-400 mb-2" size={24} />
          <div className="font-bold text-xl mb-2">Build and Test</div>
          <p className="text-gray-400 text-base">
            Start building your projects and test your ideas with our powerful
            tools and resources.
          </p>
        </div>
        <div className="px-6 pt-4 pb-6">
          <button className="bg-teal-500 text-white px-4 py-2 rounded-full hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500">
            Explore Features
          </button>
        </div>
      </div>

      <div className="max-w-sm rounded-lg overflow-hidden shadow-md bg-gray-800 text-white transform transition duration-500 hover:shadow-xl mx-auto">
        <div className="px-6 py-4">
          <FaLightbulb className="text-purple-400 mb-2" size={24} />
          <div className="font-bold text-xl mb-2">Learn and Discover</div>
          <p className="text-gray-400 text-base">
            Explore new technologies, learn from tutorials, and discover
            innovative solutions.
          </p>
        </div>
        <div className="px-6 pt-4 pb-6">
          <button className="bg-purple-500 text-white px-4 py-2 rounded-full hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500">
            Get Started
          </button>
        </div>
      </div>

      <div className="max-w-sm rounded-lg overflow-hidden shadow-md bg-gray-800 text-white transform transition duration-500 hover:shadow-xl mx-auto">
        <div className="px-6 py-4">
          <FaShareAlt className="text-red-400 mb-2" size={24} />
          <div className="font-bold text-xl mb-2">Share Your Work</div>
          <p className="text-gray-400 text-base">
            Showcase your projects, share your progress, and get feedback from
            the community.
          </p>
        </div>
        <div className="px-6 pt-4 pb-6">
          <button className="bg-red-500 text-white px-4 py-2 rounded-full hover focus:outline-none focus:ring-2 focus:ring-red-500">
            Join the Community
          </button>
        </div>
      </div>
    </section>
  );
}

export default InfoCards;
