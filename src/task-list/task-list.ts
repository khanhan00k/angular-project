import { Component, OnInit, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-task-list',
  imports: [RouterLink],
  templateUrl: './task-list.html'
})
export class TaskList implements OnInit {
  private http = inject(HttpClient);
  private api = 'http://localhost:3000/tasks';

  tasks = signal<any[]>([]);
  msg = signal('');

  ngOnInit() {
    this.load();
  }

  load() {
    this.http.get<any[]>(this.api).subscribe((res) => this.tasks.set(res));
  }

  remove(item: any) {
    if (!confirm(`Xóa "${item.title}"?`)) return;
    this.http.delete(`${this.api}/${item.id}`).subscribe(() => {
      this.msg.set('Đã xóa công việc!');
      this.load();
    });
  }
}