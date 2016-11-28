/* tslint:disable: member-ordering */
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect, toPayload } from '@ngrx/effects';

import { AppState, createReducer } from '../../reducers';
import { RequestBase } from '../../services/request-base';

@Injectable()
export class LazyActions {
  static LAZY_INIT = '[Lazy] Init';
  init(): Action {
    return {
      type: LazyActions.LAZY_INIT
    };
  }

  static DO_SOMETHING = '[Lazy] Do Something';
  doSomething(payload: string) {
    return {
      type: LazyActions.DO_SOMETHING,
      payload
    };
  }

  static RESULT_OF_DO_SOMETHING = '[Lazy] Do Something Result';
  resultDoSomething(result: number) {
    return {
      type: LazyActions.RESULT_OF_DO_SOMETHING,
      payload: result
    };
  }

  static FAIL_DO_SOMETHING = '[Lazy] Do Something Fail';
  fail(error: string) {
    return {
      type: LazyActions.FAIL_DO_SOMETHING,
      payload: error
    };
  }
}

@Injectable()
export class LazyService extends RequestBase {
  constructor(public http: Http) {
    super(http);
  }

  doSomething(payload): Observable<number> {
    if (payload === null) {
      return Observable.throw('error');
    }

    return Observable.of(42);
  }
}

@Injectable()
export class LazyEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private service: LazyService,
    private actions: LazyActions
  ) { }

  @Effect() doSomething$ = this.actions$
    .ofType(LazyActions.DO_SOMETHING)
    .map(toPayload)
    .switchMap(payload => this.service.doSomething(payload)
      .map(something => this.actions.resultDoSomething(something))
      .catch(error => Observable.of(this.actions.fail(error)))
    );
}


export interface LazyState {
  error: string;
  answerToLife: number;
}

export interface AppStateWithLazyState extends AppState {
  lazy: LazyState;
}

const initialState: LazyState = {
  error: null,
  answerToLife: 0
};

export function lazyReducer(state = initialState, action: Action): LazyState {
  switch (action.type) {
    case LazyActions.RESULT_OF_DO_SOMETHING: {
      return Object.assign({}, state, {
        answerToLife: action.payload
      });
    }

    case LazyActions.FAIL_DO_SOMETHING: {
      return Object.assign({}, state, {
        answerToLife: -1,
        error: action.payload
      });
    }

    case LazyActions.LAZY_INIT:
    default:
      return state;
  }
}

export const appReducerWithLazy = createReducer({lazy: lazyReducer});
