import axios from "../../axios";
import React, { useState, useEffect } from "react";
import Youtube from "react-youtube";
import movieTrailer from "movie-trailer";
import "./Row.css";

const image_base_url = "https://image.tmdb.org/t/p/original";

function Row(props /*props -->> title, fetchUrl, isLargeRow */) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  //  a snippet of code which runs based on specific conditions/variables
  useEffect(() => {
    //if [], run once when the row loads, and don't run it again
    async function fetchData() {
      const request = await axios.get(props.fetchUrl);
      // https://api.themoviedb.org/3/trending/all/week?api_key=${API_KEY}&language=en-US
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [props.fetchUrl]);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      // movieTrailer(movie?.name || "")
      //   .then((url) => {
      //     const urlParams = new URLSearchParams(new URL(url).search);
      //     setTrailerUrl(urlParams.get("v"));
      //   })
      //   .catch((error) => console.log(error));
      movieTrailer(null, { tmdbId: movie.id })
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((error) => console.log(error));
    }
  };
  return (
    <div className="row">
      {/* Title */}
      <h2>{props.title}</h2>

      <div className="row_posters">
        {/* several row_posters */}
        {movies.map((movie) => (
          <img
            onClick={() => handleClick(movie)}
            key={movie.id}
            className={`row_poster ${props.isLargeRow && "row_posterLarge"}`}
            src={`${image_base_url}${
              props.isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
          />
        ))}
      </div>
      {trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}
    </div>
  );
}

export default Row;
