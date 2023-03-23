import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

 /**
   * Example function of getting pokemon using service in the pokemon-api.service.ts
   * https://github.com/PokeAPI/pokeapi/blob/master/graphql/examples/node/pokemon.js
   * https://beta.pokeapi.co/graphql/console/
   */
export class PokemonApiService {

  constructor() { }

  

 /**
   * Example function of getting pokemon using service in the pokemon-api.service.ts
   * https://github.com/PokeAPI/pokeapi/blob/master/graphql/examples/node/pokemon.js
   */
  async fetchGraphQL(query:any, variables:any, operationName:any) {
    const result = await fetch(
      "https://beta.pokeapi.co/graphql/v1beta",
      {
        method: "POST",
        body: JSON.stringify({
          query: query,
          variables: variables,
          operationName: operationName
        })
      }
    )
  
    return await result.json()
  }
  
   /**
   * Example of graphql query
   */
  fetchPokemon_details(name="starmie") {
    const query = `
      query pokemon_details($name: String) {
        species: pokemon_v2_pokemonspecies(where: {name: {_eq: $name}}) {
          name
          base_happiness
          is_legendary
          is_mythical
          generation: pokemon_v2_generation {
            name
          }
          habitat: pokemon_v2_pokemonhabitat {
            name
          }
          pokemon: pokemon_v2_pokemons_aggregate(limit: 1) {
            nodes {
              height
              name
              id
              weight
              abilities: pokemon_v2_pokemonabilities_aggregate {
                nodes {
                  ability: pokemon_v2_ability {
                    name
                  }
                }
              }
              stats: pokemon_v2_pokemonstats {
                base_stat
                stat: pokemon_v2_stat {
                  name
                }
              }
              types: pokemon_v2_pokemontypes {
                slot
                type: pokemon_v2_type {
                  name
                }
              }
              levelUpMoves: pokemon_v2_pokemonmoves_aggregate(where: {pokemon_v2_movelearnmethod: {name: {_eq: "level-up"}}}, distinct_on: move_id) {
                nodes {
                  move: pokemon_v2_move {
                    name
                  }
                  level
                }
              }
              foundInAsManyPlaces: pokemon_v2_encounters_aggregate {
                aggregate {
                  count
                }
              }
              fireRedItems: pokemon_v2_pokemonitems(where: {pokemon_v2_version: {name: {_eq: "firered"}}}) {
                pokemon_v2_item {
                  name
                  cost
                }
                rarity
              }
            }
          }
          flavorText: pokemon_v2_pokemonspeciesflavortexts(where: {pokemon_v2_language: {name: {_eq: "en"}}, pokemon_v2_version: {name: {_eq: "firered"}}}) {
            flavor_text
          }
        }
      }
    `
  
    return this.fetchGraphQL(
      query,
      {"name": name},
      "pokemon_details"
    )
  }

  pokemon_v2_pokemon(limit:number){
    const query = `
      query pokemon_v2_pokemon($limit: Int) {
        pokemon_v2_pokemon(limit: $limit){
          name
          order
          pokemon_species_id
          is_default
          id
          height
          base_experience
        }
      }
    `
  
    return this.fetchGraphQL(
      query,
      {"limit": limit},
      "pokemon_v2_pokemon"
    )
  }
}
