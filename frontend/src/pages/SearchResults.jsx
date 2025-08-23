import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader";
import SearchBar from "../components/SearchBar";

const GEOAPIFY_API_KEY = import.meta.env.VITE_GEOAPIFY_API_KEY;

const SearchResults = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const query = params.get("q");
  const category = params.get("category");

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) return;

    const fetchPlaces = async () => {
      setLoading(true);

      try {
        const geoRes = await axios.get(
          "https://api.geoapify.com/v1/geocode/search",
          {
            params: {
              text: query,
              apiKey: GEOAPIFY_API_KEY,
            },
          }
        );

        const locationData = geoRes.data.features[0];
        if (!locationData) {
          setResults([]);
          return;
        }

        const { lat, lon } = locationData.properties;

        const placesRes = await axios.get(
          "https://api.geoapify.com/v2/places",
          {
            params: {
              categories: category,
              filter: `circle:${lon},${lat},10000`,
              bias: `proximity:${lon},${lat}`,
              limit: 20,
              apiKey: GEOAPIFY_API_KEY,
            },
          }
        );

        const places = placesRes.data.features || [];
        setResults(places);
      } catch (err) {
        console.error("Geoapify fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaces();
  }, [query, category]);

  return (
    <div className="bg-gradient-to-b from-yellow-50 to-white min-h-screen px-4 md:px-8 py-12 text-gray-900">
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader />
        </div>
      ) : results.length === 0 ? (
        <div className="text-center mt-8 space-y-4">
          <p className="text-gray-700 text-lg">
            Sorry for the inconvenience. We do not have data for this search
            because Geoapify has limited coverage.
          </p>
          <p className="text-gray-600">
            You can try searching for other places or categories:
          </p>
          <div className="max-w-md mx-auto">
            <SearchBar />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {results.map((place, idx) => {
            const name = place.properties.name || "Unnamed Place";
            const address = place.properties.address_line1 || "";
            const city = place.properties.city || "";
            const postcode = place.properties.postcode || "";
            const phone = place.properties.phone || "";
            const website = place.properties.website || "";
            const openingHours = place.properties.opening_hours?.text || "";
            const categories =
              place.properties.categories?.join(", ") || "General";

            return (
              <div
                key={idx}
                className="group border rounded-xl p-5 bg-gradient-to-b from-yellow-100 to-yellow-50 shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2"
              >
                <h2 className="font-bold text-lg md:text-xl mb-2 text-orange-800">
                  {name}
                </h2>
                {categories && (
                  <p className="text-sm text-orange-600 mb-1">{categories}</p>
                )}
                {address && (
                  <p className="text-sm text-gray-600 mb-1">{address}</p>
                )}
                {city && (
                  <p className="text-sm text-gray-600 mb-1">City: {city}</p>
                )}
                {postcode && (
                  <p className="text-sm text-gray-600 mb-1">
                    Postal: {postcode}
                  </p>
                )}
                {phone && (
                  <p className="text-sm text-gray-600 mb-1">Phone: {phone}</p>
                )}
                {website && (
                  <a
                    href={website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 text-sm mb-1 block hover:underline"
                  >
                    Website
                  </a>
                )}
                {openingHours && (
                  <p className="text-sm text-gray-600">Hours: {openingHours}</p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
