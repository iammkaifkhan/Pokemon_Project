import axios from "axios";
import { useEffect, useState} from "react"
import './PokemonList.css'
import Pokemon from "../Pokemon/Pokemon";


const PokemonList = () => {
const [pokemonList, setPokemonList] = useState([]);
const[isLoading, setIsLoading] = useState(true);

const POKEMON_URL= 'https://pokeapi.co/api/v2/pokemon/';

const downloadPokemons = async () => {
    const response = await axios.get(POKEMON_URL); // this downloads list of 20 pokemons

    const pokemonResults = response.data.results; //we get array of pokemons from result

    console.log(response.data);

    //iterating over the array of pokemons and using their url to create an array of promises that will download those 20 pokemons
    const pokemonResultPromises = pokemonResults.map((pokemon)=> axios.get(pokemon.url));

    // passing that promise to axios.all to get all the data at once
    const pokemonData = await axios.all(pokemonResultPromises);
console.log(pokemonData);

// now iterating on the data of each pokemon and extract id, name, image and types
const pokeListResult= pokemonData.map((pokeData)=> {
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

},[]);

return (
    <div className="pokemon-list-wrapper">
      <div>Pokemon List</div>
      {(isLoading) ? "Loading..." : pokemonList.map((p)=> <Pokemon name={p.name} image={p.image} key={p.id}/>)}
    </div>
  )
}

export default PokemonList
