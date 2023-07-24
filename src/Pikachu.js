import userEvent from "@testing-library/user-event";
import React from "react";

function Pikachu(props) {
  const imageUrl =
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/2.svg";
  let extractValueFromURL = (url) => {
    const segments = url.split("/");
    return segments[segments.length - 2]; // Get the second-to-last segment
  };
  return (
    <>
      <div className="col-lg-4">
        <div className="card m-2">
          <div className="card-header">
            <div className="float-right">
              ID: {extractValueFromURL(props.user.url)}
            </div>
            <div className="float-left">{props.user.name} </div>
          </div>
          <div className="card-body">
            <img
              class="card-img-top "
              style={{ height: 120 }}
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${extractValueFromURL(
                props.user.url
              )}.svg`}></img>
          </div>
        </div>
      </div>
    </>
  );
}

export default Pikachu;
