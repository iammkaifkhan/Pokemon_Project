import axios from "axios";
import { useEffect, useState } from "react"
import './PokemonList.css'
import Pokemon from "../Pokemon/Pokemon";


const PokemonList = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [pokemonUrl, setPokemonUrl] = useState('https://pokeapi.co/api/v2/pokemon/');

const [nextUrl, setNextUrl] = useState('');
const [prevUrl, setPrevUrl] = useState('');

  const downloadPokemons = async () => {
    setIsLoading(true);
    const response = await axios.get(pokemonUrl); // this downloads list of 20 pokemons

    const pokemonResults = response.data.results; //we get array of pokemons from result

    console.log(response.data);
    setNextUrl(response.data.next);
    setPrevUrl(response.data.previous);

    //iterating over the array of pokemons and using their url to create an array of promises that will download those 20 pokemons
    const pokemonResultPromises = pokemonResults.map((pokemon) => axios.get(pokemon.url));

    // passing that promise to axios.all to get all the data at once
    const pokemonData = await axios.all(pokemonResultPromises);
    console.log(pokemonData);

    // now iterating on the data of each pokemon and extract id, name, image and types
    const pokeListResult = pokemonData.map((pokeData) => {
      const pokemon = pokeData.data;
      return {
        id: pokemon.id,
        name: pokemon.name,
        image: pokemon.sprites.other.dream_world.front_default, types: pokemon.types
      };
    })
    setPokemonList(pokeListResult);
    console.log(pokeListResult);
    setIsLoading(false);
  }


  useEffect(() => {
    downloadPokemons();

  }, [pokemonUrl]);

  return (
    <div className="pokemon-list-wrapper">
     
      <div className="pokemon-wrapper">
        {(isLoading) ? "Loading..." : pokemonList.map((p) => <Pokemon name={p.name} image={p.image} key={p.id} />)}
      </div>
      <div className="controls">
        <button disabled={prevUrl==null} onClick={()=>setPokemonUrl(prevUrl)}>Prev</button>
        <button disabled={nextUrl==null} onClick={()=>setPokemonUrl(nextUrl)}>Next</button>
      </div>
    </div>
  )
}

export default PokemonList
