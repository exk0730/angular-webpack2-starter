/* tslint:disable: variable-name */
import { Routes } from '@angular/router';
import { LazyComponent } from './lazy.component';

export const routes: Routes = [
  {
    path: '',
    component: LazyComponent,
    children: [
      {
        path: 'deep-lazy',
        /*
         also tried the following:
         loadChildren: '../lazy/deep-lazy/index#DeepLazyModule'
         loadChildren: 'app/features/lazy/deep-lazy/index#DeepLazyModule'
         */
        loadChildren: './deep-lazy/index#DeepLazyModule'
      }
    ]
  }
];
