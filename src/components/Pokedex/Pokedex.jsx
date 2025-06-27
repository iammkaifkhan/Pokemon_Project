import PokemonList from "../PokemonList/PokemonList";
import Search from "../Search/Search"
import './Pokedex.css'
const Pokemon = () => {
  return (
    <div className="pokedex-wrapper">
      
      <Search />
      <PokemonList />
    </div>
  );
}

export default Pokemon;
