import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm!: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router,
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email, Validators.minLength(5)]],
      password: [
        '', [Validators.required, Validators.minLength(3)]],
    }, { updateOn: 'submit' });
  }

  onSubmit() {
    if (this.loginForm.status === 'VALID') {
      const formValue = this.loginForm.value;
      const myJSON = JSON.stringify(formValue)
      localStorage.setItem('user', myJSON);
      this.router.navigate(['/dashboard/filtros-gerais'])
    }
  }
}
