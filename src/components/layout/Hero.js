import React from "react";

function Hero(props) {
  const heroStyle = {
    backgroundImage: `url(${props.image})`,
  };
  return (
    <div class="hero__image text-center" style={heroStyle}>
      <div class="hero__text">{props.children}</div>
    </div>
  );
}

export default Hero;
