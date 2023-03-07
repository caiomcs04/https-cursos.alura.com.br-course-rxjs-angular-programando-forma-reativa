import { Livro, VolumeInfo } from './../../models/interface';
import { LivroService } from './../../service/livro.service';
import { Component, OnDestroy } from '@angular/core';
import { Subject, Subscription, takeUntil } from 'rxjs';

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css']
})
export class ListaLivrosComponent implements OnDestroy {

  listaLivros: Array<Livro>;
  searchField: string = '';
  private _unsubscribe: Subject<boolean> =new Subject;
  livro : Livro

  constructor(private service: LivroService) { }

  searchBooks = (): void =>{
    this.service.search(this.searchField).pipe(takeUntil(this._unsubscribe)).subscribe(
      {
        next: (items) => {
          this.listaLivros = this.resultadosLivros(items)
        },
        error: (err) => console.warn(err),
      }

      )
    return;
  }

resultadosLivros(items): Array<Livro>{

  const livros: Array<Livro> = []

  items.forEach(item => {
    livros.push(this.livro = {
      title: item.volumeInfo?.title,
      authors: item.volumeInfo?.auhors,
      publisher:item.volumeInfo?.publisher,
       publishedDate:item.volumeInfo?.publishedDate,
        description: item.volumeInfo?.description,
        previewLink: item.volumeInfo?.previewLink,
        thumbnail: item.volumeInfo?.imageLinks?.thumbnail
    })
  });

  return livros;
}

  ngOnDestroy(){
    this._unsubscribe.next(true)
    this._unsubscribe.complete()
  }
}
