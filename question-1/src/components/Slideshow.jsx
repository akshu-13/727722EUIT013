import { useState, useEffect } from "react";
import "../index.css"; // Ensure styles are applied

import slide1 from "../components/slide1.jpg";
import slide2 from "../components/slide2.webp";
import slide3 from "../components/slide3.jpg";

const images = [slide1, slide2, slide3];

const Slideshow = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="slideshow-container">
      <img src={images[currentIndex]} alt="Slideshow" className="slideshow-image" />
    </div>
  );
};

export default Slideshow;
