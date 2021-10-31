import React from "react";

function Hero(props) {
  return (
    <div class="px-4 py-5 my-5 text-center">
      <img class="d-block mx-auto mb-4" src={props.image} alt={props.alt} />
      {props.children}
    </div>
  );
}

export default Hero;
