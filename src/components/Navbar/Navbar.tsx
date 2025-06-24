import { useState, useEffect } from "react";
import type { FormEvent } from "react";
import styles from "./Navbar.module.css";

interface NavbarProps {
  onSearch: (query: string) => void;
}

export default function Navbar({ onSearch }: NavbarProps) {
  const [query, setQuery] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    onSearch(query);
  }

  // Altera título da aba
  useEffect(() => {
    document.title = "Info Movies";
  }, []);

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>Info Movies</div>
      <div className={styles.category}>Trending</div>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          className={styles.input}
          placeholder="Buscar filmes..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" className={styles.button}>
          Buscar
        </button>
      </form>
    </nav>
  );
}
