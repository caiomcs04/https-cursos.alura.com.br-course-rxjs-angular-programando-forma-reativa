import { LivroService } from './../../service/livro.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css']
})
export class ListaLivrosComponent {

  listaLivros: [];
  searchField: string = '';

  constructor(private service: LivroService) { }

  searchBooks = (): void =>{
    this.service.search(this.searchField).subscribe(
      {
        next: (response) => console.log(response),
        error: (err) => console.warn(err)
      }

      )
    return;
  }

}



