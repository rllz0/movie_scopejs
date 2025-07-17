import { useState } from "react";
import MovieList from "../components/MovieList";

export default function Home() {
  const [minRating] = useState(0);
  const [sort] = useState({ by: "default", order: "asc" });

  return (
    <div className="home">
      {["now_playing", "popular", "top_rated", "upcoming"].map((type) => (
        <MovieList
          key={type}
          type={type}
          title={type
            .replace("_", " ")
            .replace(/\b\w/g, (l) => l.toUpperCase())}
          minRating={minRating}
          sort={sort}
        />
      ))}
    </div>
  );
}
