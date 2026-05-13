import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-edit-admin',
  templateUrl: './edit-admin.component.html',
  styleUrls: ['./edit-admin.component.css']
})
export class EditAdminComponent implements OnInit, OnChanges {
  @Input() selectedAdmin: any = null;
  @Output() adminUpdated = new EventEmitter<any>();

  editAdminForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.editAdminForm = this.fb.group({
      adminLogin: ['', [Validators.required]],
      adminPassword: [''],
      adminBirthDate: [''],
      isActive: [true]
    });
  }

  ngOnInit() {
    this.updateForm();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedAdmin'] && this.selectedAdmin) {
      this.updateForm();
    }
  }

  updateForm() {
    if (this.selectedAdmin) {
      this.editAdminForm.patchValue({
        adminLogin: this.selectedAdmin.admin_login,
        adminPassword: '',
        adminBirthDate: this.selectedAdmin.admin_birth_date?.split(' ')[0] || '',
        isActive: this.selectedAdmin.is_active_admin == 1 || this.selectedAdmin.is_active_admin === true
      });
    }
  }

  onSubmit() {
    if (this.editAdminForm.valid && this.selectedAdmin) {
      const body: any = {
        admin_login: this.editAdminForm.value.adminLogin,
        is_active_admin: this.editAdminForm.value.isActive
      };
      
      if (this.editAdminForm.value.adminPassword) {
        body.admin_password_hash = this.editAdminForm.value.adminPassword;
      }
      if (this.editAdminForm.value.adminBirthDate) {
        body.admin_birth_date = this.editAdminForm.value.adminBirthDate + ' 00:00:00';
      }

      this.http.put(`/api/admins/${this.selectedAdmin.admin_id}`, body).subscribe({
        next: () => {
          console.log('Админ обновлён');
          this.adminUpdated.emit(true);
        },
        error: (err) => console.error('Ошибка обновления:', err)
      });
    }
  }
}