import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
  public gridData: any[] = [];
  public checked: boolean = true;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http
      .get<any>('https://jsonplaceholder.typicode.com/posts?_limit=5')
      .subscribe((data: any) => {
        this.gridData = data;
      });
  }

  edit() {
    const body = {
      userId: 1,
      id: 3,
      title: 'Teodora',
      body: 'Zhel',
    };
    this.http
      .put<any>(`https://jsonplaceholder.typicode.com/posts/${body.id}`, body)
      .subscribe((data) => {
        const index = this.gridData.findIndex(entry => entry.id === body.id); // 2
        this.gridData[index] = data;
        console.log(this.gridData);
      });
  }
}
