import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-add',
  imports: [ReactiveFormsModule],
  templateUrl: './task-add.html'
})
export class TaskAdd {
  private fb = inject(FormBuilder);
  private http = inject(HttpClient);
  private router = inject(Router);

  form = this.fb.group({
    title: ['', Validators.required],
    description: [''],
    dueDate: [''],
    status: [false],
    priority: ['medium']
  });

  submit() {
    if (this.form.invalid) return;
    this.http.post('http://localhost:3000/tasks', this.form.value).subscribe(() => {
      alert('Thêm thành công!');
      this.router.navigate(['/tasks']);
    });
  }
}