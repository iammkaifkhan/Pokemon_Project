import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import axios from "axios";
import "./PokemonDetails.css"
import usePokemonList from "../../hooks/usePokemonList";
import usePokemonDetails from "../../hooks/usePokemonDetails";


const PokemonDetails = ({pokemonName}) => {

  const { id } = useParams();
  const [pokemon] = usePokemonDetails(id, pokemonName);
 
  return (

    <div className="pokemon-details-wrapper">
      <img className="pokemon-details-image" src={pokemon.image} />
      <div className="pokemon-details-name"><span>{pokemon.name}</span> </div>
      <div className="pokemon-details-name">Height: {pokemon.height}</div>
      <div className="pokemon-details-name">Weight: {pokemon.weight}</div>
      <div className="pokemon-details-types">
        {pokemon.types && pokemon.types.map((t) => <div key={t}> {t} </div>)}
      </div>
      
      
      {
       pokemon.types && pokemon.similarPokemons && 
        <div>
          More {pokemon.types[0]} type pokemons

          <ul>
            {pokemon.similarPokemons.map((p) => <li key={p.pokemon.url}>{p.pokemon.name}</li>)}
          </ul>
        </div>

      }
       

      

    </div>
  )
}

export default PokemonDetails
