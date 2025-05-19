import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PokemonPageResponse } from '../models/pokemon-list.model';
import { DetailPokemon } from '../models/detail.model';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private http: HttpClient) {}

  getAllPokemon(limit: number = 151) {
    return this.http.get<PokemonPageResponse>(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);
  }

  getPokemonDetail(name: string) {
    return this.http.get<DetailPokemon>(`https://pokeapi.co/api/v2/pokemon/${name}`);
  }
}
