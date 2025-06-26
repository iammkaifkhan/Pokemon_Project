import Search from "../Search/Search"
import './Pokedex.css'
const Pokemon = () => {
  return (
    <div className="pokemon-wrapper">
      <h1 id="pokemon-heading">Pokemon</h1>
      <Search/>
    </div>
  );
}

export default Pokemon;
