import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from 'src/Post.model';

@Component({
  selector: 'app-root',
  template: `<kendo-dropdownlist
    [data]="dropdownData"
    textField="title"
    valueField="id"
    [(ngModel)]="selectedPost"
  >
  </kendo-dropdownlist>`,
})
export class AppComponent implements OnInit {
  public dropdownData: Post[] = [];
  public selectedPost: Post = {
    userId: 0,
    id: 0,
    title: '',
    body: '',
  };

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getPostsByUserId(5);
  }

  getPostsByUserId(userId: number) {
    this.http
      .get<Post[]>(
        `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
      )
      .subscribe((data: Post[]) => {
        this.dropdownData = data;
      });
  }
}
