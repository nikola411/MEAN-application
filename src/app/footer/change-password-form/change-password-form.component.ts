import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-change-password-form',
  templateUrl: './change-password-form.component.html',
  styleUrls: ['./change-password-form.component.css']
})
export class ChangePasswordFormComponent implements OnInit {

  password : FormGroup = new FormGroup({
    newPassword : new FormControl(Validators.required),
    repeat : new FormControl(Validators.required)
  });

  constructor() { }

  ngOnInit(): void {
  }

}
