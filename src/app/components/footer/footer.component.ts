// src/app/components/footer/footer.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-section about">
            <div class="logo-container">
              <svg class="logo-img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#ffffff">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 15h-2v-2h2v2zm0-4h-2V8h2v6z"/>
              </svg>
              <div class="logo-text">Hospitality<span>Hub</span></div>
            </div>
            <p class="about-text">
              HospitalityHub makes healthcare accessible by connecting patients with healthcare providers through a simple, secure booking platform.
            </p>
            <div class="social-icons">
              <a href="#" class="social-icon" aria-label="Facebook">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#ffffff">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 5.013 3.693 9.153 8.505 9.876V14.65H8.031v-2.629h2.474v-1.749c0-2.896 1.411-4.167 3.818-4.167 1.153 0 1.762.085 2.051.124v2.294h-1.642c-1.022 0-1.379.969-1.379 2.061v1.437h2.995l-.406 2.629h-2.588v7.247c4.881-.661 8.646-4.835 8.646-9.873C22 6.477 17.523 2 12 2z"/>
                </svg>
              </a>
              <a href="#" class="social-icon" aria-label="Twitter">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#ffffff">
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                </svg>
              </a>
              <a href="#" class="social-icon" aria-label="Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#ffffff">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
                </svg>
              </a>
              <a href="#" class="social-icon" aria-label="LinkedIn">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#ffffff">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                </svg>
              </a>
            </div>
          </div>
          
          <div class="footer-section links">
            <h3>Quick Links</h3>
            <ul>
              <li><a routerLink="/">Home</a></li>
              <li><a routerLink="/about">About Us</a></li>
              <li><a routerLink="/services">Services</a></li>
              <li><a routerLink="/doctors">Find Doctors</a></li>
              <li><a routerLink="/contact">Contact Us</a></li>
            </ul>
          </div>
          
          <div class="footer-section services">
            <h3>Our Services</h3>
            <ul>
              <li><a routerLink="/services">Appointment Booking</a></li>
              <li><a routerLink="/services">Health Checkups</a></li>
              <li><a routerLink="/services">Specialist Consultations</a></li>
              <li><a routerLink="/services">Emergency Care</a></li>
              <li><a routerLink="/services">Medical Records</a></li>
            </ul>
          </div>
          
          <div class="footer-section contact">
            <h3>Contact Us</h3>
            <ul class="contact-list">
              <li>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#1e88e5">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                <span>123 Healthcare Ave, Medical District, City</span>
              </li>
              <li>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#1e88e5">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
                <span>(555) 123-4567</span>
              </li>
              <li>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#1e88e5">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
                <span>contact.com</span>
              </li>
              <li>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#1e88e5">
                  <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
                </svg>
                <span>Mon-Fri: 8am-7pm, Sat: 9am-5pm</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div class="footer-bottom">
          <div class="footer-legal">
            <a routerLink="/privacy">Privacy Policy</a>
            <a routerLink="/terms">Terms of Service</a>
            <a routerLink="/faq">FAQ</a>
          </div>
          <p class="copyright">
            &copy; {{ currentYear }} HospitalityHub. All rights reserved.
          </p>
        </div>
      </div>
      
      <div class="subscribe-banner">
        <div class="container">
          <div class="subscribe-content">
            <div class="subscribe-text">
              <h3>Stay Updated</h3>
              <p>Subscribe to our newsletter for the latest health tips and hospital news.</p>
            </div>
            <div class="subscribe-form">
              <input type="email" placeholder="Your email address" class="subscribe-input">
              <button class="btn subscribe-btn">Subscribe</button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      background-color: #01579b;
      color: #ffffff;
      padding-top: 60px;
      margin-top: 60px;
    }
    
    .container {
      width: 100%;
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
    }
    
    .footer-content {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 30px;
      padding-bottom: 40px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    /* Logo and About Section */
    .logo-container {
      display: flex;
      align-items: center;
      margin-bottom: 15px;
    }
    
    .logo-img {
      height: 35px;
      margin-right: 10px;
    }
    
    .logo-text {
      font-size: 1.5rem;
      font-weight: 700;
      color: #ffffff;
    }
    
    .logo-text span {
      color: #90caf9;
    }
    
    .about-text {
      margin-bottom: 20px;
      line-height: 1.6;
      opacity: 0.9;
    }
    
    .social-icons {
      display: flex;
      gap: 15px;
    }
    
    .social-icon {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 36px;
      height: 36px;
      background-color: rgba(255, 255, 255, 0.1);
      border-radius: 50%;
      transition: all 0.3s ease;
    }
    
    .social-icon:hover {
      background-color: #1e88e5;
      transform: translateY(-3px);
    }
    
    /* Quick Links and Services Sections */
    .footer-section h3 {
      font-size: 1.2rem;
      font-weight: 600;
      margin-bottom: 20px;
      position: relative;
      padding-bottom: 10px;
    }
    
    .footer-section h3::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 40px;
      height: 2px;
      background-color: #1e88e5;
    }
    
    .footer-section ul {
      list-style: none;
      padding: 0;
    }
    
    .footer-section li {
      margin-bottom: 12px;
    }
    
    .footer-section a {
      color: rgba(255, 255, 255, 0.8);
      text-decoration: none;
      transition: all 0.3s ease;
      position: relative;
      padding-left: 15px;
    }
    
    .footer-section a::before {
      content: '›';
      position: absolute;
      left: 0;
      transition: transform 0.3s ease;
    }
    
    .footer-section a:hover {
      color: #ffffff;
      padding-left: 20px;
    }
    
    .footer-section a:hover::before {
      transform: translateX(5px);
    }
    
    /* Contact Section */
    .contact-list li {
      display: flex;
      align-items: flex-start;
      margin-bottom: 15px;
    }
    
    .contact-list svg {
      margin-right: 10px;
      margin-top: 3px;
      flex-shrink: 0;
    }
    
    .contact-list span {
      line-height: 1.5;
      opacity: 0.9;
    }
    
    /* Footer Bottom */
    .footer-bottom {
      padding: 25px 0;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;
    }
    
    .footer-legal {
      display: flex;
      gap: 20px;
    }
    
    .footer-legal a {
      color: rgba(255, 255, 255, 0.7);
      text-decoration: none;
      font-size: 0.9rem;
      transition: color 0.3s ease;
    }
    
    .footer-legal a:hover {
      color: #ffffff;
    }
    
    .copyright {
      font-size: 0.9rem;
      opacity: 0.7;
    }
    
    /* Subscribe Banner */
    .subscribe-banner {
      background-color: #1565c0;
      padding: 30px 0;
    }
    
    .subscribe-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 20px;
    }
    
    .subscribe-text h3 {
      font-size: 1.3rem;
      margin-bottom: 5px;
    }
    
    .subscribe-text p {
      opacity: 0.9;
      max-width: 450px;
    }
    
    .subscribe-form {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
    }
    
    .subscribe-input {
      padding: 12px 15px;
      min-width: 300px;
      border-radius: 4px;
      border: none;
      outline: none;
      font-size: 0.95rem;
    }
    
    .subscribe-btn {
      padding: 12px 20px;
      background-color: #1e88e5;
      color: white;
      border: none;
      border-radius: 4px;
      font-weight: 600;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }
    
    .subscribe-btn:hover {
      background-color: #0d47a1;
    }
    
    /* Responsive Adjustments */
    @media (max-width: 768px) {
      .footer-content {
        grid-template-columns: 1fr;
        gap: 40px;
      }
      
      .footer-bottom {
        flex-direction: column;
        gap: 15px;
        text-align: center;
      }
      
      .footer-legal {
        justify-content: center;
      }
      
      .subscribe-content {
        flex-direction: column;
        text-align: center;
      }
      
      .subscribe-form {
        flex-direction: column;
        width: 100%;
      }
      
      .subscribe-input {
        min-width: auto;
        width: 100%;
      }
      
      .social-icons {
        justify-content: center;
      }
    }
  `]
})
export class FooterComponent {
  currentYear: number = new Date().getFullYear();
}