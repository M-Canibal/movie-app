import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import MovieGrid from "./components/MovieGrid/MovieGrid";
import MovieDetail from "./pages/MovieDetail";
import { useMovies } from "./hooks/useMovies";

export default function App() {
  const [query, setQuery] = useState("");
  const { movies, loading, error } = useMovies(query);

  return (
    <Router>
      <Navbar onSearch={setQuery} />
      {loading && <div className="text-center p-4">Carregando...</div>}
      {error && <div className="text-center p-4 text-red-500">{error}</div>}
      <Routes>
        <Route path="/" element={<MovieGrid movies={movies} />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
      </Routes>
    </Router>
  );
}
