import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  @Input() isVisible: boolean = false;
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter<boolean>();

  loginForm!: FormGroup;  

  constructor(private authService: AuthService, private notificationService: NzNotificationService, private router: Router) { }

  ngOnInit(): void {
    this.initializeEmptyForm();
  }

  initializeEmptyForm(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      rememberMe: new FormControl(false)
    });
  }

  onCancel(): void {
    this.loginForm.reset();
    this.closeModal.emit(true);
  }

  onOk(): void {
    let logInResult = this.authService.logIn(this.username.value, this.password.value, this.rememberMe.value);
    if (logInResult) {
      this.notificationService.success('Success', 'You have successfully logged in!', {
        nzPlacement: 'bottomRight'
      });

      this.router.navigate(['/dashboard', this.username.value]).catch(error => {
        console.error('An error occurred during navigation:', error);
      });
    } else {
      this.notificationService.error('Error', 'Invalid username or password!', {
        nzPlacement: 'bottomRight'
      });
      this.authService.setCurrentUser(null);
    }
    this.loginForm.reset();
    this.closeModal.emit(true);
  }

  get username(): FormControl {
    return this.loginForm.get('username') as FormControl;
  }

  get password(): FormControl {
    return this.loginForm.get('password') as FormControl;
  }

  get rememberMe(): FormControl {
    return this.loginForm.get('rememberMe') as FormControl;
  }

}
