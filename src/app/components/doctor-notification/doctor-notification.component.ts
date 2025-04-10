// src/app/components/doctor/doctor-notification/doctor-notification.component.ts
import { Component, OnInit, OnDestroy, Input, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription, interval } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { DoctorNotification, DoctorNotificationService } from './doctor-notification.service';

@Component({
  selector: 'app-doctor-notification',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="notification-container">
      <div class="notification-bell" (click)="toggleNotifications($event)">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
          <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
        </svg>
        <span *ngIf="unreadCount > 0" class="notification-badge">{{ unreadCount }}</span>
      </div>
      
      <div class="notification-dropdown" *ngIf="showNotifications">
        <div class="notification-header">
          <h3>Notifications</h3>
          <button *ngIf="notifications.length > 0" (click)="markAllAsRead()" class="mark-all-read">
            Mark all as read
          </button>
        </div>
        
        <div class="notification-list" *ngIf="notifications.length > 0; else noNotifications">
          <div 
            *ngFor="let notification of notifications" 
            class="notification-item"
            [class.unread]="!notification.isRead"
            (click)="markAsRead(notification.id)"
          >
            <div class="notification-content">
              <p>{{ notification.message }}</p>
              <span class="notification-time">{{ formatTime(notification.createdAt) }}</span>
            </div>
          </div>
        </div>
        
        <ng-template #noNotifications>
          <div class="no-notifications">
            <p>No notifications yet</p>
          </div>
        </ng-template>
      </div>
    </div>
  `,
  styles: [`
    .notification-container {
      position: relative;
    }
    
    .notification-bell {
      position: relative;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 8px;
      color: #01579b;
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
      font-size: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .notification-dropdown {
      position: absolute;
      top: 100%;
      right: 0;
      width: 320px;
      max-height: 400px;
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
      z-index: 1000;
      overflow: hidden;
    }
    
    .notification-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 16px;
      border-bottom: 1px solid #e0e0e0;
    }
    
    .notification-header h3 {
      margin: 0;
      color: #01579b;
      font-size: 16px;
    }
    
    .mark-all-read {
      background: none;
      border: none;
      color: #4db6ac;
      cursor: pointer;
      font-size: 13px;
      padding: 0;
    }
    
    .notification-list {
      max-height: 350px;
      overflow-y: auto;
    }
    
    .notification-item {
      padding: 12px 16px;
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
      color: #333;
      font-size: 14px;
    }
    
    .notification-time {
      font-size: 12px;
      color: #757575;
    }
    
    .no-notifications {
      padding: 30px 16px;
      text-align: center;
      color: #757575;
    }
  `]
})
export class DoctorNotificationComponent implements OnInit, OnDestroy {
  @Input() doctorId: number = 0;
  notifications: DoctorNotification[] = [];
  unreadCount: number = 0;
  showNotifications: boolean = false;
  private subscriptions: Subscription = new Subscription();
  private refreshInterval: Subscription = new Subscription();
  
  constructor(
    private notificationService: DoctorNotificationService
  ) {}
  
  ngOnInit(): void {
    // Subscribe to unread count changes
    this.subscriptions.add(
      this.notificationService.unreadCount$.subscribe(count => {
        this.unreadCount = count;
      })
    );
    
    // Initial load of notifications and count
    this.loadInitialData();
    
    // Set up polling to check for new notifications (every 30 seconds)
    this.setupPolling();
  }
  
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    this.refreshInterval.unsubscribe();
  }
  
  toggleNotifications(event: Event): void {
    event.stopPropagation(); // Prevent event from bubbling up to document click handler
    this.showNotifications = !this.showNotifications;
    
    // If opening notifications, refresh them
    if (this.showNotifications) {
      this.loadNotifications();
    }
  }
  
  loadInitialData(): void {
    if (this.doctorId > 0) {
      // Get notification count
      this.notificationService.getUnreadNotificationCount(this.doctorId).subscribe({
        next: (response) => {
          console.log('Initial notification count:', response.count);
        },
        error: (error) => {
          console.error('Error loading notification count:', error);
        }
      });
      
      // Get notifications
      this.loadNotifications();
    }
  }
  
  setupPolling(): void {
    if (this.doctorId > 0) {
      this.refreshInterval = interval(30000).pipe(
        switchMap(() => this.notificationService.getUnreadNotificationCount(this.doctorId))
      ).subscribe({
        next: (response) => {
          console.log('Updated notification count from polling:', response.count);
        },
        error: (error) => {
          console.error('Error in polling:', error);
        }
      });
    }
  }
  
  loadNotifications(): void {
    if (this.doctorId <= 0) return;
    
    this.notificationService.getDoctorNotifications(this.doctorId).subscribe({
      next: (data) => {
        this.notifications = data;
      },
      error: (error) => {
        console.error('Error loading notifications:', error);
      }
    });
  }
  
  markAsRead(notificationId: number): void {
    this.notificationService.markNotificationAsRead(notificationId).subscribe({
      next: () => {
        // Update local state to mark notification as read
        const notification = this.notifications.find(n => n.id === notificationId);
        if (notification) {
          notification.isRead = true;
        }
      },
      error: (error) => {
        console.error('Error marking notification as read:', error);
      }
    });
  }
  
  markAllAsRead(): void {
    if (this.doctorId <= 0) return;
    
    this.notificationService.markAllNotificationsAsRead(this.doctorId).subscribe({
      next: () => {
        // Update local state to mark all notifications as read
        this.notifications.forEach(notification => {
          notification.isRead = true;
        });
      },
      error: (error) => {
        console.error('Error marking all notifications as read:', error);
      }
    });
  }
  
  formatTime(timestamp: string): string {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    
    // Less than a minute
    if (diff < 60000) {
      return 'Just now';
    }
    
    // Less than an hour
    if (diff < 3600000) {
      const minutes = Math.floor(diff / 60000);
      return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
    }
    
    // Less than a day
    if (diff < 86400000) {
      const hours = Math.floor(diff / 3600000);
      return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
    }
    
    // Less than a week
    if (diff < 604800000) {
      const days = Math.floor(diff / 86400000);
      return `${days} ${days === 1 ? 'day' : 'days'} ago`;
    }
    
    // Format as date
    return date.toLocaleDateString();
  }
  
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const notificationContainer = document.querySelector('.notification-container');
    
    if (notificationContainer && !notificationContainer.contains(target)) {
      this.showNotifications = false;
    }
  }
}