import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppStateWithLazyState, appReducerWithLazy, LazyActions } from './lazy.ngrx';

@Component({
  selector: 'my-lazy',
  templateUrl: './lazy.component.html'
})

export class LazyComponent {
  constructor(private store: Store<AppStateWithLazyState>, private actions: LazyActions) {
    this.store.replaceReducer(appReducerWithLazy);
  }

  doSomething() {
    this.store.dispatch(this.actions.doSomething(null));
  }
}
