import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from 'src/Post.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  public gridData: Post[] = [];
  public checked: boolean = true;
  public isDialogVisible: boolean = false;
  public editDataItem: any = null;
  public isNew: boolean = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getLimitedPosts(5);
  }

  getLimitedPosts(limit: number) {
    this.http
      .get<Post[]>(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}`)
      .subscribe((data: Post[]) => {
        this.gridData = data;
      });
  }

  updatePost(event: any) {
    const post: Post = event.dataItem;

    this.http
      .put<any>(`https://jsonplaceholder.typicode.com/posts/${post.id}`, post)
      .subscribe((data) => {
        const index: number = this.gridData.findIndex(
          (entry) => entry.id === post.id
        );
        this.gridData[index] = data;
      });
  }

  editHandler(args: any): void {
    console.log('editHandler was triggered', args.dataItem);
    this.editDataItem = args.dataItem;

    // open dialog
    this.isDialogVisible = true;
  }

  saveHandler(args: any): void {
    console.log('saveHandler...', args);
    // updatePost(args);
  }
  
  cancelHandler(): void {
    console.log('cancelHandler...');
  }
}
