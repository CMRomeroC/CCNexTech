import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { StoriesService } from './services/stories.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angularapp';
  stories: any = [];
  story: any = null;
  idnumber = 36002216;
  currentPage = 1;
  pageSize = 15;
  totalPages = 0;

  constructor(private storiesService: StoriesService) {
  }

  ngOnInit(): void {
    this.LoadStories();
    this.getTotalStories();
  }

  searchStory() {
    var id = document.getElementById('storyId') as HTMLInputElement | null;
    if (id?.value) {
      this.storiesService.getStory(Number(id.value)).subscribe((response: any) => {
        console.log(response)
        this.stories = []
        this.stories.push(response)
      });
    }
    
  }
  
  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.LoadStories();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.LoadStories();
    }
  }

  LoadStories() {
    this.storiesService.getStories(this.pageSize, this.currentPage).subscribe((response: any) => {
      console.log(response)
      this.stories = response
    });
  }

  getTotalStories() {
    this.storiesService.getTotalStories().subscribe((response: any) => {
      console.log(response)
      this.totalPages = response
      this.totalPages = Math.ceil(this.totalPages / this.pageSize);
    });
  }
}
