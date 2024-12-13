import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const ContactUs = () => {
  return (
    <div className="bg-gray-100 min-h-screen py-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-5xl font-bold text-purple-600">
            Contact Us
          </h1>
          <p className="text-gray-600 mt-4 text-sm md:text-base">
            We’d love to hear from you! Whether you have a question or need
            assistance, feel free to reach out to us.
          </p>
        </div>

        {/* Contact Form and Info */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Contact Form */}
          <div className="bg-white shadow-lg rounded-lg p-6 md:p-10 w-full md:w-2/3">
            <h2 className="text-2xl font-bold text-purple-600 mb-6">
              Send Us a Message
            </h2>
            <form className="space-y-6">
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Your Name"
                />
              </div>
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Your Email"
                />
              </div>
              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Your Message"
                ></textarea>
              </div>
              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-purple-600 text-white py-2 rounded-lg font-semibold hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="bg-white shadow-lg rounded-lg p-6 md:p-10 w-full md:w-1/3">
            <h2 className="text-2xl font-bold text-purple-600 mb-6">
              Contact Information
            </h2>
            <ul className="space-y-4">
              <li>
                <span className="block text-gray-700 font-medium">
                  Address:
                </span>
                <p className="text-gray-600">
                  123 E-commerce St, Business City, BC 12345
                </p>
              </li>
              <li>
                <span className="block text-gray-700 font-medium">Phone:</span>
                <p className="text-gray-600">+1 (234) 567-890</p>
              </li>
              <li>
                <span className="block text-gray-700 font-medium">Email:</span>
                <p className="text-gray-600">support@ecommerce.com</p>
              </li>
            </ul>
            <div className="mt-6">
              <h3 className="text-lg font-bold text-gray-700">Follow Us:</h3>
              <div className="flex space-x-4 mt-2">
                <a
                  href="#"
                  className="text-purple-600 hover:text-purple-800 text-xl"
                  aria-label="Facebook"
                >
                  <FaFacebook />
                </a>
                <a
                  href="#"
                  className="text-purple-600 hover:text-purple-800 text-xl"
                  aria-label="Twitter"
                >
                  <FaTwitter />
                </a>
                <a
                  href="#"
                  className="text-purple-600 hover:text-purple-800 text-xl"
                  aria-label="Instagram"
                >
                  <FaInstagram />
                </a>
                <a
                  href="#"
                  className="text-purple-600 hover:text-purple-800 text-xl"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
