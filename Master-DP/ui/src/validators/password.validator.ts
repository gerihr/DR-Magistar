import { AbstractControl, ValidatorFn } from '@angular/forms';

// Функция за създаване на валидатор за парола
export function passwordValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    const value = control.value;
    
    // Проверка за минимална дължина
    const hasMinLength = value && value.length >= 8;
    
    // Проверка за наличието на малки и големи букви
    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    
    // Проверка за наличието на цифри
    const hasDigit = /\d/.test(value);
    
    // Проверка за наличието на специални символи
    const hasSpecialChar = /[!\"?$%^&()]/.test(value);
    
    // Проверка дали всички изисквания са изпълнени
    const isValid = hasMinLength && hasUpperCase && hasLowerCase && hasDigit && hasSpecialChar;

    // Връщане на грешка ако не е валидно, или null ако е валидно
    return !isValid ? { 'passwordStrength': true } : null;
  };
}
