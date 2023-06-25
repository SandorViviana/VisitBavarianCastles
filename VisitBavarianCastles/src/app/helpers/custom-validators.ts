import {
    AbstractControl,
    FormControl,
    ValidationErrors,
    ValidatorFn,
    Validators,
  } from '@angular/forms';
  import { AuthService } from '../services/auth.service';
  
  export class CustomValidators {
    public static usernameValidator(authService: AuthService): ValidatorFn {
      return (username: AbstractControl): ValidationErrors | null => {
        if (username.value === null || username.value === '') {
          return { required: true };
        }
  
        if (authService.usernameExists(username.value)) {
          return { usernameExists: true };
        }
  
        if (username.value.length < 3) {
          return { minLength: true };
        }
  
        if (username.value.length > 20) {
          return { maxLength: true };
        }
  
        if (!/[a-zA-Z]{2,}/.test(username.value)) {
          return { containsAtLeastTwoLetters: true };
        }
  
        return null;
      };
    }
  
    public static passwordValidator(authService: AuthService): ValidatorFn {
      return (password: AbstractControl): ValidationErrors | null => {
        if (password.value === null || password.value === '') {
          return { required: true };
        }
  
        if (password.value.length < 8) {
          return { minLength: true };
        }
  
        if (!/[a-zA-Z]{2,}/.test(password.value)) {
          return { containsAtLeastTwoLetters: true };
        }
  
        if (!/[a-z]/.test(password.value)) {
          return { containsLowercaseLetter: true };
        }
        
        if (!/[A-Z]/.test(password.value)) {
          return { containsUppercaseLetter: true };
        }
  
        if (!/\d/.test(password.value)) {
          return { containsDigit: true };
        }
        
        if (!/[!@#$%^&*-+=/\\()~`_[\]{}]/.test(password.value)) {
          return { containsSpecialCharacter: true };
        }
        
        return null;
      };
    }
  
    public static confirmPasswordValidator(initialPassword: AbstractControl | null): ValidatorFn {
      return (confirmPassword: AbstractControl): ValidationErrors | null => {
        if (confirmPassword.value === null || confirmPassword.value === '') {
          return { required: true };
        }
  
        if (confirmPassword.value !== initialPassword?.value) {
          return { passwordsDoNotMatch: true };
        }
  
        return null;
      };
    }

    public static visitDate(control: AbstractControl): ValidationErrors | null {
      const date = control.value as Date;
    
      if (date > new Date()) {
        return { isValidDate: true };
      }
    
      return null;
    }
  }
  