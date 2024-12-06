import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white text-center py-4 mt-12">
      <p>&copy; 2024 All Rights Reserved</p>
      <p>
        For any queries, email us at:
        <a
          href="mailto:example@example.com"
          className="text-blue-400 hover:underline ml-1"
        >
          gauravnainwal229@gmail.com
        </a>
      </p>
    </footer>
  );
};

export default Footer;
