import { Routes } from '@angular/router';
import { SectionSalesComponent } from './app/sections/section-sales/section-sales.component';
import { SectionOdersComponent } from './app/sections/section-oders/section-oders.component';
import { SectionHealthComponent } from './app/sections/section-health/section-health.component';

export const appRoutes: Routes = [
    {path: 'sales', component: SectionSalesComponent},
    {path: 'orders', component: SectionOdersComponent},
    {path: 'health', component: SectionHealthComponent},



    {path: '', redirectTo: '/sales', pathMatch: 'full'} , // home route
];
