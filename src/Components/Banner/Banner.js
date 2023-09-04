import React from 'react';
import '../Banner/Banner.css'
import banner from '../../Images/banner.png'

const Banner = () => {
  return (
    <div className="banner">
      <img src={banner} alt="Banner" />
      <div className="banner-content">
      </div>
    </div>
  );
}

export default Banner;