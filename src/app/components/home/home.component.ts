import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="hero">
      <div class="container">
        <div class="hero-content">
          <h1>Find and Book Medical Appointments with Ease</h1>
          <p>
            HospitalityHub makes it simple to find the right doctor and book appointments online.
            Get the care you need, when you need it.
          </p>
          <div class="hero-buttons">
            <button routerLink="/doctors" class="btn btn-primary">Find a Doctor</button>
            <button routerLink="/about" class="btn btn-outline">Learn More</button>
          </div> 
        </div>
      </div>
    </div>

    <div class="section">
      <div class="container">
        <h2 class="section-title">Our Services</h2>
        <div class="services-grid">
          <div class="card service-card">
            <div class="service-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="#1e88e5">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 2h2v4h-2V5zm-8 8h4v2H4v-2zm4-4h4v2H8V9zm8 0h4v2h-4V9zm0 4h4v2h-4v-2z"/>
              </svg>
            </div>
            <h3>Appointment Booking</h3>
            <p>Book appointments with specialists online without the need for phone calls or waiting.</p>
          </div>
          <div class="card service-card">
            <div class="service-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="#1e88e5">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/>
              </svg>
            </div>
            <h3>Doctor Consultations</h3>
            <p>Get consultations from experienced medical professionals across various specializations.</p>
          </div>
          <div class="card service-card">
            <div class="service-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="#1e88e5">
                <path d="M17 20H7c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2zm0-14H7v2h10V6zm0 4H7v2h10v-2zm0 4H7v2h10v-2z"/>
              </svg>
            </div>
            <h3>Medical Records</h3>
            <p>Access and manage your medical records securely through our platform at any time.</p>
          </div>
        </div>
      </div>
    </div>

    <div class="section testimonials-section">
      <div class="container">
        <h2 class="section-title">What Our Patients Say</h2>
        <div class="testimonials-grid">
          <div class="card testimonial-card">
            <div class="testimonial-avatar">
            </div>
            <div class="testimonial-content">
              <div class="testimonial-stars">
                <span>★★★★★</span>
              </div>
              <p class="testimonial-text">"HospitalityHub made finding a specialist so easy. I booked an appointment with a cardiologist within minutes and received excellent care."</p>
              <p class="testimonial-author">- Sarah Johnson</p>
            </div>
          </div>
          <div class="card testimonial-card">
            <div class="testimonial-avatar">
            </div>
            <div class="testimonial-content">
              <div class="testimonial-stars">
                <span>★★★★★</span>
              </div>
              <p class="testimonial-text">"The platform is user-friendly and efficient. I appreciate being able to see doctor availability in real-time and schedule appointments that work with my busy schedule."</p>
              <p class="testimonial-author">- Michael Chen</p>
            </div>
          </div>
          <div class="card testimonial-card">
            <div class="testimonial-avatar">
            </div>
            <div class="testimonial-content">
              <div class="testimonial-stars">
                <span>★★★★☆</span>
              </div>
              <p class="testimonial-text">"I've been using HospitalityHub for all my family's medical appointments. The reminder system ensures we never miss an appointment."</p>
              <p class="testimonial-author">- Olivia Rodriguez</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="section cta-section">
      <div class="container">
        <div class="cta-content">
          <h2>Ready to Book Your Appointment?</h2>
          <p>Join thousands of patients who have simplified their healthcare journey with HospitalityHub.</p>
          <button routerLink="/auth/signup" class="btn btn-primary cta-button">Get Started Today</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .hero {
      background-color: #1e88e5;
      color: white;
      padding: 5rem 0;
      margin-bottom: 2rem;
    }
    
    .hero-content {
      max-width: 600px;
    }
    
    .hero h1 {
      font-size: 2.5rem;
      margin-bottom: 1.5rem;
      font-weight: 700;
    }
    
    .hero p {
      font-size: 1.2rem;
      margin-bottom: 2rem;
      opacity: 0.9;
    }
    
    .hero-buttons {
      display: flex;
      gap: 1rem;
    }
    
    .hero .btn-outline {
      color: white;
      border-color: white;
    }
    
    .hero .btn-outline:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }
    
    .services-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 2rem;
      margin-top: 2rem;
    }
    
    .service-card {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      padding: 2rem;
    }
    
    .service-icon {
      margin-bottom: 1.5rem;
      background-color: rgba(30, 136, 229, 0.1);
      width: 80px;
      height: 80px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .service-card h3 {
      color: #01579b;
      margin-bottom: 1rem;
      font-size: 1.4rem;
    }
    
    .service-card p {
      color: #546e7a;
      line-height: 1.6;
    }
    
    /* Testimonials Section */
    .testimonials-section {
      background-color: #f0f7ff;
    }
    
    .testimonials-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: 2rem;
      margin-top: 2rem;
    }
    
    .testimonial-card {
      display: flex;
      flex-direction: column;
      padding: 1.5rem;
    }
    
    .testimonial-avatar {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      overflow: hidden;
      margin-bottom: 1rem;
    }
    
    .testimonial-avatar img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    
    .testimonial-stars {
      color: #ffc107;
      margin-bottom: 0.5rem;
      font-size: 1.2rem;
    }
    
    .testimonial-text {
      font-style: italic;
      color: #37474f;
      margin-bottom: 1rem;
      line-height: 1.6;
    }
    
    .testimonial-author {
      font-weight: 600;
      color: #01579b;
    }
    
    /* CTA Section */
    .cta-section {
      background-color: #01579b;
      color: white;
      text-align: center;
    }
    
    .cta-content {
      max-width: 700px;
      margin: 0 auto;
    }
    
    .cta-content h2 {
      font-size: 2rem;
      margin-bottom: 1rem;
    }
    
    .cta-content p {
      font-size: 1.1rem;
      margin-bottom: 2rem;
      opacity: 0.9;
    }
    
    .cta-button {
      background-color: white;
      color: #01579b;
      font-size: 1.1rem;
      padding: 0.8rem 2rem;
    }
    
    .cta-button:hover {
      background-color: rgba(255, 255, 255, 0.9);
    }
    
    /* Responsive adjustments */
    @media (max-width: 768px) {
      .hero {
        padding: 3rem 0;
      }
      
      .hero h1 {
        font-size: 2rem;
      }
      
      .hero-buttons {
        flex-direction: column;
        gap: 1rem;
      }
      
      .hero-buttons .btn {
        width: 100%;
      }
      
      .testimonials-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class HomeComponent {
  constructor() {}
}