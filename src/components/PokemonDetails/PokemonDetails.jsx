import { useParams, Link } from "react-router-dom";
import "./PokemonDetails.css";
import usePokemonDetails from "../../hooks/usePokemonDetails";

const PokemonDetails = ({ pokemonName }) => {
  const { id } = useParams();
  const [pokemon] = usePokemonDetails(id, pokemonName);

  return (
    <div className="pokemon-details-wrapper">
      {/* Show heading only if NOT searching */}
      {pokemonName === undefined && (
        <h1 id="pokedex-heading">
          <Link to="/">Pokemon</Link>
        </h1>
      )}

      <img
        className="pokemon-details-image"
        src={pokemon.image}
        alt={pokemon.name}
      />
      <div className="pokemon-details-name">
        <span>{pokemon.name}</span>
      </div>
      <div className="pokemon-details-name">Height: {pokemon.height}</div>
      <div className="pokemon-details-name">Weight: {pokemon.weight}</div>
      <div className="pokemon-details-types">
        {pokemon.types &&
          pokemon.types.map((t) => <div key={t}>{t}</div>)}
      </div>

      {pokemon.types && pokemon.similarPokemons && (
        <div>
          More {pokemon.types[0]} type pokemons
          <ul>
            {pokemon.similarPokemons.map((p) => (
              <li key={p.pokemon.url}>{p.pokemon.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PokemonDetails;
