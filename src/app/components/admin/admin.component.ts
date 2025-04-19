// hospital-admin-dashboard.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Test {
  id: number;
  name: string;
  description: string;
}

interface Package {
  id: number;
  name: string;
  price: number;
  description: string;
  tests: Test[];
}

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="dashboard-container">
      <!-- Sidebar -->
      <aside class="sidebar">
        <div class="sidebar-header">
          <h2>Hospital Admin</h2>
        </div>
        <nav class="sidebar-nav">
          <ul>
            <li class="active"><span class="icon">📊</span> Dashboard</li>
            <li><span class="icon">📦</span> Packages</li>
            <li><span class="icon">🔬</span> Tests</li>
            <li><span class="icon">👥</span> Patients</li>
            <li><span class="icon">👨‍⚕️</span> Doctors</li>
            <li><span class="icon">📅</span> Appointments</li>
            <li><span class="icon">💰</span> Billing</li>
            <li><span class="icon">⚙️</span> Settings</li>
          </ul>
        </nav>
        <div class="sidebar-footer">
          <div class="user-profile">
            <div class="avatar">👤</div>
            <div class="user-info">
              <h4>Admin User</h4>
              <p>Hospital Admin</p>
            </div>
          </div>
        </div>
      </aside>

      <!-- Main Content -->
      <main class="main-content">
        <!-- Header -->
        <header class="header">
          <div class="search-container">
            <span class="search-icon">🔍</span>
            <input type="text" placeholder="Search packages, tests..." class="search-input">
          </div>
          <div class="header-actions">
            <div class="notification">
              <span class="icon">🔔</span>
              <span class="badge">3</span>
            </div>
            <div class="messages">
              <span class="icon">✉️</span>
              <span class="badge">5</span>
            </div>
            <div class="settings">
              <span class="icon">⚙️</span>
            </div>
          </div>
        </header>

        <!-- Dashboard Content -->
        <div class="dashboard-content">
          <div class="page-header">
            <h1 class="page-title">Package Management</h1>
            <button class="primary-btn" (click)="toggleAddPackageForm()">Add New Package</button>
          </div>
          
          <!-- Add Package Form -->
          <div class="form-container" *ngIf="showAddPackageForm">
            <div class="form-header">
              <h2>{{ editingPackage ? 'Edit Package' : 'Add New Package' }}</h2>
              <button class="close-btn" (click)="toggleAddPackageForm()">×</button>
            </div>
            <div class="form-body">
              <div class="form-group">
                <label for="packageName">Package Name</label>
                <input type="text" id="packageName" [(ngModel)]="newPackage.name" placeholder="e.g. Gold Package">
              </div>
              <div class="form-group">
                <label for="packagePrice">Price (₹)</label>
                <input type="number" id="packagePrice" [(ngModel)]="newPackage.price" placeholder="e.g. 5000">
              </div>
              <div class="form-group">
                <label for="packageDescription">Description</label>
                <textarea id="packageDescription" [(ngModel)]="newPackage.description" placeholder="Describe the package"></textarea>
              </div>
              <div class="form-group">
                <label>Tests Included</label>
                <div class="test-selection">
                  <div *ngFor="let test of availableTests" class="test-checkbox">
                    <input 
                      type="checkbox" 
                      [id]="'test' + test.id"
                      [checked]="isTestSelected(test)"
                      (change)="toggleTestSelection(test)"
                    >
                    <label [for]="'test' + test.id">{{ test.name }}</label>
                  </div>
                </div>
              </div>
              <div class="form-actions">
                <button class="secondary-btn" (click)="toggleAddPackageForm()">Cancel</button>
                <button class="primary-btn" (click)="savePackage()">{{ editingPackage ? 'Update Package' : 'Add Package' }}</button>
              </div>
            </div>
          </div>

          <!-- Package Cards -->
          <div class="package-grid">
            <div class="package-card" *ngFor="let package of packages">
              <div class="package-header" [ngClass]="{'gold': package.name.toLowerCase().includes('gold'), 'silver': package.name.toLowerCase().includes('silver'), 'bronze': package.name.toLowerCase().includes('bronze')}">
                <h3>{{ package.name }}</h3>
                <span class="package-price">₹{{ package.price }}</span>
              </div>
              <div class="package-body">
                <p class="package-description">{{ package.description }}</p>
                <div class="package-tests">
                  <h4>Tests Included:</h4>
                  <ul>
                    <li *ngFor="let test of package.tests">
                      <span class="test-icon">🔬</span> {{ test.name }}
                    </li>
                  </ul>
                </div>
              </div>
              <div class="package-actions">
                <button class="edit-btn" (click)="editPackage(package)">Edit</button>
                <button class="delete-btn" (click)="deletePackage(package)">Delete</button>
              </div>
            </div>
          </div>

          <!-- Stats Cards -->
          <h2 class="section-title">Dashboard Overview</h2>
          <div class="stats-row">
            <div class="stat-card">
              <div class="stat-card-header">
                <div class="stat-card-icon" style="background-color: #3498db;">📦</div>
                <div class="stat-card-info">
                  <h3>Total Packages</h3>
                  <p class="stat-value">{{ packages.length }}</p>
                </div>
              </div>
              <div class="stat-card-footer">
                <span class="stat-trend positive">↑ 2</span>
                <span class="stat-period">vs last month</span>
              </div>
            </div>
            
            <div class="stat-card">
              <div class="stat-card-header">
                <div class="stat-card-icon" style="background-color: #2ecc71;">🔬</div>
                <div class="stat-card-info">
                  <h3>Total Tests Available</h3>
                  <p class="stat-value">{{ availableTests.length }}</p>
                </div>
              </div>
              <div class="stat-card-footer">
                <span class="stat-trend positive">↑ 5</span>
                <span class="stat-period">vs last month</span>
              </div>
            </div>
            
            <div class="stat-card">
              <div class="stat-card-header">
                <div class="stat-card-icon" style="background-color: #e74c3c;">👥</div>
                <div class="stat-card-info">
                  <h3>Patients Enrolled</h3>
                  <p class="stat-value">128</p>
                </div>
              </div>
              <div class="stat-card-footer">
                <span class="stat-trend positive">↑ 12</span>
                <span class="stat-period">vs last month</span>
              </div>
            </div>
            
            <div class="stat-card">
              <div class="stat-card-header">
                <div class="stat-card-icon" style="background-color: #f39c12;">💰</div>
                <div class="stat-card-info">
                  <h3>Revenue</h3>
                  <p class="stat-value">₹3,28,500</p>
                </div>
              </div>
              <div class="stat-card-footer">
                <span class="stat-trend positive">↑ 8%</span>
                <span class="stat-period">vs last month</span>
              </div>
            </div>
          </div>
          
          <!-- Recent Activities Section -->
          <div class="recent-activity">
            <div class="activity-header">
              <h3>Recent Activities</h3>
              <button class="view-all-btn">View All</button>
            </div>
            <div class="activity-list">
              <div class="activity-item">
                <div class="activity-icon" style="background-color: #3498db;">📦</div>
                <div class="activity-details">
                  <p class="activity-text"><strong>Gold Package</strong> updated - added Thyroid Test</p>
                  <p class="activity-time">5 minutes ago</p>
                </div>
              </div>
              <div class="activity-item">
                <div class="activity-icon" style="background-color: #2ecc71;">👥</div>
                <div class="activity-details">
                  <p class="activity-text"><strong>Patient #1254</strong> enrolled in Silver Package</p>
                  <p class="activity-time">15 minutes ago</p>
                </div>
              </div>
              <div class="activity-item">
                <div class="activity-icon" style="background-color: #e74c3c;">🔬</div>
                <div class="activity-details">
                  <p class="activity-text"><strong>New Test:</strong> Advanced Lipid Profile added to system</p>
                  <p class="activity-time">35 minutes ago</p>
                </div>
              </div>
              <div class="activity-item">
                <div class="activity-icon" style="background-color: #f39c12;">📦</div>
                <div class="activity-details">
                  <p class="activity-text"><strong>New Package</strong> "Bronze Package" created</p>
                  <p class="activity-time">1 hour ago</p>
                </div>
              </div>
              <div class="activity-item">
                <div class="activity-icon" style="background-color: #9b59b6;">💰</div>
                <div class="activity-details">
                  <p class="activity-text"><strong>Payment Received</strong> ₹15,000 for 3 Gold Package enrollments</p>
                  <p class="activity-time">2 hours ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  `,
  styles: [`
    /* Main Layout */
    .dashboard-container {
      display: flex;
      width: 100%;
      height: 100vh;
      overflow: hidden;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }

    /* Sidebar Styles */
    .sidebar {
      width: 250px;
      height: 100%;
      background-color: #2c3e50;
      color: white;
      display: flex;
      flex-direction: column;
    }

    .sidebar-header {
      padding: 20px;
      border-bottom: 1px solid #34495e;
    }

    .sidebar-header h2 {
      margin: 0;
      font-size: 1.5rem;
    }

    .sidebar-nav {
      flex: 1;
      padding: 20px 0;
    }

    .sidebar-nav ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .sidebar-nav li {
      padding: 12px 20px;
      display: flex;
      align-items: center;
      cursor: pointer;
      transition: background-color 0.2s;
    }

    .sidebar-nav li:hover {
      background-color: #34495e;
    }

    .sidebar-nav li.active {
      background-color: #3498db;
    }

    .sidebar-nav .icon {
      margin-right: 10px;
    }

    .sidebar-footer {
      padding: 20px;
      border-top: 1px solid #34495e;
    }

    .user-profile {
      display: flex;
      align-items: center;
    }

    .avatar {
      width: 40px;
      height: 40px;
      background-color: #3498db;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 10px;
    }

    .user-info h4 {
      margin: 0;
      font-size: 1rem;
    }

    .user-info p {
      margin: 0;
      font-size: 0.8rem;
      opacity: 0.7;
    }

    /* Main Content Styles */
    .main-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      background-color: #f5f7fa;
      overflow-y: auto;
    }

    /* Header Styles */
    .header {
      height: 70px;
      background-color: white;
      border-bottom: 1px solid #e0e0e0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 20px;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
    }

    .search-container {
      position: relative;
      flex: 1;
      max-width: 500px;
    }

    .search-icon {
      position: absolute;
      left: 10px;
      top: 50%;
      transform: translateY(-50%);
    }

    .search-input {
      width: 100%;
      padding: 10px 10px 10px 35px;
      border: 1px solid #e0e0e0;
      border-radius: 5px;
      outline: none;
      font-size: 0.9rem;
    }

    .search-input:focus {
      border-color: #3498db;
    }

    .header-actions {
      display: flex;
      align-items: center;
    }

    .notification, .messages, .settings {
      position: relative;
      margin-left: 20px;
      cursor: pointer;
    }

    .badge {
      position: absolute;
      top: -5px;
      right: -5px;
      background-color: #e74c3c;
      color: white;
      border-radius: 50%;
      width: 18px;
      height: 18px;
      font-size: 0.7rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    /* Dashboard Content Styles */
    .dashboard-content {
      padding: 20px;
    }

    .page-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }

    .page-title {
      margin: 0;
      font-size: 1.8rem;
      color: #2c3e50;
    }

    .section-title {
      margin: 30px 0 20px;
      font-size: 1.5rem;
      color: #2c3e50;
    }

    .primary-btn {
      background-color: #3498db;
      color: white;
      border: none;
      padding: 10px 15px;
      border-radius: 5px;
      cursor: pointer;
      font-weight: bold;
      transition: background-color 0.2s;
    }

    .primary-btn:hover {
      background-color: #2980b9;
    }

    .secondary-btn {
      background-color: #95a5a6;
      color: white;
      border: none;
      padding: 10px 15px;
      border-radius: 5px;
      cursor: pointer;
      font-weight: bold;
      transition: background-color 0.2s;
    }

    .secondary-btn:hover {
      background-color: #7f8c8d;
    }

    /* Form Styles */
    .form-container {
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      margin-bottom: 20px;
      overflow: hidden;
    }

    .form-header {
      background-color: #3498db;
      color: white;
      padding: 15px 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .form-header h2 {
      margin: 0;
      font-size: 1.2rem;
    }

    .close-btn {
      background: none;
      border: none;
      color: white;
      font-size: 1.5rem;
      cursor: pointer;
    }

    .form-body {
      padding: 20px;
    }

    .form-group {
      margin-bottom: 15px;
    }

    .form-group label {
      display: block;
      margin-bottom: 5px;
      font-weight: bold;
      color: #2c3e50;
    }

    .form-group input[type="text"],
    .form-group input[type="number"],
    .form-group textarea {
      width: 100%;
      padding: 10px;
      border: 1px solid #e0e0e0;
      border-radius: 5px;
      font-size: 0.9rem;
    }

    .form-group input:focus,
    .form-group textarea:focus {
      border-color: #3498db;
      outline: none;
    }

    .form-group textarea {
      min-height: 100px;
      resize: vertical;
    }

    .test-selection {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 10px;
      max-height: 200px;
      overflow-y: auto;
      border: 1px solid #e0e0e0;
      border-radius: 5px;
      padding: 10px;
    }

    .test-checkbox {
      display: flex;
      align-items: center;
    }

    .test-checkbox input[type="checkbox"] {
      margin-right: 8px;
    }

    .form-actions {
      display: flex;
      justify-content: flex-end;
      gap: 10px;
      margin-top: 20px;
    }

    /* Package Cards */
    .package-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 20px;
      margin-bottom: 30px;
    }

    .package-card {
      background-color: white;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
      transition: transform 0.2s, box-shadow 0.2s;
    }

    .package-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    }

    .package-header {
      padding: 15px 20px;
      color: white;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #3498db;
    }

    .package-header.gold {
      background: linear-gradient(135deg, #f39c12, #f1c40f);
    }

    .package-header.silver {
      background: linear-gradient(135deg, #95a5a6, #bdc3c7);
    }

    .package-header.bronze {
      background: linear-gradient(135deg, #d35400, #e67e22);
    }

    .package-header h3 {
      margin: 0;
      font-size: 1.2rem;
    }

    .package-price {
      font-weight: bold;
      font-size: 1.2rem;
    }

    .package-body {
      padding: 20px;
    }

    .package-description {
      margin-top: 0;
      margin-bottom: 15px;
      color: #7f8c8d;
    }

    .package-tests h4 {
      margin-top: 0;
      margin-bottom: 10px;
      color: #2c3e50;
    }

    .package-tests ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .package-tests li {
      padding: 5px 0;
      display: flex;
      align-items: center;
    }

    .test-icon {
      margin-right: 8px;
    }

    .package-actions {
      padding: 15px 20px;
      display: flex;
      justify-content: flex-end;
      gap: 10px;
      border-top: 1px solid #f0f0f0;
    }

    .edit-btn {
      background-color: #3498db;
      color: white;
      border: none;
      padding: 8px 12px;
      border-radius: 5px;
      cursor: pointer;
    }

    .edit-btn:hover {
      background-color: #2980b9;
    }

    .delete-btn {
      background-color: #e74c3c;
      color: white;
      border: none;
      padding: 8px 12px;
      border-radius: 5px;
      cursor: pointer;
    }

    .delete-btn:hover {
      background-color: #c0392b;
    }

    /* Stats Cards */
    .stats-row {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 20px;
      margin-bottom: 20px;
    }

    .stat-card {
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
      padding: 20px;
      transition: transform 0.2s;
    }

    .stat-card:hover {
      transform: translateY(-5px);
    }

    .stat-card-header {
      display: flex;
      align-items: center;
      margin-bottom: 15px;
    }

    .stat-card-icon {
      width: 50px;
      height: 50px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 15px;
      color: white;
      font-size: 1.5rem;
    }

    .stat-card-info h3 {
      margin: 0;
      font-size: 1rem;
      color: #7f8c8d;
    }

    .stat-value {
      margin: 0;
      font-size: 1.8rem;
      font-weight: bold;
      color: #2c3e50;
    }

    .stat-card-footer {
      display: flex;
      align-items: center;
    }

    .stat-trend {
      font-weight: bold;
      margin-right: 5px;
    }

    .positive {
      color: #2ecc71;
    }

    .negative {
      color: #e74c3c;
    }

    .stat-period {
      font-size: 0.8rem;
      color: #7f8c8d;
    }

    /* Recent Activity */
    .recent-activity {
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
      padding: 20px;
    }

    .activity-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 15px;
    }

    .activity-header h3 {
      margin: 0;
      font-size: 1.2rem;
      color: #2c3e50;
    }

    .view-all-btn {
      background-color: transparent;
      border: 1px solid #3498db;
      color: #3498db;
      padding: 5px 10px;
      border-radius: 5px;
      cursor: pointer;
      transition: background-color 0.2s, color 0.2s;
    }

    .view-all-btn:hover {
      background-color: #3498db;
      color: white;
    }

    .activity-list {
      display: flex;
      flex-direction: column;
      gap: 15px;
    }

    .activity-item {
      display: flex;
      align-items: center;
      padding-bottom: 15px;
      border-bottom: 1px solid #f0f0f0;
    }

    .activity-item:last-child {
      border-bottom: none;
      padding-bottom: 0;
    }

    .activity-icon {
      width: 40px;
      height: 40px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 15px;
      color: white;
    }

    .activity-details {
      flex: 1;
    }

    .activity-text {
      margin: 0;
      color: #2c3e50;
    }

    .activity-time {
      margin: 5px 0 0;
      font-size: 0.8rem;
      color: #7f8c8d;
    }
  `]
})
export class AdminDashboardComponent { // Changed from HospitalAdminDashboardComponent
  // ...  // Sample data for available tests
  availableTests: Test[] = [
    { id: 1, name: 'Blood Sugar Test', description: 'Measures glucose levels in blood' },
    { id: 2, name: 'Heart Function Test', description: 'ECG and other cardiac assessments' },
    { id: 3, name: 'Lipid Profile', description: 'Measures cholesterol and triglycerides' },
    { id: 4, name: 'Thyroid Function Test', description: 'Measures thyroid hormone levels' },
    { id: 5, name: 'Kidney Function Test', description: 'Measures creatinine and urea levels' },
    { id: 6, name: 'Liver Function Test', description: 'Measures liver enzymes' },
    { id: 7, name: 'Complete Blood Count (CBC)', description: 'RBC, WBC, hemoglobin levels' },
    { id: 8, name: 'Vitamin D Test', description: 'Measures vitamin D levels' },
    { id: 9, name: 'Vitamin B12 Test', description: 'Measures vitamin B12 levels' },
    { id: 10, name: 'HbA1c Test', description: 'Long-term blood sugar control' }
  ];

  // Sample data for packages
  packages: Package[] = [
    { 
      id: 1, 
      name: 'Gold Package', 
      price: 5000, 
      description: 'Comprehensive health check-up with premium tests', 
      tests: [
        { id: 1, name: 'Blood Sugar Test', description: 'Measures glucose levels in blood' },
        { id: 2, name: 'Heart Function Test', description: 'ECG and other cardiac assessments' },
        { id: 3, name: 'Lipid Profile', description: 'Measures cholesterol and triglycerides' },
        { id: 4, name: 'Thyroid Function Test', description: 'Measures thyroid hormone levels' },
        { id: 5, name: 'Kidney Function Test', description: 'Measures creatinine and urea levels' },
        { id: 6, name: 'Liver Function Test', description: 'Measures liver enzymes' }
      ]
    },
    { 
      id: 2, 
      name: 'Silver Package', 
      price: 3000, 
      description: 'Standard health check-up with essential tests', 
      tests: [
        { id: 1, name: 'Blood Sugar Test', description: 'Measures glucose levels in blood' },
        { id: 3, name: 'Lipid Profile', description: 'Measures cholesterol and triglycerides' },
        { id: 7, name: 'Complete Blood Count (CBC)', description: 'RBC, WBC, hemoglobin levels' }
      ]
    },
    { 
      id: 3, 
      name: 'Bronze Package', 
      price: 1500, 
      description: 'Basic health check-up for routine monitoring', 
      tests: [
        { id: 1, name: 'Blood Sugar Test', description: 'Measures glucose levels in blood' },
        { id: 7, name: 'Complete Blood Count (CBC)', description: 'RBC, WBC, hemoglobin levels' }
      ]
    }
  ];

  // Form control
  showAddPackageForm: boolean = false;
  editingPackage: Package | null = null;
  
  // New package model
  newPackage: Package = {
    id: 0,
    name: '',
    price: 0,
    description: '',
    tests: []
  };

  // Toggle form visibility
  toggleAddPackageForm() {
    this.showAddPackageForm = !this.showAddPackageForm;
    if (!this.showAddPackageForm) {
      this.resetForm();
    }
  }

  // Reset form
  resetForm() {
    this.editingPackage = null;
    this.newPackage = {
      id: 0,
      name: '',
      price: 0,
      description: '',
      tests: []
    };
  }

  // Edit package
  editPackage(pkg: Package) {
    this.editingPackage = pkg;
    this.newPackage = {
      id: pkg.id,
      name: pkg.name,
      price: pkg.price,
      description: pkg.description,
      tests: [...pkg.tests]
    };
    this.showAddPackageForm = true;
  }

  // Delete package
  deletePackage(pkg: Package) {
    if (confirm(`Are you sure you want to delete ${pkg.name}?`)) {
      this.packages = this.packages.filter(p => p.id !== pkg.id);
    }
  }

  // Check if test is selected
  isTestSelected(test: Test): boolean {
    return this.newPackage.tests.some(t => t.id === test.id);
  }

  // Toggle test selection
  toggleTestSelection(test: Test) {
    if (this.isTestSelected(test)) {
      this.newPackage.tests = this.newPackage.tests.filter(t => t.id !== test.id);
    } else {
      this.newPackage.tests.push(test);
    }
  }

  // Save package
  savePackage() {
    if (!this.newPackage.name || this.newPackage.price <= 0 || this.newPackage.tests.length === 0) {
      alert('Please fill in all required fields and select at least one test');
      return;
    }

    if (this.editingPackage) {
      // Update existing package
      const index = this.packages.findIndex(p => p.id === this.editingPackage!.id);
      if (index !== -1) {
        this.packages[index] = { ...this.newPackage };
      }
    } else {
      // Add new package
      const newId = Math.max(0, ...this.packages.map(p => p.id)) + 1;
      this.packages.push({
        ...this.newPackage,
        id: newId
      });
    }

    // Reset and close form
    this.toggleAddPackageForm();
  }
}