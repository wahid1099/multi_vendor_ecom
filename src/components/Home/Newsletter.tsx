import { useState } from "react";
import { toast } from "sonner";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    // Simulate subscription action (replace with an API call)
    toast.success("Thank you for subscribing!");
    setEmail("");
  };

  return (
    <div className="bg-gray-100 p-6 md:p-10 rounded-lg shadow-lg max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Subscribe to Our Newsletter
      </h2>
      <p className="text-gray-600 mb-8 text-lg text-center">
        Stay updated with the latest news, updates, and special offers straight
        to your inbox.
      </p>
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full sm:flex-1 py-3 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
        />
        <button
          onClick={handleSubscribe}
          className="w-full sm:w-auto py-3 px-8 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition text-lg"
        >
          Subscribe
        </button>
      </div>
    </div>
  );
};

export default Newsletter;
