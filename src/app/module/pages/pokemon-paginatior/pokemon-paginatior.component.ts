import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { PokemonService } from '../../services/pokemon.service';
import { firstValueFrom } from 'rxjs';
import { DetailPokemon, Type } from '../../models/detail.model';
import { PokemonPageResponse, Result } from '../../models/pokemon-list.model';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { PokemonDetailComponent } from '../pokemon-detail/pokemon-detail.component';

@Component({
  standalone: true,
  selector: 'app-pokemon-paginatior',
  imports: [CommonModule, MatButtonModule, MatCardModule, MatDialogModule],
  templateUrl: './pokemon-paginatior.component.html',
  styleUrl: './pokemon-paginatior.component.scss'
})
export class PokemonPaginatiorComponent {
  allPokemons = signal<DetailPokemon[]>([]);
  currentPage = signal(1);
  itemsPerPage = 10;

  totalPages = computed(() =>
    Math.ceil(this.allPokemons().length / this.itemsPerPage)
  );

  paginatedPokemons = computed(() => {
    const start = (this.currentPage() - 1) * this.itemsPerPage;
    return this.allPokemons().slice(start, start + this.itemsPerPage);
  });

  paginationNumbers = computed(() => {
    const total = this.totalPages();
    const current = this.currentPage();
    const pages: number[] = [];

    if (total <= 7) {
      for (let i = 1; i <= total; i++) pages.push(i);
    } else if (current <= 3) {
      pages.push(1, 2, 3, 4, 5);
    } else if (current >= total - 2) {
      for (let i = total - 4; i <= total; i++) pages.push(i);
    } else {
      for (let i = current - 2; i <= current + 2; i++) pages.push(i);
    }

    return pages;
  });

  constructor(
    private pokemonService: PokemonService,
    private openDialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.pokemonService.getAllPokemon().subscribe(async (res: PokemonPageResponse) => {
      const detailPromises = res.results.map((pokemon: Result) =>
        firstValueFrom(this.pokemonService.getPokemonDetail(pokemon.name))
      );

      const detailList = await Promise.all(detailPromises);

      const formatted: DetailPokemon[] = detailList.map((d) => ({
        ...d,
        image: d.sprites.other['official-artwork'].front_default,
        types: d.types.map((t: Type) => t.type.name),
      }));

      this.allPokemons.set(formatted);
    });
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage.set(page);
    }
  }

  goToPokemonDetail(pokemon: DetailPokemon) {
    const dialogRef = this.openDialog.open(PokemonDetailComponent, {
      data: pokemon,
      width: '600px',
      height: '600px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
}
