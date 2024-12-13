const AboutUs = () => {
  return (
    <div className="bg-gray-100 min-h-screen py-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="bg-purple-600 text-white rounded-lg shadow-lg p-8 md:p-12 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">About Us</h1>
          <p className="text-lg md:text-xl">
            Welcome to our Multi-Vendor E-commerce Platform – where sellers and
            buyers come together!
          </p>
        </div>

        {/* Section: Who We Are */}
        <div className="bg-white shadow-lg rounded-lg p-6 md:p-10 mt-10">
          <h2 className="text-2xl md:text-3xl font-bold text-purple-600 mb-4">
            Who We Are
          </h2>
          <p className="text-gray-700 leading-relaxed">
            We are a diverse marketplace designed to empower both vendors and
            customers. Our platform bridges the gap between sellers and buyers,
            allowing vendors to showcase their products while providing
            customers with a seamless shopping experience. Whether you're a
            small artisan or a large retailer, our platform is here to help you
            succeed.
          </p>
        </div>

        {/* Section: Our Mission */}
        <div className="bg-white shadow-lg rounded-lg p-6 md:p-10 mt-8">
          <h2 className="text-2xl md:text-3xl font-bold text-purple-600 mb-4">
            Our Mission
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Our mission is to create an inclusive, innovative, and reliable
            e-commerce ecosystem where vendors can thrive and customers can shop
            with confidence. We aim to redefine the online marketplace
            experience by fostering trust, transparency, and convenience.
          </p>
        </div>

        {/* Section: Why Choose Us */}
        <div className="bg-white shadow-lg rounded-lg p-6 md:p-10 mt-8">
          <h2 className="text-2xl md:text-3xl font-bold text-purple-600 mb-4">
            Why Choose Us?
          </h2>
          <ul className="text-gray-700 leading-relaxed list-disc pl-6">
            <li>Easy-to-use platform for vendors and customers.</li>
            <li>Secure transactions and a wide range of payment options.</li>
            <li>Customer support available 24/7.</li>
            <li>Access to unique products from vendors worldwide.</li>
            <li>Tools and resources to help vendors grow their businesses.</li>
          </ul>
        </div>

        {/* Section: Meet Our Team */}
        <div className="bg-white shadow-lg rounded-lg p-6 md:p-10 mt-8">
          <h2 className="text-2xl md:text-3xl font-bold text-purple-600 mb-4">
            Meet Our Team
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Behind our platform is a team of dedicated professionals committed
            to providing the best experience for both vendors and customers.
            From our customer support team to our technical experts, we're here
            to ensure everything runs smoothly.
          </p>
        </div>

        {/* Section: Call to Action */}
        <div className="bg-purple-600 text-white rounded-lg shadow-lg p-8 md:p-12 text-center mt-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Join Us Today!
          </h2>
          <p className="text-lg md:text-xl mb-6">
            Whether you're a vendor looking to expand your reach or a customer
            searching for unique products, we've got you covered.
          </p>
          <a
            href="/signup"
            className="bg-white text-purple-600 px-6 py-2 rounded-lg font-bold hover:bg-gray-200"
          >
            Get Started
          </a>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
