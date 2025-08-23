import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import Loader from "../components/Loader";

import GodGrace from "../assets/images/Godgrace.jpg";
import Cultural from "../assets/images/culturalh.jpg";
import Wildlife from "../assets/images/wildlife.jpg";
import Natural from "../assets/images/natural.jpg";
import Food from "../assets/images/food.jpg";
import History from "../assets/images/history.jpg";

const cardData = [
  {
    img: GodGrace,
    title: "Trekking",
    description:
      "Explore trails to Kedarkantha, Valley of Flowers, Roopkund, Har Ki Dun, and Nag Tibba.",
  },
  {
    img: Cultural,
    title: "Cultural Heritage",
    description:
      "Discover Kedarnath, Badrinath, Ganga Aarti, and vibrant festivals like Kumbh Mela.",
  },
  {
    img: Wildlife,
    title: "Wildlife",
    description:
      "Experience Jim Corbett, Rajaji Tiger Reserve & rare Himalayan wildlife.",
  },
  {
    img: Natural,
    title: "Natural Beauty",
    description:
      "Marvel at Himalayan peaks, lakes, and waterfalls across Uttarakhand.",
  },
  {
    img: Food,
    title: "Traditional Food",
    description:
      "Taste Bhatt Ki Churdkani, Aloo Ke Gutke & authentic Kumaoni delicacies.",
  },
  {
    img: History,
    title: "Historical Sites",
    description:
      "Explore Jageshwar Temples, Katarmal Sun Temple & Almora Fort.",
  },
];

const Home = () => {
  const navigate = useNavigate();
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [mainVideo, setMainVideo] = useState(null);

  // Lazy load video
  useEffect(() => {
    const videoImport = import("../assets/videos/mainvideo.mp4");
    videoImport.then((video) => {
      setMainVideo(video.default);
    });
  }, []);

  if (!mainVideo) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <div className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden flex items-center justify-center">
        {!videoLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-black">
            <Loader />
          </div>
        )}
        <video
          src={mainVideo}
          className={`w-full h-full object-cover transition-opacity duration-1000 ${
            videoLoaded ? "opacity-100" : "opacity-0"
          }`}
          autoPlay
          muted
          loop
          onLoadedData={() => setVideoLoaded(true)}
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-yellow-300 text-3xl sm:text-4xl md:text-5xl font-bold mb-3 drop-shadow-lg">
            Welcome to Uttarakhand
          </h1>
          <p className="text-yellow-100 text-base sm:text-lg md:text-xl mb-5 max-w-md drop-shadow-md">
            Immerse yourself in the mountains, rivers, culture, and wildlife of
            the Himalayan paradise.
          </p>
          <div className="w-full max-w-md">
            <SearchBar className="w-full rounded-md" />
          </div>
        </div>
      </div>

      {/* Discover Section */}
      <section className="px-4 md:px-6 py-12 bg-gradient-to-b from-yellow-50 to-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-orange-700 mb-8">
            Explore Top Attractions
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {cardData.map((item, index) => (
              <div
                key={index}
                className="group relative rounded-lg overflow-hidden shadow-md hover:shadow-xl transition duration-300 transform hover:-translate-y-2"
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col items-center justify-center text-white px-4">
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-sm">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
