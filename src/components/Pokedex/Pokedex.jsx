import { useState } from "react";
import PokemonList from "../PokemonList/PokemonList";
import Search from "../Search/Search";
import './Pokedex.css';
import PokemonDetails from "../PokemonDetails/PokemonDetails";
import { Link } from 'react-router-dom';

const Pokemon = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="pokedex-wrapper">
      <h1 id="pokedex-heading">
        <Link to="/">Pokemon</Link>
      </h1>

      <Search updateSearchTerm={setSearchTerm} />

      {(!searchTerm) ? (
        <PokemonList />
      ) : (
        <PokemonDetails key={searchTerm} pokemonName={searchTerm} />
      )}
    </div>
  );
}

export default Pokemon;
