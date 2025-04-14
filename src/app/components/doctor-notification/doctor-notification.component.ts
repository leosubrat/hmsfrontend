// src/app/components/doctor-notification/doctor-notification.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoctorNotification, DoctorNotificationService } from './doctor-notification.service';

@Component({
  selector: 'app-doctor-notification',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="notification-bell" (click)="toggleNotifications()">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
        <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z"/>
      </svg>
      <span class="notification-badge" *ngIf="unreadCount > 0">{{ unreadCount }}</span>
      
      <div class="notification-dropdown" *ngIf="showNotifications">
        <div class="notification-header">
          <h3>Notifications</h3>
          <button *ngIf="notifications.length > 0" (click)="markAllAsRead()">Mark all as read</button>
        </div>
        
        <div class="notification-list">
          <div *ngIf="notifications.length === 0" class="empty-notifications">
            No notifications
          </div>
          
          <div *ngFor="let notification of notifications" 
               class="notification-item" 
               [class.unread]="!notification.isRead"
               (click)="markAsRead(notification)">
            <div class="notification-content">
              <p>{{ notification.message }}</p>
              <span class="notification-time">{{ formatTime(notification.createdAt) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .notification-bell {
      position: relative;
      cursor: pointer;
      padding: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .notification-badge {
      position: absolute;
      top: 0;
      right: 0;
      background-color: #f44336;
      color: white;
      border-radius: 50%;
      width: 18px;
      height: 18px;
      font-size: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .notification-dropdown {
      position: absolute;
      top: 100%;
      right: 0;
      width: 300px;
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
      z-index: 100;
      overflow: hidden;
    }
    
    .notification-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15px;
      border-bottom: 1px solid #f0f0f0;
    }
    
    .notification-header h3 {
      margin: 0;
      font-size: 16px;
    }
    
    .notification-header button {
      background: none;
      border: none;
      color: #4db6ac;
      cursor: pointer;
      font-size: 12px;
    }
    
    .notification-list {
      max-height: 350px;
      overflow-y: auto;
    }
    
    .empty-notifications {
      padding: 20px;
      text-align: center;
      color: #757575;
      font-style: italic;
    }
    
    .notification-item {
      padding: 15px;
      border-bottom: 1px solid #f0f0f0;
      cursor: pointer;
      transition: background-color 0.2s;
    }
    
    .notification-item:hover {
      background-color: #f9f9f9;
    }
    
    .notification-item.unread {
      background-color: #e3f2fd;
    }
    
    .notification-content p {
      margin: 0 0 5px 0;
      font-size: 14px;
      color: #333;
    }
    
    .notification-time {
      font-size: 12px;
      color: #757575;
    }
  `]
})
export class DoctorNotificationComponent implements OnInit {
  @Input() doctorId!: number;
  
  notifications: DoctorNotification[] = [];
  unreadCount: number = 0;
  showNotifications: boolean = false;
  
  constructor(private notificationService: DoctorNotificationService) {}
  
  ngOnInit(): void {
    this.notificationService.unreadCount$.subscribe(count => {
      this.unreadCount = count;
    });
    
    if (this.doctorId) {
      this.refreshNotifications();
      this.refreshUnreadCount();
    }
  }
  
  ngOnChanges(): void {
    if (this.doctorId) {
      this.refreshNotifications();
      this.refreshUnreadCount();
    }
  }
  
  refreshNotifications(): void {
    this.notificationService.getDoctorNotifications(this.doctorId).subscribe({
      next: (data) => {
        this.notifications = data;
      },
      error: (error) => {
        console.error('Error fetching notifications:', error);
      }
    });
  }
  
  refreshUnreadCount(): void {
    this.notificationService.getUnreadNotificationCount(this.doctorId).subscribe({
      error: (error) => {
        console.error('Error fetching unread count:', error);
      }
    });
  }
  
  toggleNotifications(): void {
    this.showNotifications = !this.showNotifications;
    
    // Load notifications when opening dropdown
    if (this.showNotifications && this.doctorId) {
      this.refreshNotifications();
    }
  }
  
  markAsRead(notification: DoctorNotification): void {
    if (!notification.isRead) {
      this.notificationService.markNotificationAsRead(notification.id).subscribe({
        next: () => {
          notification.isRead = true;
          this.refreshUnreadCount();
        },
        error: (error) => {
          console.error('Error marking notification as read:', error);
        }
      });
    }
  }
  
  markAllAsRead(): void {
    this.notificationService.markAllNotificationsAsRead(this.doctorId).subscribe({
      next: () => {
        this.notifications.forEach(notification => {
          notification.isRead = true;
        });
        this.refreshUnreadCount();
      },
      error: (error) => {
        console.error('Error marking all notifications as read:', error);
      }
    });
  }
  
  formatTime(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.round(diffMs / 60000);
    
    if (diffMins < 1) {
      return 'Just now';
    } else if (diffMins < 60) {
      return `${diffMins} min ago`;
    } else if (diffMins < 1440) {
      return `${Math.floor(diffMins / 60)} hr ago`;
    } else {
      return date.toLocaleDateString();
    }
  }
}