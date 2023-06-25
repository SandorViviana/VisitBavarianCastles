import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { CustomValidators } from 'src/app/helpers/custom-validators';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
})
export class RegisterFormComponent implements OnInit {
  @Input() isVisible: boolean = false;
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter<boolean>();

  registerForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private notificationService: NzNotificationService
  ) {}

  ngOnInit(): void {
    this.initializeEmptyForm();
  }

  initializeEmptyForm(): void {
    const passwordControl = new FormControl('', [
      CustomValidators.passwordValidator(this.authService),
    ]);
    this.registerForm = new FormGroup({
      username: new FormControl('', [
        CustomValidators.usernameValidator(this.authService),
      ]),
      password: passwordControl,
      confirmPassword: new FormControl('', [
        CustomValidators.confirmPasswordValidator(passwordControl),
      ]),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
    });
  }

  onCancel(): void {
    this.registerForm.reset();
    this.closeModal.emit(true);
  }

  onOk(): void {

    const newUser: User = {
      userId: '',
      username: this.username.value,
      password: this.password.value,
      firstName: this.firstName.value,
      lastName: this.lastName.value,
    };

    this.authService.register(newUser).subscribe({
      next: (response) => {
        this.notificationService.success('Successful registration', 'User created successfully! You can login now.', {
          nzPlacement: 'bottomRight'
        });
        this.authService.initializeUsers();
      },
      error: (err) => {
        this.notificationService.error('Error', 'Something went wrong!', {
          nzPlacement: 'bottomRight'
        });
      },
    });

    this.registerForm.reset();
    this.closeModal.emit(true);
  }

  get username(): FormControl {
    return this.registerForm.get('username') as FormControl;
  }

  get password(): FormControl {
    return this.registerForm.get('password') as FormControl;
  }

  get confirmPassword(): FormControl {
    return this.registerForm.get('confirmPassword') as FormControl;
  }

  get firstName(): FormControl {
    return this.registerForm.get('firstName') as FormControl;
  }

  get lastName(): FormControl {
    return this.registerForm.get('lastName') as FormControl;
  }
}

