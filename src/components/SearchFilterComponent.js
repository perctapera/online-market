import React, { useState } from "react";
import { items } from "./data"; // Import the hardcoded items

const SearchFilterComponent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  // Extract unique categories for dropdown
  const categories = ["All", ...new Set(items.map((item) => item.category))];

  // Filter items based on search input and category selection
  const filteredItems = items.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || selectedCategory === "" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-4">
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search items..."
        className="border p-2 w-full rounded mb-2"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Category Filter Dropdown */}
      <select
        className="border p-2 w-full rounded mb-4"
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        {categories.map((category, index) => (
          <option key={index} value={category}>
            {category}
          </option>
        ))}
      </select>

      {/* Display Filtered Items */}
      <ul>
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <li key={item.id} className="p-2 border-b">
              {item.name} - {item.category}
            </li>
          ))
        ) : (
          <li className="p-2 text-gray-500">No matching items found</li>
        )}
      </ul>
    </div>
  );
};

export default SearchFilterComponent;
