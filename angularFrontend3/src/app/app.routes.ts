import { Routes } from '@angular/router';
import { MainPage } from './MainPage.component';
import { NotFoundPage } from './NotFoundPage.component';

export const routes: Routes = [
    {path: '', component: MainPage},
    {path: '**', component: NotFoundPage}
];