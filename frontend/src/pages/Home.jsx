import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import mainVideo from "../assets/videos/mainvideo.mp4";
import GodGrace from "../assets/images/Godgrace.jpg";
import Cultural from "../assets/images/culturalh.jpg";
import Wildlife from "../assets/images/wildlife.jpg";
import Natural from "../assets/images/natural.jpg";
import Food from "../assets/images/food.jpg";
import History from "../assets/images/history.jpg";

const Home = () => {
  const navigate = useNavigate();
  const [flippedCards, setFlippedCards] = useState({});

  // Toggle flip state when mouse enters the card
  const handleMouseEnter = (index) => {
    setFlippedCards((prev) => ({
      ...prev,
      [index]: true,
    }));
  };

  // Reset flip state when mouse leaves the card
  const handleMouseLeave = (index) => {
    setFlippedCards((prev) => ({
      ...prev,
      [index]: false,
    }));
  };

  const cardData = [
    {
      img: GodGrace,
      title: "Trekking",
      description:
        "Explore trails to Kedarkantha, Valley of Flowers, Roopkund, Har Ki Dun, and Nag Tibba. Discover breathtaking peaks, lush valleys, and serene Himalayan beauty.",
    },
    {
      img: Cultural,
      title: "Cultural Heritage",
      description:
        "Discover the spiritual charm of Kedarnath, Badrinath, Jageshwar Temples, and the iconic Ganga Aarti at Haridwar. Experience vibrant festivals like Kumbh Mela and Nanda Devi Raj Jaat.",
    },
    {
      img: Wildlife,
      title: "Wildlife",
      description:
        "Explore rich biodiversity at Jim Corbett National Park, Rajaji Tiger Reserve, and Nanda Devi Biosphere. Spot tigers, elephants, and rare Himalayan species in their natural habitats.",
    },
    {
      img: Natural,
      title: "Natural Beauty",
      description:
        "Marvel at the majestic Himalayan peaks, cascading waterfalls, and serene lakes like Nainital and Bhimtal. Immerse yourself in the lush green valleys and tranquil rivers that define this paradise.",
    },
    {
      img: Food,
      title: "Traditional Food",
      description:
        "Savor authentic dishes like Bhatt Ki Churdkani, Aloo Ke Gutke, and Kumaoni Raita, rich in flavors and tradition. Experience the earthy taste of Mandua Roti and Jhangora Kheer, crafted from local ingredients.",
    },
    {
      img: History,
      title: "Historical Sites",
      description:
        "Explore ancient marvels like the Jageshwar Temples, Katarmal Sun Temple, and the majestic Almora Fort. Discover the rich history and architecture that narrate tales of Uttarakhand's glorious past.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Full-Screen Video */}
      <div className="video-container flex items-center justify-center w-full h-screen">
        <video
          src={mainVideo}
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          controls
        />
      </div>

      {/* Discover Uttarakhand Section */}
      <section className="flex-grow px-6 py-12 bg-gray-100">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-blue-900 mb-8">
            Discover Uttarakhand
          </h2>

          {/* Photo Containers */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {cardData.map((item, index) => (
              <div
                className={`card-container relative ${
                  flippedCards[index] ? "flipped" : ""
                }`}
                key={index}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={() => handleMouseLeave(index)}
              >
                <div className="card transition-transform transform-style-preserve-3d">
                  {/* Front of the card */}
                  <div className="card-front absolute w-full h-64 rounded-lg overflow-hidden">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Back of the card */}
                  <div className="card-back absolute w-full h-64 bg-blue-900 text-white rounded-lg flex items-center justify-center transform rotate-y-180">
                    <div className="text-center p-4">
                      <h3 className="text-lg font-bold">{item.title}</h3>
                      <p className="mt-2">{item.description}</p>
                    </div>
                  </div>
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
