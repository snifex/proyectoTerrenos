import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapaComponent } from './components/mapa/mapa.component';


const routes: Routes = [
  {
    path:"",
    redirectTo: "/mapas",
    pathMatch: "full"
  },
  {
		path: 'mapas',
		component: MapaComponent
	},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
