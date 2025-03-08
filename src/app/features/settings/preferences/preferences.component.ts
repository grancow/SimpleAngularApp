import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.scss'],
})
export class PreferencesComponent {
  preferencesForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.preferencesForm = this.fb.group({
      darkMode: [false],
      emailNotifications: [true],
      language: ['pl'],
    });
  }

  onSubmit() {
    if (this.preferencesForm.valid) {
      console.log('Zapisano preferencje:', this.preferencesForm.value);
      // Tutaj będzie logika zapisywania preferencji
    }
  }
}
