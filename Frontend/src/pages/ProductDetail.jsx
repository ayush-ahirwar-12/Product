import React, { useEffect, useState } from "react";
import {
  Heart,
  ShoppingCart,
  Minus,
  Plus,
  Star,
  Truck,
  Shield,
  RotateCcw,
} from "lucide-react";
import { getProductDet } from "../Apis/ProductApi";
import { useParams } from "react-router";

const ProductDetail = () => {
  const { id } = useParams();
  const [productdets, setproductdets] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedColor, setSelectedColor] = useState("Black");
  const [isLoading, setisLoading] = useState(true);

  let getallproducts = async () => {
    try {
      setisLoading(true);
      let response = await getProductDet(id);
      // console.log(response);
      setproductdets(response);
    } catch (error) {
      console.log("error in details page", error);
    } finally {
      setisLoading(false);
    }
  };
  useEffect(() => {
    getallproducts();
  }, []);

  const [product] = useState({
    title: "Premium Wireless Headphones",
    description:
      "Experience crystal-clear audio with our premium wireless headphones. Featuring advanced noise cancellation, 30-hour battery life, and premium comfort padding. Perfect for music lovers, gamers, and professionals who demand the best audio experience.",
    price: {
      amount: 12999,
      currency: "INR",
    },
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500&h=500&fit=crop",
    ],
    stock: 15,
  });

  const colors = ["Black", "White", "Silver", "Rose Gold"];
  const features = [
    "Active Noise Cancellation",
    "30-hour battery life",
    "Premium comfort padding",
    "Wireless & Bluetooth 5.0",
    "Quick charge - 5min = 3hrs",
  ];

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: price.currency,
      minimumFractionDigits: 0,
    }).format(price.amount);
  };

  const handleQuantityChange = (delta) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity);
    }
  };

  // const getStockStatus = () => {
  //   if (productdets.stock === 0) return { text: 'Out of Stock', color: 'text-red-500' };
  //   if (productdets.stock < 5) return { text: `Only ${productdets.stock} left!`, color: 'text-orange-500' };
  //   return { text: `${productdets.stock} in stock`, color: 'text-green-500' };
  // };

  // const stockStatus = getStockStatus();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!productdets) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">
            Product not found
          </h2>
          <p className="text-gray-500">
            The product you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden">
            <img
              src={productdets.images[selectedImageIndex]}
              alt={productdets.title}
              className="w-full h-full object-cover transition-transform hover:scale-105"
            />
          </div>
          <div className="grid grid-cols-4 gap-3">
            {productdets.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImageIndex(index)}
                className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                  selectedImageIndex === index
                    ? "border-blue-500 ring-2 ring-blue-200"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <img
                  src={image}
                  alt={`${productdets.title} ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* productdets Information */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {productdets.title}
            </h1>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <span className="text-gray-600">(4.8) • 324 reviews</span>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed">
              {productdets.description}
            </p>
          </div>

          {/* Price */}
          <div className="bg-gray-50 p-4 rounded-xl">
            <div className="text-3xl font-bold text-gray-900">
              {formatPrice(productdets.price)}
            </div>
            <div className="text-sm text-gray-600 mt-1">
              Inclusive of all taxes
            </div>
          </div>

          {/* Stock Status
          <div className={`font-medium ${stockStatus.color}`}>
            {stockStatus.text}
          </div> */}

          {/* Color Selection */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Color</h3>
            <div className="flex gap-3">
              {colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`px-4 py-2 rounded-lg border transition-all ${
                    selectedColor === color
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Key Features</h3>
            <ul className="space-y-2">
              {features.map((feature, index) => (
                <li
                  key={index}
                  className="flex items-center gap-2 text-gray-700"
                >
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Quantity and Actions */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="text-lg font-semibold">Quantity:</span>
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                  className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 py-2 font-semibold">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  disabled={quantity >= productdets.stock}
                  className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                disabled={productdets.stock === 0}
                className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                {productdets.stock === 0 ? "Out of Stock" : "Add to Cart"}
              </button>
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className={`p-3 rounded-xl border transition-all ${
                  isFavorite
                    ? "border-red-300 bg-red-50 text-red-600"
                    : "border-gray-300 hover:border-gray-400"
                }`}
              >
                <Heart
                  className={`w-6 h-6 ${isFavorite ? "fill-current" : ""}`}
                />
              </button>
            </div>

            {productdets.stock > 0 && (
              <button className="w-full bg-gray-900 text-white py-3 px-6 rounded-xl font-semibold hover:bg-gray-800 transition-colors">
                Buy Now
              </button>
            )}
          </div>

          {/* Additional Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t">
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <Truck className="w-5 h-5" />
              <span>Free delivery</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <RotateCcw className="w-5 h-5" />
              <span>30-day returns</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <Shield className="w-5 h-5" />
              <span>2-year warranty</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
