

import './PokemonList.css'
import Pokemon from "../Pokemon/Pokemon";
import usePokemonList from "../../hooks/usePokemonList";


const PokemonList = () => {

  const [pokemonListState,setPokemonListState] = usePokemonList(false);

  return (
    <div className="pokemon-list-wrapper">

      <div className="pokemon-wrapper">
        {(setPokemonListState.isLoading) ? "Loading..." : pokemonListState.pokemonList.map((p) => <Pokemon name={p.name} image={p.image} key={p.id} id={p.id} />)}
      </div>
      <div className="controls">
        <button disabled={pokemonListState.prevUrl == null} onClick={() => setPokemonListState({ ...pokemonListState, pokemonUrl: pokemonListState.prevUrl })}>Prev</button>
        <button disabled={pokemonListState.nextUrl == null} onClick={() => setPokemonListState({ ...pokemonListState, pokemonUrl: pokemonListState.nextUrl })}>Next</button>
      </div>
    </div>
  )
}

export default PokemonList
