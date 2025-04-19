// custom-date-picker.directive.ts
import { Directive, ElementRef, Input, OnInit, OnChanges, SimpleChanges, 
    Output, EventEmitter, HostListener, Renderer2 } from '@angular/core';
  import { NgControl } from '@angular/forms';
  
  @Directive({
    selector: '[appCustomDatePicker]',
    standalone: true
  })
  export class CustomDatePickerDirective implements OnInit, OnChanges {
    @Input() availableDates: string[] = [];
    @Input() unavailableDates: string[] = [];
    @Input() minDate: string = '';
    @Output() dateSelected = new EventEmitter<string>();
    
    private calendarContainer: HTMLElement | null = null;
    private selectedDate: Date | null = null;
    
    constructor(
      private el: ElementRef,
      private renderer: Renderer2,
      private ngControl: NgControl
    ) {}
  
    ngOnInit(): void {
      // Hide the native calendar picker
      this.hideNativeCalendarPicker();
      
      // Add click listener to open custom calendar
      this.renderer.listen(this.el.nativeElement, 'click', (event) => {
        event.preventDefault();
        this.openCustomCalendar();
      });
    }
  
    ngOnChanges(changes: SimpleChanges): void {
      // Update calendar if already open and dates change
      if ((changes['availableDates'] || changes['unavailableDates']) && this.calendarContainer) {
        this.renderCalendarDays();
      }
    }
  
    @HostListener('document:click', ['$event'])
    onClick(event: MouseEvent): void {
      // Close calendar if clicking outside
      if (this.calendarContainer && 
          !this.calendarContainer.contains(event.target as Node) && 
          event.target !== this.el.nativeElement) {
        this.closeCustomCalendar();
      }
    }
  
    private hideNativeCalendarPicker(): void {
      // Add a transparent overlay to prevent native calendar from opening
      this.renderer.setStyle(this.el.nativeElement, '-webkit-calendar-picker-indicator', 'opacity: 0');
      this.renderer.setStyle(this.el.nativeElement, 'cursor', 'pointer');
    }
  
    private openCustomCalendar(): void {
      // Close existing calendar if open
      if (this.calendarContainer) {
        this.closeCustomCalendar();
        return;
      }
  
      // Create calendar container
      this.calendarContainer = this.renderer.createElement('div');
      this.renderer.addClass(this.calendarContainer, 'custom-calendar-container');
      this.renderer.addClass(this.calendarContainer, 'visible');
      
      // Position the calendar
      const inputRect = this.el.nativeElement.getBoundingClientRect();
      this.renderer.setStyle(this.calendarContainer, 'top', `${inputRect.bottom + window.scrollY}px`);
      this.renderer.setStyle(this.calendarContainer, 'left', `${inputRect.left + window.scrollX}px`);
      
      // Get current date from the input
      const currentValue = this.ngControl.value;
      this.selectedDate = currentValue ? new Date(currentValue) : new Date();
      
      // Create calendar header
      const calendarHeader = this.createCalendarHeader();
      this.renderer.appendChild(this.calendarContainer, calendarHeader);
      
      // Create calendar days
      const calendarDays = this.renderer.createElement('div');
      this.renderer.addClass(calendarDays, 'calendar-days');
      this.renderer.appendChild(this.calendarContainer, calendarDays);
      
      // Add day names (Mon, Tue, etc.)
      this.addDayNames(calendarDays);
      
      // Render calendar days
      this.renderCalendarDays();
      
      // Append calendar to body
      this.renderer.appendChild(document.body, this.calendarContainer);
    }
  
    private createCalendarHeader(): HTMLElement {
      const header = this.renderer.createElement('div');
      this.renderer.addClass(header, 'calendar-header');
      
      // Month display
      const monthDisplay = this.renderer.createElement('div');
      this.renderer.addClass(monthDisplay, 'calendar-month');
      const monthYear = this.formatMonthYear(this.selectedDate!);
      this.renderer.appendChild(monthDisplay, this.renderer.createText(monthYear));
      this.renderer.appendChild(header, monthDisplay);
      
      // Navigation buttons
      const navContainer = this.renderer.createElement('div');
      this.renderer.addClass(navContainer, 'calendar-nav');
      
      // Previous month button
      const prevBtn = this.renderer.createElement('button');
      this.renderer.addClass(prevBtn, 'calendar-nav-btn');
      this.renderer.appendChild(prevBtn, this.renderer.createText('←'));
      this.renderer.listen(prevBtn, 'click', () => this.navigateMonth(-1));
      this.renderer.appendChild(navContainer, prevBtn);
      
      // Next month button
      const nextBtn = this.renderer.createElement('button');
      this.renderer.addClass(nextBtn, 'calendar-nav-btn');
      this.renderer.appendChild(nextBtn, this.renderer.createText('→'));
      this.renderer.listen(nextBtn, 'click', () => this.navigateMonth(1));
      this.renderer.appendChild(navContainer, nextBtn);
      
      this.renderer.appendChild(header, navContainer);
      
      return header;
    }
  
    private addDayNames(container: HTMLElement): void {
      const dayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
      dayNames.forEach(day => {
        const dayEl = this.renderer.createElement('div');
        this.renderer.addClass(dayEl, 'calendar-day-name');
        this.renderer.appendChild(dayEl, this.renderer.createText(day));
        this.renderer.appendChild(container, dayEl);
      });
    }
// Fix for the custom-date-picker.directive.ts file

private renderCalendarDays(): void {
    if (!this.calendarContainer) return;
    
    // Clear existing days
    const daysContainer = this.calendarContainer.querySelector('.calendar-days');
    if (!daysContainer) return;
    
    // Remove old dates (but keep day names)
    const dayNames = Array.from(daysContainer.querySelectorAll('.calendar-day-name'));
    while (daysContainer.firstChild) {
      this.renderer.removeChild(daysContainer, daysContainer.firstChild);
    }
    
    // Re-add day names
    dayNames.forEach(dayName => {
      this.renderer.appendChild(daysContainer, dayName);
    });
    
    // Get the first day of the current month
    const currentDate = new Date(this.selectedDate!);
    currentDate.setDate(1);
    
    // Get the first day of the week (0 = Sunday, 1 = Monday, etc.)
    const firstDayOfWeek = currentDate.getDay();
    
    // Create empty cells for days before the first day of the month
    // Make sure firstDayOfWeek is valid (between 0 and 6)
    const safeDayOfWeek = Math.max(0, Math.min(6, firstDayOfWeek));
    
    for (let i = 0; i < safeDayOfWeek; i++) {
      const emptyCell = this.renderer.createElement('div');
      this.renderer.addClass(emptyCell, 'calendar-date');
      this.renderer.addClass(emptyCell, 'disabled');
      this.renderer.appendChild(daysContainer, emptyCell);
    }
    
    // Rest of your code...
  }
  
    private navigateMonth(direction: number): void {
      if (!this.selectedDate) return;
      
      // Create a new date to navigate to the previous/next month
      const newDate = new Date(this.selectedDate);
      newDate.setMonth(newDate.getMonth() + direction);
      this.selectedDate = newDate;
      
      // Update the month display
      const monthDisplay = this.calendarContainer!.querySelector('.calendar-month');
      if (monthDisplay) {
        this.renderer.setProperty(monthDisplay, 'textContent', this.formatMonthYear(newDate));
      }
      
      // Re-render calendar days
      this.renderCalendarDays();
    }
  
    private selectDate(date: Date): void {
      this.selectedDate = date;
      
      // Format the date as YYYY-MM-DD for the input
      const formattedDate = this.formatDate(date);
      
      // Update the input value
      this.ngControl.control?.setValue(formattedDate);
      this.dateSelected.emit(formattedDate);
      
      // Close the calendar
      this.closeCustomCalendar();
    }
  
    private closeCustomCalendar(): void {
      if (this.calendarContainer) {
        this.renderer.removeChild(document.body, this.calendarContainer);
        this.calendarContainer = null;
      }
    }
  
    private formatDate(date: Date): string {
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      return `${year}-${month}-${day}`;
    }
  
    private formatMonthYear(date: Date): string {
      return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    }
  }