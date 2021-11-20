import React from "react";

function Hero(props) {
  const heroStyle = {
    backgroundImage: `url(${props.image})`,
  };
  return (
    <div className="hero__image text-center" style={heroStyle}>
      <div className="hero__text">{props.children}</div>
    </div>
  );
}

export default Hero;
