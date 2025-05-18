import { Component, computed, Inject, signal } from '@angular/core';
import { DetailPokemon } from '../../models/detail.model';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-pokemon-detail',
  imports: [CommonModule],
  templateUrl: './pokemon-detail.component.html',
  styleUrl: './pokemon-detail.component.scss'
})
export class PokemonDetailComponent {
  pokemonDetail = signal<DetailPokemon | null>(null);

  abilities = computed(() => {
    const detail = this.pokemonDetail();
    return Array.isArray(detail?.abilities)
      ? detail.abilities
        .filter(a => a.ability !== null)
        .map(a => a.ability!.name)
      : [];
  });

  moves = computed(() => {
    const detail = this.pokemonDetail();
    return Array.isArray(detail?.moves)
      ? detail.moves.map(m => m.move?.name ?? '')
      : [];
  });

  constructor(@Inject(MAT_DIALOG_DATA) public data: DetailPokemon) { }

  ngOnInit(): void {
    this.pokemonDetail.set(this.data);
  }

}
