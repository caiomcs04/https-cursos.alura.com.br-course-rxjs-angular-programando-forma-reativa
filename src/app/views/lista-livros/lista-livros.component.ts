import { LivroVolumeInfo } from './../../models/livroVolumeInfo';
import { Livro, Item } from './../../models/interface';
import { LivroService } from './../../service/livro.service';
import { Component, OnDestroy } from '@angular/core';
import { debounceTime, filter, map, Subject, switchMap, takeUntil } from 'rxjs';
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
  constructor(private service: LivroService) {}

  livrosEncontrados$ = this.searchField.valueChanges.pipe(
    debounceTime(this.pauseTime),
    filter((value) => value.length >= 3),
    switchMap((value) => this.service.search(value)),
    map((items) => this.resultadosLivros(items))
  );

  resultadosLivros(items: Array<Item>): Array<LivroVolumeInfo> {
    return items.map((item) => {
      return new LivroVolumeInfo(item);
    });
  }
}
