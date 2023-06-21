import { Component, OnDestroy, OnInit } from '@angular/core';

import { AbstractControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { Subscription } from 'rxjs';
import { getmoderatorsDocument } from '../interface/getmoderators';
import { AuthService } from '../services/auth.service';
import { ModeratorService } from '../services/moderator.service';
import * as moment from 'moment';

@Component({
  templateUrl: './admin-moderator.component.html',
  styleUrls: ['./admin-moderator.component.css'],
})
export class AdminModeratorComponent implements OnInit, OnDestroy {
  hideinnerspinner: boolean = false;
  hidesimilarmodal: boolean = false;
  hidespinner: boolean = false;
  moderators: getmoderatorsDocument[] = [];
  filtedmoderators: getmoderatorsDocument[] = [];
  userDetails!: any;

  hidemodal: boolean = false;
  hideinnermodal: boolean = false;
  errorMessage: string = '';
  sub!: Subscription;
  form = new FormGroup({});
  model = { email: '', name: '', phone: '' };
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
          template: `<strong class="#1C3738">Name</strong>
          `,
          className: 'text-[#1C3738] md:ml-0 ml-[5%] mt-5 font-medium',
        },
        {
          className:
            'w-[90%] mx-[5%] md:mx-0 md:w-[500px] h-[50px] rounded-[5px] bg-white pl-4 border-[1px] border-solid border-[#E4E6EE] kk',
          type: 'input',
          key: 'name',
          templateOptions: {
            label: 'Name',
            placeholder: 'input moderator name',
            required: true,
            type: 'text',
          },
          validation: {
            messages: {
              required: 'Name is required',
            },
          },
        },
      ],
    },
    {
      fieldGroupClassName: 'flex justify-between items-start gap-3 flex-col',
      fieldGroup: [
        {
          template: `<strong class="#1C3738">Email Address </strong>`,
          className: 'text-[#1C3738] md:ml-0 ml-[5%] mt-10 font-medium',
        },
        {
          className:
            'w-[90%] mx-[5%] md:mx-0 md:w-[500px] h-[50px] rounded-[5px] bg-white pl-4 border-[1px] border-solid border-[#E4E6EE] ',
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
          template: `<strong class="#1C3738">Phone Number </strong>`,
          className: 'text-[#1C3738] md:ml-0 ml-[5%] mt-10 font-medium',
        },
        {
          className:
            'w-[90%] mx-[5%] md:mx-0 md:w-[500px] h-[50px] rounded-[5px] bg-white pl-4 border-[1px] border-solid border-[#E4E6EE] ',
          key: 'phone',
          type: 'input',
          templateOptions: {
            label: 'Phone number',
            placeholder: 'input moderator Phone number',
            required: true,
            type: 'text',
          },
          validation: {
            messages: {
              required: 'Phone Number is required',
            },
          },
        },
      ],
    },
  ];
  constructor(
    private authService: AuthService,
    private moderatorService: ModeratorService,
    private route: Router
  ) {}

  ngOnInit(): void {
   
    let token = this.authService.decodeToken();
    if (token) {
      this.userDetails = token;
    console.log(this.userDetails = token)
    }
    

    this.getallModerators();
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
  getallModerators() {
    this.sub = this.moderatorService.getAllModerator().subscribe({
      next: (moderators) => {
        this.moderators = moderators;
        const indexOfObject = this.moderators.findIndex((object) => {
          return object.email === this.userDetails.email;
        });
        if (indexOfObject !== -1) {
          this.moderators.splice(indexOfObject, 1);
        }

        this.hideinnerspinner = false;
       
      },

      error: (err) => (this.errorMessage = err),
    });
  }
  onSubmit() {
    if (this.form.valid) {

      this.hidespinner = true;
      this.moderatorService
        .createNewModerator(this.model.name, this.model.email, this.model.phone)
        .subscribe({
          next: (data: any) => {
           this.hidemodal = false;
            this.hideinnermodal = true;
          },
          error: (err) => {
            this.errorMessage = err;
            alert(err);
          },
        });
    }
  }

  deleteModerator(id: string) {
    this.moderatorService.deleteModerator(id).subscribe((data: void) => {
      let index: number = this.moderators.findIndex(
        (moderator) => moderator.id === id
      );
      this.moderators.slice(index, 1);

      this.hidesimilarmodal = true;
    });
    this.hideinnerspinner = true;
  }
  hideModal() {
    this.hidemodal = true;
    this.hidespinner = false;
  }
  dismissModal() {
    this.hidemodal = false;
  }

  dismissInnerModal() {
    this.hidemodal = false;
    this.hideinnermodal = false;
    this.hideinnerspinner = true;
    this.ngOnInit();
  }

  onlogout(): void {
    this.authService.logout();
    this.route.navigate(['/login']);
  }
  closeSimilarModal() {
    this.hidesimilarmodal = false;
    this.hideinnerspinner = true;
    this.ngOnInit();
  }
}
