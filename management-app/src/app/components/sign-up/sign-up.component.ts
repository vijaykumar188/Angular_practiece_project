import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApiServiceService } from 'src/app/service/api-service.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
 
  
    constructor(private router: Router, private snackbar: MatSnackBar,private apiService:ApiServiceService) { }
  
  
    email: any;
    password: any;
    name: any
    phone: any
  
    isValidEmail(email: string): boolean {
      const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
      return emailRegex.test(email);
    }
  
    isValidPassword(password: any): boolean {
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      return passwordRegex.test(password);
    }
  
    formValidate() {
      if (this.isValidEmail(this.email) === true && this.isValidPassword(this.password) === true && this.name && this.phone) {
        return false;
      } else {
        return true;
      }
    }
  
  
    signUpClick() {
      const payload = {
        "email": this.email,
        "password": this.password,
        "name": this.name,
        "phone": this.phone
      }

      console.log(payload);
      
      this.apiService.updateUsersData(payload).subscribe(res => {
        console.log(res);
        
      })
      localStorage.setItem('userEmail', this.email);
      localStorage.setItem('userpassword', this.password);
      localStorage.setItem('userName', this.name);
      // Swal.fire('User Added', 'User Added Succesfully', 'success')
      this.snackbar.open('User Added Succesfully', '', { panelClass: 'snackbar', duration: 3000, verticalPosition: 'top' })
      this.reset();
    }
  
    loginClick() {
      this.router.navigate(['/login'])
    }
  
    reset() {
      this.email = ''
      this.password = ''
      this.phone = ''
      this.name = ''
    }
  
  
  
  
}
