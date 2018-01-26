import { Component } from '@angular/core';
//importamos las 3 páginas que va a ser roots en los Tabs
import {HomePage, CategoriasPage, OrdenesPage } from '../index.pages';

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
  tab1 = HomePage;
  tab2 = CategoriasPage;
  tab3 = OrdenesPage;


}
