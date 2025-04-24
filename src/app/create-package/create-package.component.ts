import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminPackageService } from '../admin-dashboard/admin.service';
import { AdminPackage } from '../models/admin.model';


@Component({
  selector: 'app-create-package',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './create-package.component.html',
  styleUrls: ['./create-package.component.scss']
})
export class CreatePackageComponent {
  packageForm: FormGroup;
  isSubmitting = false;
  successMessage = '';
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private packageService: AdminPackageService
  ) {
    this.packageForm = this.fb.group({
      packageName: ['', [Validators.required]],
      packagePrice: [null, [Validators.required, Validators.min(0)]],
      description: [''],
      testType: ['']
    });
  }

  onSubmit(): void {
    if (this.packageForm.valid) {
      this.isSubmitting = true;
      this.successMessage = '';
      this.errorMessage = '';
      
      const packageData: AdminPackage = this.packageForm.value;
      
      this.packageService.createPackage(packageData).subscribe({
        next: (response) => {
          console.log('Success response:', response);
          this.isSubmitting = false;
          this.successMessage = 'Package created successfully!';
          this.packageForm.reset();
        },
        error: (error) => {
          console.error('Error response:', error);
          this.isSubmitting = false;
          this.errorMessage = `Failed to create package: ${error.message || 'Please try again.'}`;
        },
        complete: () => {
          console.log('Request completed');
        }
      });
    } else {
      this.packageForm.markAllAsTouched();
    }
  }
}