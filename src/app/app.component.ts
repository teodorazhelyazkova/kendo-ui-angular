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
  public isDialogVisible: boolean = false;
  public editDataItem: any = null;

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
      .subscribe((data) => {
        const index: number = this.gridData.findIndex(
          (entry) => entry.id === post.id
        );
        this.gridData[index] = data;
        console.log(this.gridData);
      });
  }

  editHandler(args: any): void {
    console.log('editHandler was triggered', args.dataItem);
    this.editDataItem = args.dataItem;

    // open dialog
    this.isDialogVisible = true;
  }

  saveHandler(post: Post): void {
    console.log('saveHandler...', post);
    this.updatePost(post);
  }

  cancelHandler(): void {
    console.log('cancelHandler...');
  }
}
