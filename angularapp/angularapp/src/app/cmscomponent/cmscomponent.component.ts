import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-cmscomponent',
  templateUrl: './cmscomponent.component.html',
  styleUrls: ['./cmscomponent.component.css']
})
export class CmscomponentComponent {
  posts: any[] = [];
  
  
  selectedPost: any = null;
  fileToUpload: File | null = null;
  title = '';
  content = '';
  selectedPostImage: string | null = null;

  selectedPostChanges: any = {
    title: '',
    content: '',
    image: null
  };
  editMode: boolean = false;
branch:string='';
baseURL:string='';
  constructor(private http: HttpClient) {
    const start = window.location.href.indexOf('-') + 1;
    const end = window.location.href.indexOf('.project');
    this.branch = window.location.href.substring(start, end);
    this.baseURL = `https://8080-${this.branch}.project.examly.io`;
  }

  ngOnInit() {
    this.getPosts();
  }

  editPost(post: any) {

    this.selectedPostChanges.id=post.id;
    this.selectedPostChanges.title = post.title;
    this.selectedPostChanges.content = post.content;
    this.editMode = true;
  }

  getPosts() {
    this.http.get<any[]>(`${this.baseURL}/admins/cms/posts`).subscribe(
      (response: any[]) => {
        this.posts = response;
        for (const post of this.posts) {
          this.selectPost(post);
        }
      },
      (error) => {
        console.log('Error occurred while fetching posts:', error);
      }
    );
  }

  showContent(post: any) {
    if (this.selectedPost === post) {
      this.selectedPost = null;
    } else {
      this.selectedPost = post;
    }
  }

  selectPost(post: any) {
    if (post.imageData) {
      this.selectedPostImage = `data:image/png;base64,${post.imageData}`;
    } else {
      this.selectedPostImage = null;
    }
    this.selectedPost = post;
    this.title = post.title;
    this.content = post.content;
  }

  
  togglePostContent(post: any) {
    if (this.selectedPost === post) {
      
      post.showContent = !post.showContent;
    } else {
     
      this.posts.forEach((p) => {
        p.showContent = false;
      });
      post.showContent = true;
      this.selectedPost = post;
    }
  }
 
  
  getPostImage(post: any): string | null {
    if (post.imageData) {
      return `data:image/png;base64,${post.imageData}`;
    } else {
      return null;
    }
  }

}
