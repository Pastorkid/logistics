import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css'],
})
export class AdminLoginComponent implements OnInit {
  hidesimilarmodal: boolean = false;
  errorMessage: string = '';
  login: boolean = false;
  sub!: Subscription;
  form = new FormGroup({});
  model = { email: '', password: '' };
  options: FormlyFormOptions = {
    formState: {
      awesomeIsForced: false,
    },
  };
  error!: { state: string; message: string };
  // Configuration of Formly formfield
  fields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName:
        'flex justify-between items-start gap-3 flex-col w-full',
      fieldGroup: [
        {
          template: `<strong>Email</strong>
          `,
          className: 'text-[#1C3738] md:ml-0 ml-[5%] mt-5 font-medium',
        },
        {
          className:
            'w-[90%] mx-[5%] md:mx-0 md:w-[400px] h-[50px] rounded-[5px] bg-white pl-4 border-[1.5px] border-solid border-[#82C09A] kk',
          type: 'input',
          key: 'email',
          templateOptions: {
            label: 'Email',
            placeholder: 'Enter your email',
            required: true,
            type: 'email',
          },
          validation: {
            messages: {
              required: 'Email is required',
            },
          },
          validators: {
            email: {
              expression: (c: AbstractControl) =>
                !c.value ||
                /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(
                  c.value
                ),
              message: (error: any, field: FormlyFieldConfig) =>
                `"${field.formControl!.value}" is not a valid Email Address`,
            },
          },
        },
      ],
    },
    {
      fieldGroupClassName: 'flex justify-between items-start gap-3 flex-col',
      fieldGroup: [
        {
          template: `<strong>Password</strong>`,
          className: 'text-[#1C3738] md:ml-0 ml-[5%] mt-10 font-medium',
        },
        {
          className:
            'w-[90%] mx-[5%] md:mx-0 md:w-[400px] h-[50px] rounded-[5px] bg-white pl-4 border-[1.5px] border-solid border-[#82C09A] ',
          key: 'password',
          type: 'input',
          templateOptions: {
            label: 'Password',
            placeholder: 'Enter your password',
            required: true,
            type: 'password',
          },
          validation: {
            messages: {
              required: 'password is required',
            },
          },
        },
      ],
    },
  ];
  constructor(private authService: AuthService, private route: Router) {}
  ngOnInit(): void {}

  onSubmit() {
    this.login = true;
    if (this.form.valid) {
      this.authService
        .login({
          email: this.model.email,
          password: this.model.password,
        })
        .subscribe({
          next: (value: any) => {
            this.route.navigate(['/board']);
          },
          error: (err) => {
            if (err) {
              this.login = false;
            }
            this.errorMessage = err;
            console.log(this.errorMessage)
            this.hidesimilarmodal = true;
          },
        });
    }
  }
  closeSimilarModal() {
    this.hidesimilarmodal = false;
    this.login = false;
  }
}
