import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from 'src/app/core/guards/admin.guard';

const routes: Routes = [
    {
        path: 'students',
        loadChildren: () => import('../students/students.module').then((m) => m.StudentsModule)
    },
    {
        path: 'courses',
        loadChildren: () => import('../courses/courses.module').then((m) => m.CoursesModule)
    },
    {
        path: 'inscriptions',
        canActivate: [AdminGuard],
        loadChildren: () => import('../inscriptions/inscriptions.module').then((m) => m.InscriptionsModule)
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule { }
