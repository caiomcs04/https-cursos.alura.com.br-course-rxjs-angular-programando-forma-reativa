import { LivroService } from './../../service/livro.service';
import { Component, OnDestroy } from '@angular/core';
import { Subject, Subscription, takeUntil } from 'rxjs';

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css']
})
export class ListaLivrosComponent implements OnDestroy {

  listaLivros: [];
  searchField: string = '';
  private _unsubscribe: Subject<boolean> =new Subject;

  constructor(private service: LivroService) { }

  searchBooks = (): void =>{
    this.service.search(this.searchField).pipe(takeUntil(this._unsubscribe)).subscribe(
      {
        next: (response) => console.log(response),
        error: (err) => console.warn(err),
        complete: () => console.log('Observable completado')
      }

      )
    return;
  }

  ngOnDestroy(){
    this._unsubscribe.next(true)
    this._unsubscribe.complete()
  }
}
