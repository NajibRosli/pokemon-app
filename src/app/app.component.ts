import { Component, OnInit } from '@angular/core';
import { PokemonApiService  } from "./pokemon-api.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {


  title = 'pokemon-app';

  constructor(
    private pokemonApiService:PokemonApiService
    ){
    
  }
  ngOnInit(): void {
    this.getPokemon()
    this.getAllPokemon()
  }

  /**
   * Example function of getting pokemon using service in the pokemon-api.service.ts
   */
  async getPokemon(){
    const pokemon = "starmie"
    try {
      let getPokemon = await this.pokemonApiService.fetchPokemon_details(pokemon)
      console.log(getPokemon)
    } catch (error) {
      console.error(error)
    }
  }

   /**
   * Example function of getting all pokemon using service in the pokemon-api.service.ts
   */
  async getAllPokemon(){
    try {
      let getPokemon = await this.pokemonApiService.pokemon_v2_pokemon(10)
      console.log(getPokemon)
    } catch (error) {
      console.error(error)
    }
  }


}
