import { Component, inject, output } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ManagerService } from '../../services/manager.service';
@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
})
export class FormComponent {
  private managerService = inject(ManagerService);
  selectedFile: File | null = null;
  closeForm = output<boolean>();
  form = new FormGroup({
    productName: new FormControl('', {
      validators: [Validators.required],
    }),

    category: new FormControl('', {
      validators: [Validators.required],
    }),
    brand: new FormControl('', {
      validators: [Validators.required],
    }),

    quantity: new FormControl('0', {
      validators: [Validators.required],
    }),
    price: new FormControl('0', {
      validators: [Validators.required],
    }),
    description: new FormControl('', {
      validators: [Validators.required],
    }),
    image: new FormControl('', {
      validators: [Validators.required],
    }),

    role: new FormControl<
      'student' | 'teacher' | 'employee' | 'founder' | 'other'
    >('student', {
      validators: [Validators.required],
    }),
    source: new FormArray([
      new FormControl(false),
      new FormControl(false),
      new FormControl(false),
    ]),
    agree: new FormControl(false, { validators: [Validators.required] }),
  });
  onSubmit() {
    if (this.form.invalid || !this.selectedFile || !this.form) {
      console.log('invalid form');
      return;
    }

    const productName = this.form.value.productName
      ?.split(' ') // Split the string into words
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize the first letter of each word
      .join(' '); // Join the words back into a string;
    const description = this.form.get('description')?.value; // Add description
    const price = this.form.get('price')?.value; // Add price
    const quantity = this.form.get('quantity')?.value; // Add quantity
    const inventoryStatus =
      quantity === '0' || ''
        ? 'Out Of Stock'
        : this.form.get('inventoryStatus')?.value || 'In Stock'; // Default value if not set
    const category = this.form
      .get('category')
      ?.value?.split(' ') // Split the string into words
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize the first letter of each word
      .join(' '); // Join the words back into a string; // Add category

    const formData = new FormData();
    formData.append('name', productName ? productName : '');
    formData.append('description', description ? description : '');
    formData.append('price', price ? price : '');
    formData.append('quantity', quantity ? quantity : '');
    formData.append('inventoryStatus', inventoryStatus ? inventoryStatus : '');
    formData.append('category', category ? category : '');
    formData.append('image', this.selectedFile); // Append the file

    this.managerService.postCommodity(formData).subscribe({
      next: (res) => window.location.reload(),
    });
  }
  onReset() {
    this.form.reset();
  }
  onClose() {
    this.closeForm.emit(false);
  }
  onFormClick(event: Event) {
    event.stopPropagation(); // Prevents the click event from reaching the parent div
  }
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0]; // Access the selected file
    }
  }
}
