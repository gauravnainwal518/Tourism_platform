import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Search } from "lucide-react";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("tourism.sights");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    navigate(`/search?q=${query}&category=${category}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col md:flex-row items-center gap-3 
                 bg-black bg-opacity-40 p-4 rounded-lg shadow-md"
    >
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter a location (e.g. Dehradun)"
        className="flex-grow px-4 py-2 rounded-lg border border-transparent
                   bg-black bg-opacity-30 text-yellow-100 placeholder-yellow-200
                   focus:outline-none focus:ring-2 focus:ring-yellow-300"
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="px-4 py-2 rounded-lg border border-transparent 
                   bg-black bg-opacity-30 text-yellow-100 focus:outline-none focus:ring-2 focus:ring-yellow-300"
      >
        <option value="tourism.sights">Tourist Spots</option>
        <option value="accommodation.hotel">Hotels</option>
        <option value="catering.restaurant">Restaurants</option>
        <option value="catering.cafe">Cafes</option>
        <option value="religion.place_of_worship">Religious Places</option>
        <option value="entertainment.museum">Museums</option>
        <option value="leisure.park">Parks</option>
        <option value="natural.viewpoint">Viewpoints</option>
      </select>

      <button
        type="submit"
        className="bg-yellow-400 hover:bg-yellow-500 text-black p-2 rounded-lg flex items-center justify-center"
      >
        <Search size={20} />
      </button>
    </form>
  );
};

export default SearchBar;
