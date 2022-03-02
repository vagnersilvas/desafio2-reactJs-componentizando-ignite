import { useEffect, useState } from "react";
import { api } from "../services/api";
import { Header } from "./Header";
import { MovieCard } from "./MovieCard";

import '../styles/content.scss';
interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}
interface MovieProps {

  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Value: string;
  }>;
  Runtime: string;
}

export function Content() {
  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [selectedGenreId, setSelectedGenreId] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);

  useEffect(() => {
    api.get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`).then(response => {
      setMovies(response.data);
    });

    api.get<GenreResponseProps>(`genres/${selectedGenreId}`).then(response => {
      setSelectedGenre(response.data);
    })
  }, [selectedGenreId]);

  return (
    <div className="container">

      <Header {...selectedGenre}/>
      <main>
        <div className="movies-list">

          {movies.map(movie =>
            <MovieCard
              key={movie.imdbID}
              poster={movie.Poster}
              title={movie.Title}
              rating={movie.Ratings[0].Value}
              runtime={movie.Runtime}
            />)}

        </div>
      </main>
    </div>
  )
}