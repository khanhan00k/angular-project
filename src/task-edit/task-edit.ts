import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-task-edit',
  imports: [ReactiveFormsModule],
  templateUrl: './task-edit.html'
})
export class TaskEdit implements OnInit {
  private fb = inject(FormBuilder);
  private http = inject(HttpClient);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  private id = this.route.snapshot.paramMap.get('id') ?? '';
  private url = `http://localhost:3000/tasks/${this.id}`;

  form = this.fb.group({
    title: ['', Validators.required],
    description: [''],
    dueDate: [''],
    status: [false],
    priority: ['medium']
  });

  ngOnInit() {
    this.http.get<any>(this.url).subscribe((res) => this.form.patchValue(res));
  }

  submit() {
    if (this.form.invalid) return;
    this.http.put(this.url, this.form.value).subscribe(() => {
      alert('Cập nhật thành công!');
      this.router.navigate(['/tasks']);
    });
  }
}