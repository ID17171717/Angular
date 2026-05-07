import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Admin {
  id: number;
  username: string;
  email: string;
  password: string;
  full_name: string;
  is_active: boolean;
}

@Component({
  selector: 'app-admins-list',
  templateUrl: './admins-list.component.html',
  styleUrls: ['./admins-list.component.css']
})
export class AdminsListComponent implements OnInit {
  admins: Admin[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<Admin[]>('/api/admins').subscribe({
      next: (data) => {
        this.admins = data;
      },
      error: (err) => {
        console.error('Ошибка:', err);
      }
    });
  }
}