const TermsConditions = () => {
  return (
    <div className="bg-gray-100 min-h-screen py-12 px-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-purple-600 mb-6">
          Terms & Conditions
        </h1>
        <p className="text-gray-600 leading-relaxed mb-4">
          These Terms & Conditions govern your use of our platform. By accessing
          or using our services, you agree to comply with these terms.
        </p>

        <h2 className="text-xl font-semibold text-gray-700 mb-2">
          1. User Responsibilities
        </h2>
        <p className="text-gray-600 mb-4">
          You are responsible for maintaining the confidentiality of your
          account and password and for all activities that occur under your
          account.
        </p>

        <h2 className="text-xl font-semibold text-gray-700 mb-2">
          2. Prohibited Activities
        </h2>
        <p className="text-gray-600 mb-4">
          You may not use our platform for illegal activities, to harm others,
          or to violate the rights of any party. Violations may result in
          termination of your account.
        </p>

        <h2 className="text-xl font-semibold text-gray-700 mb-2">
          3. Intellectual Property
        </h2>
        <p className="text-gray-600 mb-4">
          All content on our platform, including text, images, and logos, is
          owned by us or our partners. You may not use this content without
          permission.
        </p>

        <h2 className="text-xl font-semibold text-gray-700 mb-2">
          4. Limitation of Liability
        </h2>
        <p className="text-gray-600 mb-4">
          We are not liable for any direct, indirect, incidental, or
          consequential damages arising from your use of our platform.
        </p>

        <h2 className="text-xl font-semibold text-gray-700 mb-2">
          5. Updates to These Terms
        </h2>
        <p className="text-gray-600 mb-4">
          We reserve the right to update these terms at any time. By continuing
          to use our platform, you agree to the updated terms.
        </p>

        <p className="text-gray-600">
          If you have any questions about these Terms & Conditions, please{" "}
          <a href="/contact" className="text-purple-600 hover:underline">
            contact us
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default TermsConditions;
