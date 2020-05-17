import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExamplesComponent } from './examples/examples.component';
import { ErrorPageComponent } from './error-page/error-page.component';

const routes: Routes = [
  { component: ExamplesComponent, path: '', pathMatch: 'full' },
  { component: ErrorPageComponent, path: 'error' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
