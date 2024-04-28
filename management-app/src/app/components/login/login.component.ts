import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApiServiceService } from 'src/app/service/api-service.service';
// import { AuthService } from 'src/app/service/auth.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private router: Router, private snackbar: MatSnackBar, private apiService: ApiServiceService) { }

  email: any;
  password: any;
  errorMessage!: string;


  isValidEmail(email: string): boolean {
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
    return emailRegex.test(email);
  }

  isValidPassword(password: any): boolean {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  }

  clickSignup() {
    this.router.navigate(['/signup'])
  }

  formValidate() {
    if (this.isValidEmail(this.email) === true && this.password) {
      return false;
    } else {
      return true;
    }
  }

  login() {
    this.apiService.getUsersData().subscribe(res => {
      const users = res.find((a: any) => {
        return a.email === this.email && a.password === this.password
      })
      if (users) {
        this.router.navigate(['/dashboard'])
        Swal.fire('Logged In', 'Login succesfully', 'success')
        this.reset()
      } else {
        Swal.fire('Invllid passsword')
        this.reset();
      }
    })
  }


  reset() {
    this.email = ''
    this.password = ''
  }



}