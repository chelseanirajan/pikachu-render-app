import { useEffect, useState } from "react";
import Pikachu from "./Pikachu";

function App() {
  const [pokemon, setPokemon] = useState({
    count: 0,
    next: null,
    previous: null,
    results: [],
  });
  const pickachuList = [
    { id: 1, name: "APle", imageUrl: "Image1" },
    { id: 2, name: "A2", imageUrl: "Image2" },
    { id: 3, name: "A3", imageUrl: "Image3" },
  ];
  const loadInitialData = async () => {
    const baseUrl = "https://pokeapi.co/api/v2/ability/";
    let response = await fetch(baseUrl, {
      method: "GET",
    });
    if (response.ok) {
      let responseBody = await response.json();
      let arr = responseBody.results;
      setPokemon({
        count: responseBody.count,
        next: constructURLWithOffsetAndLimit(baseUrl, 3, 3),
        previous: responseBody.previous,
        results: arr.slice(0, 3),
      });
    }
  };
  useEffect(() => {
    loadInitialData();
  }, []);

  let onNextClick = async (nextVal) => {
    let response = await fetch(nextVal, {
      method: "GET",
    });
    if (response.ok) {
      let responseBody = await response.json();
      let arr = responseBody.results;
      setPokemon({
        count: responseBody.count,
        next: responseBody.next,
        previous: responseBody.previous,
        results: arr.slice(0, 3),
      });
    }
  };
  let onPrevClick = async (preVal) => {
    let response = await fetch(preVal, {
      method: "GET",
    });
    if (preVal && response.ok) {
      let responseBody = await response.json();
      let arr = responseBody.results;
      setPokemon({
        count: responseBody.count,
        next: responseBody.next,
        previous: responseBody.previous,
        results: arr.slice(0, 3),
      });
    }
  };
  function constructURLWithOffsetAndLimit(baseURL, offset, limit) {
    const url = new URL(baseURL);
    url.searchParams.set("offset", offset.toString());
    url.searchParams.set("limit", limit.toString());
    return url.toString();
  }

  return (
    <div className="container-fluid">
      <h4>Pikachu</h4>

      <div className="row">
        {pokemon.results.map((pick, index) => {
          return <Pikachu key={pick.url} user={{ ...pick, id: index + 1 }} />;
        })}
      </div>
      <div>
        <div className="float-left">
          <button
            className="btn btn-outline-success"
            onClick={() => onPrevClick(pokemon.previous)}>
            PREV
          </button>
        </div>
        <div className="float-right">
          <button
            className="btn btn-outline-success"
            onClick={() => onNextClick(pokemon.next)}>
            NEXT
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
