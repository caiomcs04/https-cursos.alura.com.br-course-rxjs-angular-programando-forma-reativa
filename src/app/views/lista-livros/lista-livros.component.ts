import { LivroVolumeInfo } from './../../models/livroVolumeInfo';
import { Livro, Item, LivrosResultado } from './../../models/interface';
import { LivroService } from './../../service/livro.service';
import { Component } from '@angular/core';
import { catchError, debounceTime, filter, map, of, Subject, switchMap, takeUntil, throwError } from 'rxjs';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css'],
})
export class ListaLivrosComponent {
  listaLivros: Array<Livro>;
  searchField = new FormControl();
  pauseTime = 300;
  errorMessage = ''
livrosResultado: LivrosResultado;
  constructor(private service: LivroService) {}


// totalDeLivros$ = this.searchField.valueChanges.pipe(
//   debounceTime(this.pauseTime),
//   filter((value) => value.length >= 3),
//   switchMap((value) => this.service.search(value)),
//   map((resultado) => this.livrosResultado = resultado ),
//   catchError(error => {
//     console.log(error)
//     return of()
//   })
// )

  livrosEncontrados$ = this.searchField.valueChanges.pipe(
    debounceTime(this.pauseTime),
    filter((value) => value.length >= 3),
    switchMap((value) => this.service.search(value)),
    map((resultado) => this.livrosResultado = resultado ),
    map((resultado) => resultado.items ?? []),
    map((items) => this.resultadosLivros(items)),
    catchError(error => {
      console.log(error)
      return throwError(()=> new Error(this.errorMessage = 'Ops, ocorreu um erro'))
    })
  );

  resultadosLivros(items: Array<Item>): Array<LivroVolumeInfo> {
    return items.map((item) => {
      return new LivroVolumeInfo(item);
    });
  }
}
