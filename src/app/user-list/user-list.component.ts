// user-list.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService, UserDoctorDto } from '../services/user.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
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
  roleFilter: string = 'all'; // 'all', 'DOCTOR', 'USER'
  selectedUser: UserDoctorDto | null = null;
  isEditMode = false;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.isLoading = true;
    this.error = null;
    
    this.userService.getAllUsers().subscribe(
      (response) => {
        this.users = response.data;
        this.applyFilters();
        this.isLoading = false;
      },
      (err) => {
        this.error = 'Failed to load users. Please try again later.';
        console.error('Error loading users:', err);
        this.isLoading = false;
      }
    );
  }

  applyFilters(): void {
    let result = [...this.users];
    
    // Apply role filter
    if (this.roleFilter !== 'all') {
      result = result.filter(user => user.role === this.roleFilter);
    }
    
    // Apply search filter
    if (this.searchTerm.trim()) {
      const term = this.searchTerm.toLowerCase().trim();
      result = result.filter(user => 
        user.firstName.toLowerCase().includes(term) || 
        (user.lastName && user.lastName.toLowerCase().includes(term)) ||
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

  editUser(user: UserDoctorDto): void {
    this.selectedUser = { ...user }; // Create a copy to avoid direct binding
    this.isEditMode = true;
  }

  cancelEdit(): void {
    this.selectedUser = null;
    this.isEditMode = false;
  }

  // user-list.component.ts - saveUser() method with debugging
saveUser(): void {
  if (!this.selectedUser) {
    console.error('No user selected for editing');
    return;
  }

  console.log('Attempting to save user:', this.selectedUser);
  this.isLoading = true;
  this.error = null;

  // Add explicit debugging for API call
  console.log(`Calling API to update user with ID: ${this.selectedUser.id}`);
  
  this.userService.updateUser(this.selectedUser.id, this.selectedUser).subscribe(
    (response) => {
      console.log('User updated successfully:', response);
      this.isEditMode = false;
      this.selectedUser = null;
      this.loadUsers(); // Refresh the list
      this.isLoading = false;
    },
    (err) => {
      console.error('Detailed error when updating user:', err);
      this.error = `Failed to update user: ${err.message || 'Unknown error'}`;
      this.isLoading = false;
    }
  );
}
  deleteUser(userId: number): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.isLoading = true;
      this.error = null;

      this.userService.deleteUser(userId).subscribe(
        (response) => {
          console.log('User deleted successfully:', response);
          this.loadUsers(); // Refresh the list
          this.isLoading = false;
        },
        (err) => {
          this.error = 'Failed to delete user. Please try again.';
          console.error('Error deleting user:', err);
          this.isLoading = false;
        }
      );
    }
  }
}