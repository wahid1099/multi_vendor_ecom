const PrivacyPolicy = () => {
  return (
    <div className="bg-gray-100 min-h-screen py-12 px-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-purple-600 mb-6">
          Privacy Policy
        </h1>
        <p className="text-gray-600 leading-relaxed mb-4">
          Your privacy is important to us. This Privacy Policy explains how we
          collect, use, and protect your personal information when you use our
          platform.
        </p>

        <h2 className="text-xl font-semibold text-gray-700 mb-2">
          1. Information We Collect
        </h2>
        <p className="text-gray-600 mb-4">
          We may collect personal information, including your name, email
          address, phone number, and payment details, when you register, make a
          purchase, or use our services.
        </p>

        <h2 className="text-xl font-semibold text-gray-700 mb-2">
          2. How We Use Your Information
        </h2>
        <p className="text-gray-600 mb-4">
          Your information is used to provide and improve our services, process
          transactions, and communicate with you about your account or orders.
        </p>

        <h2 className="text-xl font-semibold text-gray-700 mb-2">
          3. Sharing Your Information
        </h2>
        <p className="text-gray-600 mb-4">
          We do not sell your personal information. We may share it with trusted
          partners to provide services like payment processing or shipping.
        </p>

        <h2 className="text-xl font-semibold text-gray-700 mb-2">
          4. Your Rights
        </h2>
        <p className="text-gray-600 mb-4">
          You have the right to access, update, or delete your personal
          information at any time. Contact us if you have any concerns about
          your data.
        </p>

        <h2 className="text-xl font-semibold text-gray-700 mb-2">
          5. Updates to This Policy
        </h2>
        <p className="text-gray-600 mb-4">
          We may update this policy periodically. We encourage you to review
          this page regularly for any changes.
        </p>

        <p className="text-gray-600">
          If you have any questions about this Privacy Policy, please{" "}
          <a href="/contact" className="text-purple-600 hover:underline">
            contact us
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
