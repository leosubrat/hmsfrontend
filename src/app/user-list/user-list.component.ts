// user-list.component.ts
import { Component, NgModule, OnInit } from '@angular/core';
import { UserService, UserDoctorDto } from '../services/user.service';
import { CommonModule, NgClass } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-user-list',
  standalone:true,
  imports: [CommonModule, NgClass, FormsModule],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
  
})
export class UserListComponent implements OnInit {
  users: UserDoctorDto[] = [];
  filteredUsers: UserDoctorDto[] = [];
  isLoading = false;
  error: string | null = null;
  searchTerm: string = '';
  roleFilter: string = 'all'; // 'all', 'doctor', 'patient'

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.isLoading = true;
    this.error = null;
    
    this.userService.getAllUsers().subscribe({
      next: (response) => {
        this.users = response.data;
        this.applyFilters();
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Failed to load users. Please try again later.';
        console.error('Error loading users:', err);
        this.isLoading = false;
      }
    });
  }

  applyFilters(): void {
    let result = [...this.users];
    
    // Apply role filter
    if (this.roleFilter !== 'all') {
      result = result.filter(user => user.role.toLowerCase() === this.roleFilter);
    }
    
    // Apply search filter
    if (this.searchTerm.trim()) {
      const term = this.searchTerm.toLowerCase().trim();
      result = result.filter(user => 
        user.username.toLowerCase().includes(term) || 
        user.email.toLowerCase().includes(term)
      );
    }
    
    this.filteredUsers = result;
  }

  onSearch(): void {
    this.applyFilters();
  }

  onRoleFilterChange(role: string): void {
    this.roleFilter = role;
    this.applyFilters();
  }

  refreshUsers(): void {
    this.loadUsers();
  }
}