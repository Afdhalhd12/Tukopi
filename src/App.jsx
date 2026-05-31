import ButtonComp from "./components/ButtonComp";
import { MdOutlineHexagon } from "react-icons/md";
import { CiCoffeeCup } from "react-icons/ci";
import { useEffect, useRef, useState } from "react";
import shoes from "./assets/white-shoes.png";
import nike from "./assets/nikee.png";
import black from "./assets/black.jpg";
import adidas from "./assets/adidas.jpg";
import white from "./assets/white.jpg";
import red from "./assets/red.jpg";
import brown from "./assets/brown.jpg";
import sell from "./assets/white-sell.png";
import { FaTruckFast } from "react-icons/fa6";
import { FaShieldAlt } from "react-icons/fa";
import { RiCustomerService2Fill } from "react-icons/ri";
import CardCommerce from "./components/CardCommerce";
import NavBar from "./components/NavBar";
import { useNavigate } from "react-router-dom";
import SwiperComponent from "./components/SwiperComponent";
import AOS from "aos";
import "aos/dist/aos.css";

export default function App() {
  const [products, setProducts] = useState([]);

  async function getProducts() {
    const url = `http://localhost:3000/product`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const result = await response.json();
      setProducts(result.data.data);
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    getProducts();
    AOS.init({
      duration: 800,
      easing: "ease-out-cubic",
      once: true,
      offset: 80,
    });
  }, []);

  return (
    <>
      <div className="px-10 mt-20">

        <div className="bg-[url('./assets/bg-hero.png')] md:h-110 bg-position-[50%_30%] h-screen rounded-2xl">
          <div className="mx-auto p-10 mt-5">
            <div className="grid grid-cols-2 gap-4">

              <div>
                <div
                  className="md:pt-5 text-5xl text-[#FBEEE5]"
                  data-aos="fade-down"
                  data-aos-delay="100"
                >
                  <MdOutlineHexagon />
                </div>
                <h1
                  className="md:text-8xl text-3xl font-bold text-[#ffffff] leading-tight translate-x-20 font-oswald"
                  data-aos="fade-right"
                  data-aos-delay="200"
                >
                  ESSPRESO
                </h1>
                <h1
                  className="md:text-8xl text-3xl font-bold text-[#D4F931] leading-tight font-oswald"
                  data-aos="fade-right"
                  data-aos-delay="350"
                >
                  YOURSELF
                </h1>
                <div
                  className="pt-4 ps-3"
                  data-aos="fade-up"
                  data-aos-delay="500"
                >
                  <ButtonComp
                    text={"Order Now"}
                    styling={"rounded-full border border-[#E5E5E5] font-inter p-2 text-sm bg-white"}
                  />
                </div>
              </div>

              <div
                className="mx-auto grid place-items-center"
                data-aos="zoom-in"
                data-aos-delay="300"
              >
                <img src={nike} className="gambar-awal col-start-1 row-start-1 md:w-120 md:h-100 translate-x-1 translate-y-1 z-1" />
                <img src={shoes} className="gambar-awal col-start-1 row-start-1 md:w-600 md:h-100 translate-x-1 -translate-y-5 z-2" />
              </div>

            </div>
          </div>
        </div>

        
        <div className="mt-10">
          <div className="flex justify-between">
            <h1
              className="explore text-4xl font-bold text-[#200F07] font-oswald"
              data-aos="fade-right"
            >
              EXPLORE OUR <span className="text-[#737373]">COLLECTION</span>
            </h1>
            <div className="mt-4" data-aos="fade-left">
              <h1 className="text-sm font-semibold text-[#200F07] font-inter">VIEW ALL —</h1>
            </div>
          </div>

          <div className="grid grid-cols-8 gap-4 mt-10">
            <div
              className="col-span-4 relative"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <img src={black} className="rounded-2xl h-105" />
              <p className="absolute inset-1 flex items-end text-white/60 p-2 pb-10 text-sm font-inter">124 Item</p>
              <h3 className="absolute inset-0 flex items-end text-white font-bold p-3 text-3xl font-oswald">Black Edition</h3>
            </div>

            <div
              className="col-span-2 relative w-fit overflow-hidden rounded-2xl"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <img src={white} className="h-105 w-80 rounded-2xl object-cover" />
              <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5">
                <div>
                  <p className="text-sm font-inter text-white/60">20 Item</p>
                  <h3 className="font-oswald text-3xl font-bold text-white">Pure Motion</h3>
                </div>
                <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black transition hover:scale-105">
                  →
                </button>
              </div>
            </div>

            <div className="col-span-2">
              <div
                className="relative"
                data-aos="fade-up"
                data-aos-delay="300"
              >
                <img src={red} className="rounded-2xl h-50 w-75" />
                <p className="absolute inset-1 flex items-end text-white/60 p-2 pb-10 text-sm font-inter">60 Item</p>
                <h3 className="absolute inset-0 flex items-end text-white font-bold p-3 text-3xl font-oswald">Red Impact</h3>
              </div>
              <div
                className="relative"
                data-aos="fade-up"
                data-aos-delay="400"
              >
                <img src={brown} className="rounded-2xl h-50 w-75 mt-5" />
                <p className="absolute inset-1 flex items-end text-white/60 p-2 pb-10 text-sm font-inter">50 Item</p>
                <h3 className="absolute inset-0 flex items-end text-white font-bold p-3 text-3xl font-oswald">Golden Street</h3>
              </div>
            </div>
          </div>
        </div>


        <div className="mt-20">
          <div>
            <h1
              className="text-center text-4xl font-oswald"
              data-aos="fade-up"
            >
              BRAND NEW STYLES <span className="text-[#737373]">REVEALED</span>
            </h1>
            <p
              className="text-center text-[#737373] text-sm font-inter mt-2"
              data-aos="fade-up"
              data-aos-delay="150"
            >
              Step into the latest drop designed for comfort, built for durability, and <br />
              made to stand out wherever you go.
            </p>
          </div>

          <div data-aos="fade-up" data-aos-delay="200">
            <SwiperComponent products={products} />
          </div>

          <div
            className="flex justify-center mt-10 font-black"
            data-aos="zoom-in"
            data-aos-delay="100"
          >
            <ButtonComp
              styling={"rounded-full border border-[#E5E5E5] font-inter p-2 text-sm bg-white"}
              text={"EXPLORE FULL COLLECTION"}
            />
          </div>
        </div>


        <div className="mt-20">
          <h1
            className="explore text-4xl font-bold text-[#200F07] font-oswald"
            data-aos="fade-right"
          >
            WHY CHOOSE <span className="text-[#737373]">TUSNEAKER.</span>
          </h1>
          <div className="mt-5">
            <div className="grid grid-cols-8 gap-5">
              <div className="col-span-4">

                <div className="mt-5" data-aos="fade-right" data-aos-delay="100">
                  <div className="bg-[#F5F5F5] rounded-2xl border border-[#E5E5E5]">
                    <div className="grid grid-cols-8">
                      <div className="col-span-2 flex items-center justify-center p-3">
                        <div className="bg-white rounded-2xl p-3 flex items-center justify-center">
                          <FaTruckFast size={48} className="text-black" />
                        </div>
                      </div>
                      <div className="col-span-6">
                        <div className="p-3">
                          <h1 className="font-bold text-2xl text-black font-oswald">Free Worldwide Shipping</h1>
                          <p className="text-[#737373] text-sm font-inter mt-3">Free shipping on all orders over $150. Delivered to your doorstep within 5–7 business days with safe and reliable worldwide delivery service.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-5" data-aos="fade-right" data-aos-delay="250">
                  <div className="bg-[#F5F5F5] rounded-2xl border border-[#E5E5E5]">
                    <div className="grid grid-cols-8">
                      <div className="col-span-2 flex items-center justify-center p-3">
                        <div className="bg-white rounded-2xl p-3 flex items-center justify-center">
                          <FaShieldAlt size={48} className="text-black" />
                        </div>
                      </div>
                      <div className="col-span-6">
                        <div className="p-3">
                          <h1 className="font-bold text-2xl text-black font-oswald">Secure Checkout</h1>
                          <p className="text-[#737373] text-sm font-inter mt-3">Your payment information is encrypted and secure. Shop with confidence and convenience.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-5" data-aos="fade-right" data-aos-delay="400">
                  <div className="bg-[#F5F5F5] rounded-2xl border border-[#E5E5E5]">
                    <div className="grid grid-cols-8">
                      <div className="col-span-2 flex items-center justify-center p-3">
                        <div className="bg-white rounded-2xl p-3 flex items-center justify-center">
                          <RiCustomerService2Fill size={48} className="text-black" />
                        </div>
                      </div>
                      <div className="col-span-6">
                        <div className="p-3">
                          <h1 className="font-bold text-2xl text-black font-oswald">24/7 Customer Support</h1>
                          <p className="text-[#737373] text-sm font-inter mt-3">Our dedicated team is here to help you anytime, anywhere providing fast, friendly, and reliable assistance whenever you need it.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              <div
                className="col-span-4"
                data-aos="fade-left"
                data-aos-delay="200"
              >
                <div className="mt-5">
                  <img src={adidas} className="rounded-2xl md:w-160 md:h-102" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="mt-27">
          <div className="bg-[url('./assets/Card.png')] md:h-100 md:min-w-max bg-position-[20%_30%] h-screen rounded-2xl">
            <div className="mx-auto p-20">
              <div className="grid grid-cols-8 gap-10">
                <div
                  className="col-span-4"
                  data-aos="fade-right"
                  data-aos-delay="100"
                >
                  <p className="text-7xl font-oswald">
                    <span className="text-white">GET 15% OFF</span> <br />
                    <span className="text-[#D4F931]">YOUR FIRST </span> <br />
                    <span className="text-[#737373]">ORDER.</span>
                  </p>
                </div>
                <div
                  className="col-span-4"
                  data-aos="fade-left"
                  data-aos-delay="200"
                >
                  <div className="border border-[#737373] bg-black/60 rounded-2xl md:w-50">
                    <div className="p-2">
                      <p className="text-[10px] font-inter text-[#D4F931] px-2 font-semibold">● JOIN 50,000+ SUBSCRIBERS</p>
                    </div>
                  </div>
                  <div className="mt-5">
                    <p className="font-inter text-white/60">Subscribe to our exclusive newsletter and be the first to <br /> know about new digital drops, limited offers, and boundary <br />pushing style tips.</p>
                  </div>
                  <div className="mt-5 relative max-w-lg">
                    <input type="email" placeholder="Enter your email address..." className="bg-white rounded-full w-full md:h-15 px-5 backdrop-blur outline-[#D4F931] hover:shadow-[#D4F931]" />
                    <div>
                      <button className="absolute right-2 top-1/2 -translate-y-1/2 font-inter rounded-full bg-[#D4F931] px-5 py-2 font-medium text-black">SUBSCRIBE →</button>
                    </div>
                  </div>
                  <div className="mt-5">
                    <p className="text-white/60 text-[10px] font-inter">
                      By subscribing, you agree to our <a href="#" className="text-[#D4F931]">Terms of Service</a> and <a href="#" className="text-[#D4F931]">Privacy Policy.</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}