import { Component } from '@angular/core';
import { HttpService } from './http.service';
import { FormControl, FormGroup, FormBuilder, Form, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  user = {
    id: 1,
    name: 'ferianto',
    role: 'Super Admin',
    isColored: true
  }

  formUser = new FormGroup({
    firstname: new FormControl('', Validators.min(2)),
    lastName: new FormControl('')
  })

  constructor(private httpService: HttpService, private fb: FormBuilder) {

  }

  tester = new FormControl('');

  showUser: boolean = false;

  // post: any = this.httpService.getRequest('https://d7dd-116-254-103-53.ngrok.io/todos');

  Date = new Date();



  // event(): any {
  //   this.httpService.getRequest('https://d7dd-116-254-103-53.ngrok.io/todos').subscribe((response) => {
  //     // this.post = response
  //   });
  // }

  ngOnInit() {

    // this.event()
  }

  eventListener(event: any) {
    console.log(event)
  }

  eventClick(): void {
    this.tester.setValue('Hallo Ryan')
  }

}
