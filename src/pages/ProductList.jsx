import { useEffect, useState } from "react";
import FilterComp from "../components/FilterComp";
import { Link } from "react-router-dom";
import SearchComp from "../components/SearchComp";
import PaginationComp from "../components/PaginationComp";

export default function ProductList() {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [brands, setBrands] = useState([]);
    const [brand, setBrand] = useState("");
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [sort, setSort] = useState({
        sortBy: "",
        order: "",
    });

    function processSearch(event) {
        setSearch(event.target.value);
        setCurrentPage(1);
    }

    const onPageChange = (page) => {
        setCurrentPage(page);
    };

    async function getBrands() {
        try {
            const response = await fetch("http://localhost:3000/product/brands");
            const result = await response.json();

            setBrands(result.data);
            console.log(brand);
        } catch (error) {
            console.log(error.message);
        }
    }

    async function getCategories() {
        try {
            const response = await fetch("http://localhost:3000/product/categories");
            const result = await response.json();

            setCategories(result.data);
            console.log(brand);
        } catch (error) {
            console.log(error.message);
        }
    }

    async function getProducts() {
        let url =
            "http://localhost:3000/product" +
            "?limit=9" +
            "&page=" + currentPage;

        if (search) {
            url += "&name=" + search;
        }

        if (sort.sortBy && sort.order) {
            url += "&sortBy=" + sort.sortBy + "&order=" + sort.order;
        }

        if (brand) {
            url += "&brand=" + brand;
        }

        if (category) {
            url += "&category=" + category;
        }

        if (minPrice) {
            url += "&minPrice=" + minPrice;
        }

        if (maxPrice) {
            url += "&maxPrice=" + maxPrice;
        }

        try {
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error("Response status: " + response.status);
            }

            const result = await response.json();
            setProducts(result.data.data);
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        getProducts();
    }, [currentPage, search, sort, brand, category, minPrice, maxPrice]);

    useEffect(() => {
        getBrands();
    }, []);

    useEffect(() => {
        getCategories();
    }, []);

    return (
        <div className="min-h-screen">
            <div className="grid grid-cols-8">
                <div className="col-span-2">
                    <FilterComp brands={brands} onBrandChange={setBrand} categories={categories} onCategoryChange={setCategory} onMinPriceChange={setMinPrice}
                        onMaxPriceChange={setMaxPrice} />
                </div>

                <div className="col-span-6 mt-20 p-8">
                    <div className="mb-6">
                        <h1 className="font-oswald text-4xl">
                            All <span className="text-[#737373]">Footwear</span>
                        </h1>
                        <p className="font-inter text-[#737373] mt-1">
                            Precision engineered for the elite athlete.
                        </p>
                    </div>

                    <div className="flex items-center gap-3 mb-8">
                        <SearchComp processSearch={processSearch} />

                        <select
                            onChange={(e) => {
                                const value = e.target.value;

                                if (value === "cheapest_price") {
                                    setSort({
                                        sortBy: "price",
                                        order: "ASC",
                                    });
                                }
                                else if (value === "most_expensive") {
                                    setSort({
                                        sortBy: "price",
                                        order: "DESC",
                                    });
                                }
                                else if (value === "descending_alphabet") {
                                    setSort({
                                        sortBy: "name",
                                        order: "DESC",
                                    });
                                }
                                else if (value === "ascending_alphabet") {
                                    setSort({
                                        sortBy: "name",
                                        order: "ASC",
                                    });
                                }
                                else {
                                    setSort({
                                        sortBy: "",
                                        order: "",
                                    });
                                }

                                setCurrentPage(1);
                            }}
                            className="px-4 py-3 bg-white border border-gray-200 rounded-2xl text-[13px] text-gray-600"
                        >
                            <option value="" unselectable="">Most Popular</option>
                            <option value="cheapest_price">Price: Low to High</option>
                            <option value="most_expensive">Price: High to Low</option>
                            <option value="ascending_alphabet">Alphabet A-Z</option>
                            <option value="descending_alphabet">Alphabet Z-A</option>
                        </select>
                    </div>

                    <div className="grid grid-cols-12 gap-5">
                        {products.map((product) => (
                            <div key={product.id} className="col-span-4">
                                <div className="mt-2 group">
                                    <div className="relative bg-white rounded-2xl border border-[#E5E5E5] overflow-hidden">
                                        <div className="flex justify-center">
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                            />
                                        </div>

                                        <div className="absolute inset-0 flex justify-evenly p-3 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <Link to={"/product/" + product.id}>
                                                <button className="font-inter text-sm w-full px-4 py-2 bg-[#D4F931] rounded-xl font-semibold">
                                                    QUICK ADD
                                                </button>
                                            </Link>
                                        </div>
                                    </div>

                                    <div className="mt-2">
                                        <p className="text-sm font-inter text-[#D4F931]">
                                            {product.category}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="font-inter font-semibold">
                                            {product.name}
                                        </p>
                                        <p className="font-inter text-sm mt-1 text-[#737373]">
                                            Rp. {product.price.toLocaleString('id-ID')}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <PaginationComp
                        currentPage={currentPage}
                        onPageChange={onPageChange}
                    />
                </div>
            </div>
        </div>
    );
}