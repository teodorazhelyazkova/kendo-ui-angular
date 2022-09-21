import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from 'src/Post.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  public gridData: Post[] = [];
  public checked: boolean = true;
  public editDataItem: any = undefined;
  public isNew: boolean = false;

  rowClassFn({ dataItem, index }: { dataItem: Post; index: number }) {
    const isEven = index % 2 === 0;
    return {
      even: isEven,
      odd: !isEven,
    };
  }

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getLimitedPosts(100);
  }

  getLimitedPosts(limit: number) {
    this.http
      .get<Post[]>(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}`)
      .subscribe((data: Post[]) => {
        this.gridData = data;
      });
  }

  updatePost(post: Post) {
    this.http
      .put<any>(`https://jsonplaceholder.typicode.com/posts/${post.id}`, post)
      .subscribe((data: Post) => {
        const currentPostIndex: number = this.gridData.findIndex(
          (post) => post.id === data.id
        );
        this.gridData[currentPostIndex] = data;
        console.log('grid data after post update:', this.gridData);
      });
  }

  createPost(post: Post) {
    this.http
      .post<any>(`https://jsonplaceholder.typicode.com/posts`, post)
      .subscribe((data: Post) => {
        this.gridData.push(data);
        console.log('grid data after post create:', this.gridData);
      });
  }

  addHandler(): void {
    this.editDataItem = {
      userId: null,
      id: null,
      title: '',
      body: '',
    };
    this.isNew = true;
  }

  editHandler(args: any): void {
    this.editDataItem = args.dataItem;
  }

  saveHandler(post: Post): void {
    this.isNew ? this.createPost(post) : this.updatePost(post);
  }

  cancelHandler(): void {
    this.editDataItem = {
      userId: null,
      id: null,
      title: '',
      body: '',
    };
    this.isNew = true;
  }
}
