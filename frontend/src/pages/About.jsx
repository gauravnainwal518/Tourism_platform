import React from "react";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100 via-green-50 to-white text-gray-900 px-6 py-12">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-6 text-green-800">About Us</h1>
        <p className="text-lg text-blue-800">
          Welcome to our Uttarakhand Tourism Platform – your gateway to the
          serene Himalayas and vibrant hill culture!
        </p>
        <p className="mt-4 text-gray-700">
          We connect travelers with passionate local guides, charming homestays,
          and unforgettable experiences across the mountains, valleys, and
          rivers of Uttarakhand. Our mission is to promote sustainable tourism
          while uplifting local communities.
        </p>
        <p className="mt-4 text-gray-700">
          From the tranquil shores of{" "}
          <span className="text-blue-600 font-semibold">Nainital</span> to the
          spiritual aura of{" "}
          <span className="text-purple-700 font-semibold">Rishikesh</span> and
          the adventure-filled trails of{" "}
          <span className="text-green-700 font-semibold">Auli</span>, our
          platform helps you explore the natural beauty, rich traditions, and
          hidden gems of this enchanting state.
        </p>
        <p className="mt-4 text-gray-700">
          Embark on a journey with us and discover Uttarakhand in all its
          splendor – a land of{" "}
          <span className="text-green-800 font-medium">mountains</span>,{" "}
          <span className="text-blue-600 font-medium">rivers</span>, and{" "}
          <span className="text-yellow-700 font-medium">memories</span> that
          last a lifetime.
        </p>
      </div>
    </div>
  );
};

export default About;
