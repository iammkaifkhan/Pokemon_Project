import axios from "axios";
import { useEffect, useState } from "react";

const usePokemonList = () => {
  const [pokemonListState, setPokemonListState] = useState({
      pokemonList: [],
      isLoading: true,
      nextUrl: '',
      prevUrl: '',
      pokemonUrl:'https://pokeapi.co/api/v2/pokemon/'
      
    });

    const downloadPokemons = async () => {
    


  setPokemonListState((state) => ({ ...state, isLoading: true }));
    const response = await axios.get(pokemonListState.pokemonUrl); // this downloads list of 20 pokemons

    const pokemonResults = response.data.results; //we get array of pokemons from result       


    setPokemonListState((state) =>
    ({
      ...state,
      nextUrl: response.data.next,
      prevUrl: response.data.previous
    })
    );

    //iterating over the array of pokemons and using their url to create an array of promises that will download those 20 pokemons
    const pokemonResultPromises = pokemonResults.map((pokemon) => axios.get(pokemon.url));

    // passing that promise to axios.all to get all the data at once
    const pokemonData = await axios.all(pokemonResultPromises);


    // now iterating on the data of each pokemon and extract id, name, image and types
    const pokeListResult = pokemonData.map((pokeData) => {
      const pokemon = pokeData.data;
      return {
        id: pokemon.id,
        name: pokemon.name,
        image: pokemon.sprites.other.dream_world.front_default, types: pokemon.types
      };
    })

    setPokemonListState((state) =>
    ({
      ...state,
      pokemonList: pokeListResult,
      isLoading: false
    })
    );


  }

  useEffect(()=>{
    downloadPokemons();
  },[pokemonListState.pokemonUrl]);

  return[pokemonListState,setPokemonListState]
}

export default usePokemonList
