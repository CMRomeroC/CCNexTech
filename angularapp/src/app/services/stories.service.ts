import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Story } from '../Model/story.model';

@Injectable({
  providedIn: 'root'
})
export class StoriesService {
  public url = 'https://localhost:7175/api/';

  constructor(private http: HttpClient) { }

  getStories(pageSize: number, currentPage: number): any {
    return this.http.get<Story[]>(this.url + `getnewstories/${currentPage}/${pageSize}`);
  }
  getStory(id: number): any {
    return this.http.get<Story[]>(this.url + `getstory/${id}`);
  }
  getTotalStories(): any {
    return this.http.get<number>(this.url + `gettotalstories/`);
  }
}
