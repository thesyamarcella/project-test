import React, { useState, useEffect } from 'react';
import BannerImage from '../assets/banner.jpg'; // Ganti dengan path ke gambar banner Anda

const Banner = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const position = window.pageYOffset;
      setScrollPosition(position);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const parallaxStyles = {
    backgroundImage: `url(${BannerImage})`,
    backgroundAttachment: 'fixed',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    height: 'calc(50vh + 150px)', // Tinggi hampir setengah layar + 150px tambahan
    clipPath: 'polygon(0 0, 100% 0, 100% 85%, 0% 100%)', // Efek potongan garis horizontal
    transform: `translateY(${scrollPosition * 0.4}px)` // Meningkatkan faktor transformasi
  };

  const bannerTextContainerStyles = {
    height: 'calc(50vh + 150px)', // Tinggi hampir setengah layar + 150px tambahan
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  };

  const bannerTextStyles = {
    color: '#ffffff', // Warna teks
    textAlign: 'center',
    maxWidth: '600px' // Lebar maksimum teks
  };

  return (
    <section className="banner relative overflow-hidden">
      <div className="banner-content" style={parallaxStyles} />
      <div className="absolute inset-0">
        <div style={bannerTextContainerStyles}>
          <div style={bannerTextStyles}>
            <h2 className="text-4xl font-bold">Welcome to Our Website</h2>
            <p className="text-lg">This is a simple React page with a banner.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
