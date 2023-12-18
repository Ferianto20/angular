import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { emit } from 'process';
import { HttpService } from '../http.service';



interface UserInterface {
  id: number;
  name: string;
  role: string;
  isColored: boolean;

}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {


  todo: any = [];

  // user = {
  //   namaDepan: '',
  //   namaBelakang: '',
  //   email: '',
  //   password: ''
  // }
  constructor(private http: HttpClient, private httpService: HttpService) {

  }

  // todo: any = this.httpService.getRequest('https://e1f5-116-254-103-53.ngrok.io/todos');



  onSubmit() {
    this.http.get('https://e1f5-116-254-103-53.ngrok.io/todos').subscribe(
      (response) => {
        console.log('Data berhasil dikirim:', response);
        // Lakukan tindakan lanjutan jika diperlukan
      },
      (error) => {
        console.error('Gagal mengirim data:', error);
        // Tangani kesalahan jika diperlukan
      }
    );
  }
  @Input() user: UserInterface;

  @Output() userEvent: EventEmitter<UserInterface>;

  // isColored: boolean;

  // constructor() {
  //   this.userEvent = new EventEmitter<UserInterface>();
  //   this.user = {} as UserInterface;

  // }

  ngOnInit(): void {
    this.httpService
      .getRequest('https://e1f5-116-254-103-53.ngrok.io/todos').subscribe((data: any) =>
        this.todo = data.result
      );
  }

  senduserEvent(): void {
    this.userEvent.emit(this.user);
  }

}
