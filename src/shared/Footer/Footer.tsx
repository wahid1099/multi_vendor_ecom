import {
  FiFacebook,
  FiTwitter,
  FiInstagram,
  FiLinkedin,
  FiMail,
} from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8">
      <div className="container mx-auto px-4">
        {/* Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">About Us</h3>
            <p className="text-sm">
              Your go-to platform for all your shopping needs. Discover amazing
              deals and enjoy a seamless shopping experience.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/about-us" className="hover:text-white transition">
                  About Us
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-white transition">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="/privacy" className="hover:text-white transition">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms" className="hover:text-white transition">
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Support */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">
              Customer Support
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/help" className="hover:text-white transition">
                  Help Center
                </a>
              </li>
              <li>
                <a href="/returns" className="hover:text-white transition">
                  Returns & Refunds
                </a>
              </li>
              <li>
                <a href="/shipping" className="hover:text-white transition">
                  Shipping Info
                </a>
              </li>
              <li>
                <a href="/faq" className="hover:text-white transition">
                  FAQs
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">
              Contact Us
            </h3>
            <p className="text-sm">Email: support@ecommerce.com</p>
            <p className="text-sm">Phone: +1-202-555-0104</p>
            <div className="flex space-x-4 mt-4">
              <a
                href="https://facebook.com"
                className="hover:text-white transition"
              >
                <FiFacebook size={20} />
              </a>
              <a
                href="https://twitter.com"
                className="hover:text-white transition"
              >
                <FiTwitter size={20} />
              </a>
              <a
                href="https://instagram.com"
                className="hover:text-white transition"
              >
                <FiInstagram size={20} />
              </a>
              <a
                href="https://linkedin.com"
                className="hover:text-white transition"
              >
                <FiLinkedin size={20} />
              </a>
              <a
                href="mailto:support@ecommerce.com"
                className="hover:text-white transition"
              >
                <FiMail size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-8 border-t border-gray-700 pt-4 text-center text-sm">
          <p>
            © {new Date().getFullYear()} E-Commerce Website. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
