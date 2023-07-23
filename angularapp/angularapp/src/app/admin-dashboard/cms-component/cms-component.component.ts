import { Component, Input } from '@angular/core';
import { AdminDashboardService } from 'src/app/admin-dashboard.service';

@Component({
  selector: 'app-cms-component',
  templateUrl: './cms-component.component.html',
  styleUrls: ['./cms-component.component.css']
})
export class CmsComponentComponent {
  posts: any[] = [];
  
  @Input()
  isAdminLoggedIn:boolean=false;

  selectedPost: any = null;
  fileToUpload: File | null = null;
  title = '';
  content = '';
  selectedPostImage: string | null = null;
  newPost: { title: string, content: string } = { title: '', content: '' };
  selectedPostChanges: any = {
    title: '',
    content: '',
    image: null
  };
  editMode: boolean = false;
  constructor(private adminService: AdminDashboardService) {}

  ngOnInit() {
    this.getPosts();
  }

  editPost(post: any) {
    this.selectedPostChanges.id = post.id;
    this.selectedPostChanges.title = post.title;
    this.selectedPostChanges.content = post.content;
    this.editMode = true;
  }

  getPosts() {
    this.adminService.getPosts().subscribe(
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

  uploadFile(event: any) {
    const file = event.target.files[0];
    this.fileToUpload = file;
    const reader = new FileReader();
    reader.onload = (e) => {
      this.selectedPostImage = reader.result as string;
    };
    reader.readAsDataURL(file);
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

  updatePost(post: any) {
    if (!post) {
      console.log('Update not');
    }
    console.log('Update post method called');

    this.adminService.updatePost(post).subscribe(
      (response) => {
        console.log('Post updated successfully');
        this.getPosts();
        this.clearForm();
        this.editMode = false;
      },
      (error) => {
        console.log('Error occurred while updating post:', error);
      }
    );
  }

  clearForm() {
    this.selectedPost = null;
    this.fileToUpload = null;
    this.title = '';
    this.content = '';
    this.selectedPostImage = null;
  }

  getPostImage(post: any): string | null {
    if (post.imageData) {
      return `data:image/png;base64,${post.imageData}`;
    } else {
      return null;
    }
  }
}