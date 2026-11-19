import { Routes } from '@angular/router';
import { TaskList } from '../task-list/task-list';
import { TaskAdd } from '../task-add/task-add';
import { TaskEdit } from '../task-edit/task-edit';

export const routes: Routes = [
  { path: '', redirectTo: 'tasks', pathMatch: 'full' },
  { path: 'tasks', component: TaskList },
  { path: 'tasks/add', component: TaskAdd },
  { path: 'tasks/edit/:id', component: TaskEdit }
];