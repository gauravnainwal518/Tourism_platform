import React, { useState, useEffect } from "react";

// Import section videos
import adventureVideo from "../assets/videos/adventure.mp4";
import destinationVideo from "../assets/videos/destination.mp4";
import festivalVideo from "../assets/videos/festival.mp4";

// Import individual adventure images
import bungeeImg from "../assets/images/bungee.jpg";
import raftingImg from "../assets/images/rafting.jpg";
import trekkingImg from "../assets/images/trekking.jpg";
import paraglidingImg from "../assets/images/paragliding.jpg";
import skiingImg from "../assets/images/skiing.jpg";
import safariImg from "../assets/images/safari.jpg";

// Import destination images
import destinationImg1 from "../assets/images/destination1.jpg";
import destinationImg2 from "../assets/images/destination2.jpg";
import destinationImg3 from "../assets/images/destination3.jpg";
import destinationImg4 from "../assets/images/destination4.jpg";
import destinationImg5 from "../assets/images/destination5.jpg";
import destinationImg6 from "../assets/images/destination6.jpg";
import destinationImg7 from "../assets/images/destination7.jpg";
import destinationImg8 from "../assets/images/destination8.jpg";
import destinationImg9 from "../assets/images/destination9.jpg";
import destinationImg10 from "../assets/images/destination10.jpg";
import destinationImg11 from "../assets/images/destination11.jpg";
import destinationImg12 from "../assets/images/destination12.jpg";
import destinationImg13 from "../assets/images/destination13.jpg";
import destinationImg14 from "../assets/images/destination14.jpg";
import destinationImg15 from "../assets/images/destination15.jpg";
import destinationImg16 from "../assets/images/destination16.jpg";
import destinationImg17 from "../assets/images/destination17.jpg";
import destinationImg18 from "../assets/images/destination18.jpg";
import destinationImg19 from "../assets/images/destination19.jpg";
import destinationImg20 from "../assets/images/destination20.jpg";
import destinationImg21 from "../assets/images/destination21.jpg";
import destinationImg22 from "../assets/images/destination22.jpg";
import destinationImg23 from "../assets/images/destination23.jpg";
import destinationImg24 from "../assets/images/destination24.jpg";

// Import festival images
import festivalImg1 from "../assets/images/festival1.jpg";
import festivalImg2 from "../assets/images/festival2.jpg";
import festivalImg3 from "../assets/images/festival3.jpg";
import festivalImg4 from "../assets/images/festival4.jpg";
import festivalImg5 from "../assets/images/festival5.jpg";
import festivalImg6 from "../assets/images/festival6.jpg";
import festivalImg7 from "../assets/images/festival7.jpg";
import festivalImg8 from "../assets/images/festival8.jpg";
import festivalImg9 from "../assets/images/festival9.jpg";
import festivalImg10 from "../assets/images/festival10.jpg";
import festivalImg11 from "../assets/images/festival11.jpg";
import festivalImg12 from "../assets/images/festival12.jpg";

//this code is very large and its functionality is bit complex and we use other functionalites to handle it
const ExperienceList = () => {
  const [activeTab, setActiveTab] = useState("adventures");
  const [flippedCards, setFlippedCards] = useState({});
  const [videoSrc, setVideoSrc] = useState(adventureVideo);

  // Update video source when active tab changes
  useEffect(() => {
    if (activeTab === "adventures") {
      setVideoSrc(adventureVideo);
    } else if (activeTab === "destinations") {
      setVideoSrc(destinationVideo);
    } else if (activeTab === "festivals") {
      setVideoSrc(festivalVideo);
    }
  }, [activeTab]);

  // Toggle flip state when the card is hovered over
  const handleMouseEnter = (index) => {
    setFlippedCards((prev) => ({
      ...prev,
      [index]: true,
    }));
  };

  // Reset flip state when the mouse leaves
  const handleMouseLeave = (index) => {
    setFlippedCards((prev) => ({
      ...prev,
      [index]: false,
    }));
  };

  // Card data for each tab
  const tabData = {
    adventures: [
      {
        img: bungeeImg,
        title: "Bungee Jumping",
        description:
          "Uttarakhand offers an unforgettable bungee jumping experience, especially in Rishikesh, home to India’s first fixed-platform jump at 83 meters. Nestled amidst the stunning Shivalik hills, it combines adventure with breathtaking views. With certified professionals ensuring safety, it’s a must-try for thrill-seekers.",
      },
      {
        img: raftingImg,
        title: "River Rafting",
        description:
          "Uttarakhand is a hub for thrilling river rafting adventures, especially in Rishikesh along the Ganges. The rapids range from beginner to advanced, offering excitement for all levels amidst stunning natural beauty. With professional guides ensuring safety, rafting here is a must-try experience.",
      },
      {
        img: trekkingImg,
        title: "Trekking",
        description:
          "Uttarakhand is a trekker’s paradise, offering scenic trails like Valley of Flowers, Kedarkantha, and Roopkund amidst the majestic Himalayas. With its diverse landscapes, from lush meadows to snow-clad peaks, it’s perfect for adventure and nature enthusiasts.",
      },
      {
        img: paraglidingImg,
        title: "Paragliding",
        description:
          "Uttarakhand offers breathtaking paragliding experiences, soaring over scenic valleys and majestic Himalayan landscapes.",
      },
      {
        img: skiingImg,
        title: "Skiing",
        description:
          "Uttarakhand is a prime destination for skiing, with snow-covered slopes in Auli offering thrilling adventures amidst the Himalayas.",
      },
      {
        img: safariImg,
        title: "Safari Adventure",
        description:
          "Uttarakhand’s safari adventures, especially in Jim Corbett and Rajaji National Parks, offer thrilling encounters with tigers, elephants, and diverse wildlife. Exploring lush forests and grasslands, these safaris are perfect for nature and adventure lovers.",
      },
    ],
    destinations: [
      {
        img: destinationImg1,
        title: "Ranikhet",
        description:
          "Ranikhet, a serene hill station in Uttarakhand, offers panoramic views of the Himalayas and lush green meadows. Known for its tranquility, it’s a perfect getaway for nature lovers and peace seekers.",
      },
      {
        img: destinationImg2,
        title: "Almora",
        description:
          "Almora, a charming hill station in Uttarakhand, is known for its scenic beauty, rich culture, and stunning views of the Himalayan ranges. It offers a peaceful retreat with vibrant local markets, ancient temples, and serene landscapes.",
      },

      {
        img: destinationImg3,
        title: "Bhimtal",
        description:
          "Bhimtal is a serene town in Uttarakhand, known for its picturesque lake surrounded by lush greenery and tranquil hills.",
      },

      {
        img: destinationImg4,
        title: "Nainital",
        description:
          "Nainital, nestled in the Kumaon region of Uttarakhand, is a charming hill station renowned for its scenic Naini Lake and breathtaking views of the surrounding mountains.",
      },

      {
        img: destinationImg5,
        title: "Sattal",
        description:
          "Sattal is a peaceful cluster of seven interconnected freshwater lakes in Uttarakhand, surrounded by dense forests and rich biodiversity, making it a paradise for nature lovers.",
      },

      {
        img: destinationImg6,
        title: "Badrinath",
        description:
          "Badrinath, nestled in the Garhwal Himalayas of Uttarakhand, is a sacred town known for the revered Badrinath Temple, dedicated to Lord Vishnu.",
      },

      {
        img: destinationImg7,
        title: "Kedarnath",
        description:
          "Kedarnath, located in the Garhwal Himalayas of Uttarakhand, is a revered pilgrimage site famous for the ancient Kedarnath Temple dedicated to Lord Shiva.",
      },

      {
        img: destinationImg8,
        title: "Valley of flowers",
        description:
          "The Valley of Flowers in Uttarakhand is a UNESCO World Heritage Site renowned for its breathtaking meadows of alpine blooms and stunning natural beauty.",
      },

      {
        img: destinationImg9,
        title: "Pantnagar",
        description:
          "Pantnagar, in Uttarakhand, India, is known for hosting G.B. Pant University of Agriculture and Technology, a pioneer in agricultural education and research.",
      },

      {
        img: destinationImg10,
        title: "Pithoragarh",
        description:
          "Pithoragarh, often called the Little Kashmir of Uttarakhand, is known for its stunning landscapes, rich cultural heritage, and proximity to the Himalayas.",
      },

      {
        img: destinationImg11,
        title: "Jageshwar Dham ",
        description:
          "Jageshwar Dham, a sacred Hindu site nestled amidst the Kumaon Hills, is renowned for its ancient temples dedicated to Lord Shiva.",
      },

      {
        img: destinationImg12,
        title: "Haridwar",
        description:
          "Haridwar, the Gateway to the Gods, is a sacred Hindu city in Uttarakhand renowned for its holy Ganges River and ancient temples.",
      },

      {
        img: destinationImg13,
        title: "Mukteshwar",
        description:
          "Mukteshwar is a picturesque hill station in Uttarakhand, India, renowned for its breathtaking views of the Himalayas and its serene ambiance.",
      },

      {
        img: destinationImg14,
        title: "Gangotri",
        description:
          "Gangotri, the source of the sacred Ganges River, is a revered pilgrimage site nestled amidst the majestic Himalayas in Uttarakhand, India.",
      },

      {
        img: destinationImg15,
        title: "Munsyari",
        description:
          "Munsyari, a remote and picturesque village in Uttarakhand, India, offers stunning views of the Panchchuli peaks and a glimpse into the traditional Kumaoni lifestyle.",
      },

      {
        img: destinationImg16,
        title: "Pauri Garhwal",
        description:
          "Pauri Garhwal, a historic town in Uttarakhand, India, serves as the administrative headquarters of the district and offers a blend of natural beauty and cultural heritage.",
      },

      {
        img: destinationImg17,
        title: "Tehri",
        description:
          "Tehri, a district in Uttarakhand, India, is known for the massive Tehri Dam and its scenic beauty, offering stunning views of the Himalayas and the Tehri Lake.",
      },

      {
        img: destinationImg18,
        title: "Kausani",
        description:
          "Kausani, a charming hill station in Uttarakhand, India, is renowned for its panoramic views of the majestic Himalayan peaks, including Nanda Devi.",
      },

      {
        img: destinationImg19,
        title: "Hemkund sahib",
        description:
          "Hemkund Sahib, a revered Sikh shrine nestled amidst the stunning Himalayan landscape in Uttarakhand, India, is dedicated to Guru Gobind Singh Ji.",
      },

      {
        img: destinationImg20,
        title: "Yamumotri",
        description:
          "Yamunotri, the source of the Yamuna River, is a revered Hindu pilgrimage site nestled amidst the majestic Himalayas in Uttarakhand, India.",
      },

      {
        img: destinationImg21,
        title: "Golu devta temple",
        description:
          "The Golu Devta Temple in Ghorakhal, Uttarakhand, is a unique and revered shrine known for its thousands of bells offered by devotees seeking justice and fulfillment of wishes.",
      },

      {
        img: destinationImg22,
        title: "Dhari devi temple",
        description:
          "The Dhari Devi Temple, perched on a cliff overlooking the Ganges River in Rishikesh, Uttarakhand, is a revered shrine dedicated to Goddess Durga and offers breathtaking views of the surrounding landscape.",
      },

      {
        img: destinationImg23,
        title: "Tungnath",
        description:
          "Tungnath is the highest Shiva temple in the world, nestled amidst the breathtaking Himalayan peaks in Uttarakhand, India.",
      },

      {
        img: destinationImg24,
        title: "Kainchi Dham",
        description:
          "Kainchi Dham, a serene ashram nestled in the foothills of the Himalayas in Uttarakhand, India, is renowned as the spiritual abode of Neem Karoli Baba, a revered saint.",
      },
    ],
    festivals: [
      {
        img: festivalImg1,
        title: "Kumbh mela",
        description:
          "Kumbh Mela is the world's largest peaceful gathering of pilgrims, celebrated at four sacred river sites in India every twelve years.",
      },
      {
        img: festivalImg2,
        title: "Kainchi dham mela",
        description:
          "The Kainchi Dham Mela is a vibrant annual fair held at Neem Karoli Baba's ashram in Uttarakhand, attracting devotees from around the world.",
      },

      {
        img: festivalImg3,
        title: "Nanda devi mahotsav",
        description:
          "The Nanda Devi Mahotsav in Nainital is a vibrant cultural festival celebrating the revered Goddess Nanda Devi, featuring traditional music, dance, and religious processions.",
      },
      {
        img: festivalImg4,
        title: "Phool dei",
        description:
          "Phool Dei is a vibrant spring festival celebrated in Uttarakhand, where children gather wildflowers to decorate homes and offer to deities, welcoming the new season with joy and gratitude.",
      },
      {
        img: festivalImg5,
        title: "Harela",
        description:
          "Harela is a vibrant festival celebrated in Uttarakhand, marking the onset of the monsoon season and the planting of new crops, with festivities centered around nature, agriculture, and the marriage of Lord Shiva and Goddess Parvati.",
      },
      {
        img: festivalImg6,
        title: "Ghughuti",
        description:
          "Ghughuti is a unique festival celebrated in the Kumaon region of Uttarakhand, where children sing folk songs to crows and offer them sweetmeats as a mark of respect for the birds.",
      },
      {
        img: festivalImg7,
        title: "Egas parv",
        description:
          "Egas Parv is a unique festival celebrated in Uttarakhand, commemorating the bravery of Veer Madho Singh Bhandari and marking the delayed arrival of news of Lord Rama's return to Ayodhya in the Himalayan region.",
      },
      {
        img: festivalImg8,
        title: "Ghee sakranti",
        description:
          "Ghee Sankranti is a significant monsoon festival celebrated in Uttarakhand, marking the beginning of the Bhado month and showcasing gratitude for nature's bounty.",
      },
      {
        img: festivalImg9,
        title: "Devidhura mela",
        description:
          "The Devidhura Mela is a unique annual festival held in Uttarakhand, famous for its Bagwal ritual, a traditional stone-pelting event believed to appease the Goddess Barahi Devi.",
      },
      {
        img: festivalImg10,
        title: "Syalde Bikhauti mela",
        description:
          "The Syalde Bikhauti Mela is a vibrant annual fair held in Dwarahat, Uttarakhand, known for its traditional music, dance, and cultural performances.",
      },
      {
        img: festivalImg11,
        title: "Kanwar yatra",
        description:
          "The Kanwar Yatra is an annual pilgrimage of Shiva devotees who walk barefoot to fetch holy Ganges water from Haridwar and offer it to Shiva temples.",
      },
      {
        img: festivalImg12,
        title: "Vat savitri",
        description:
          "Vat Savitri Vrat is a significant festival in Uttarakhand where married women observe a fast for the long life and well-being of their husbands.",
      },
    ],
  };

  // Function to render content dynamically based on active tab
  const renderTabContent = () => {
    const content = tabData[activeTab];

    return (
      <>
        <div className="relative w-full h-96 mb-6">
          <video
            key={videoSrc} // imp-This forces the video to reload every time the source changes
            className="w-full h-full object-cover "
            autoPlay
            loop
            muted
            playsInline
          >
            <source src={videoSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        <div className="mt-6 text-center">
          <h2 className="text-4xl font-extrabold text-gray-900">
            {activeTab === "adventures"
              ? "Thrilling Adventures Await"
              : activeTab === "destinations"
              ? "Beautiful Destinations to Explore"
              : "Festivals Full of Joy"}
          </h2>
          <p className="text-lg text-gray-700 mt-4">
            {activeTab === "adventures"
              ? "Experience the rush of adrenaline and the beauty of nature."
              : activeTab === "destinations"
              ? "Embrace the beauty of nature and explore hidden gems."
              : "Join in celebrations filled with culture and fun."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-8">
          {content.map((item, index) => (
            <div
              key={index}
              className={`card-container ${
                flippedCards[index] ? "flipped" : ""
              }`}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={() => handleMouseLeave(index)}
            >
              <div className="card">
                <div className="card-front">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  <h3 className="text-xl font-semibold mt-4 text-center">
                    {item.title}
                  </h3>
                </div>
                <div className="card-back bg-gray-800 text-white p-4 rounded-lg flex items-center justify-center transform rotate-y-180">
                  <div className="text-center p-4">
                    <h3 className="text-lg font-bold">{item.title}</h3>
                    <p className="mt-2">{item.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  };

  return (
    <div>
      <div className="flex justify-center space-x-8 mt-3 mb-8">
        <button
          className={`px-6 py-3 rounded-lg text-lg font-semibold transition duration-300 ${
            activeTab === "adventures"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-800 hover:bg-blue-500 hover:text-white"
          }`}
          onClick={() => setActiveTab("adventures")}
        >
          Adventures
        </button>
        <button
          className={`px-6 py-3 rounded-lg text-lg font-semibold transition duration-300 ${
            activeTab === "destinations"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-800 hover:bg-blue-500 hover:text-white"
          }`}
          onClick={() => setActiveTab("destinations")}
        >
          Destinations
        </button>
        <button
          className={`px-6 py-3 rounded-lg text-lg font-semibold transition duration-300 ${
            activeTab === "festivals"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-800 hover:bg-blue-500 hover:text-white"
          }`}
          onClick={() => setActiveTab("festivals")}
        >
          Festivals
        </button>
      </div>

      {renderTabContent()}
    </div>
  );
};

export default ExperienceList;
