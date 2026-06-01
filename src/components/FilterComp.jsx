import { useState } from "react";

export default function FilterComp({ brands, onBrandChange, categories, onCategoryChange, onMinPriceChange, onMaxPriceChange }) {
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  
  return (
    <aside className="fixed left-0 flex flex-col h-screen w-72 bg-white border-r border-gray-100 overflow-y-auto shadow-sm">

      {/* Header */}
      <div className="px-6 pt-20 pb-5 border-b border-gray-100">
        <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-[0.15em] mb-1">Shop By</p>
        <h2 className="text-xl font-bold text-gray-900">Filters</h2>
      </div>

      {/* Filter dengan category */}
      <div className="px-4 py-5 border-b border-gray-100">

        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.15em] px-2 mb-3">Category</p>
        <div className="flex flex-col gap-1">
          {
            categories.map((item) => (
              <button checked={selectedCategory === item.category} onClick={() => {
                if (selectedCategory === item.category) {
                  setSelectedCategory("");
                  onCategoryChange("");
                } else {
                  setSelectedCategory(item.category);
                  onCategoryChange(item.category);
                }
              }} key={item.category} className={"flex items-center justify-between px-3 py-2.5 rounded-xl grou[ transition-all " + (selectedCategory === item.category ? "bg-[#D4F931]" : "hover:bg-gray-50")}  >
                <span className={"text-[13px] font-semibold " + (selectedCategory === item.category ? "text-[#3a5000]" : "text-gray-500 group-hover:text-gray-800 transition-colors")}>{item.category}</span>
              </button>
            ))
          }

        </div>
      </div>

      {/* Harga */}
      <div className="px-4 py-5 border-b border-gray-100">
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.15em] px-2 mb-4">
          Price Range
        </p>

        <div className="px-2">
          {/* <input
            type="range"
            min="0"
            max="5000000"
            step="50000"
            defaultValue="2500000"
            onChange={(e) => onMaxPriceChange(e.target.value)}
            className="w-full accent-[#8bc400] h-1"
          /> */}

          <div className="flex gap-2 mt-4">
            <div className="flex-1">
              <p className="text-[10px] text-gray-400 mb-1.5 font-medium">
                MIN
              </p>

              <input
                type="number"
                placeholder="Rp 0"
                onChange={(e) => onMinPriceChange(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-[13px] text-gray-700 bg-gray-50 focus:outline-none focus:border-[#D4F931] transition-colors"
              />
            </div>

            <div className="flex items-end pb-0.5">
              <div className="w-3 h-px bg-gray-300 mb-3"></div>
            </div>

            <div className="flex-1">
              <p className="text-[10px] text-gray-400 mb-1.5 font-medium">
                MAX
              </p>

              <input
                type="number"
                placeholder="Rp 5.000.000"
                onChange={(e) => onMaxPriceChange(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-[13px] text-gray-700 bg-gray-50 focus:outline-none focus:border-[#D4F931] transition-colors"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Brand */}
      <div className="flex flex-col px-4 gap-0.5">
        {brands.map((item) => (
          <label
            key={item.brand}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 cursor-pointer group transition-all"
          >
            <div
              className={
                "w-4 h-4 rounded border-2 flex items-center justify-center transition-colors " +
                (selectedBrand === item.brand
                  ? "bg-[#8bc400] border-[#8bc400]"
                  : "border-gray-300")
              }
            >
              <input
                type="checkbox"
                checked={selectedBrand === item.brand}
                className="hidden"
                onChange={() => {
                  if (selectedBrand === item.brand) {
                    setSelectedBrand("");
                    onBrandChange("");
                  } else {
                    setSelectedBrand(item.brand);
                    onBrandChange(item.brand);
                  }
                }}
              />

              {selectedBrand === item.brand && (
                <span className="text-white text-[10px]">✓</span>
              )}
            </div>

            <span className="text-[13px] text-gray-600 group-hover:text-gray-900 transition-colors flex-1">
              {item.brand}
            </span>
          </label>
        ))}
      </div>

    </aside>
  );
}