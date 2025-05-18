import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonPaginatiorComponent } from './pokemon-paginatior.component';

describe('PokemonPaginatiorComponent', () => {
  let component: PokemonPaginatiorComponent;
  let fixture: ComponentFixture<PokemonPaginatiorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonPaginatiorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokemonPaginatiorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
