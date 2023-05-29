import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Story } from '../Model/story.model';
import { StoriesService } from './stories.service';
;

describe('StoriesService', () => {
  let service: StoriesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [StoriesService]
    });
    service = TestBed.inject(StoriesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should retrieve stories', () => {
    const pageSize = 10;
    const currentPage = 1;
    const mockStories: Story[] = [
      { id: 1, title: 'Story 1', url: 'https://example.com/story1' },
      { id: 2, title: 'Story 2', url: 'https://example.com/story2' }
    ];

    service.getStories(pageSize, currentPage).subscribe((stories: Story[]) => {
      expect(stories).toEqual(mockStories);
    });

    const request = httpMock.expectOne(`https://localhost:7175/api/getnewstories/${currentPage}/${pageSize}`);
    expect(request.request.method).toBe('GET');
    request.flush(mockStories);
  });

  it('should retrieve a single story', () => {
    const storyId = 1;
    const mockStory: Story = { id: storyId, title: 'Story 1', url: 'https://example.com/story1' };

    service.getStory(storyId).subscribe((story: Story) => {
      expect(story).toEqual(mockStory);
    });

    const request = httpMock.expectOne(`https://localhost:7175/api/getstory/${storyId}`);
    expect(request.request.method).toBe('GET');
    request.flush(mockStory);
  });

  it('should retrieve the total number of stories', () => {
    const mockTotalStories = 100;

    service.getTotalStories().subscribe((totalStories: number) => {
      expect(totalStories).toBe(mockTotalStories);
    });

    const request = httpMock.expectOne('https://localhost:7175/api/gettotalstories/');
    expect(request.request.method).toBe('GET');
    request.flush(mockTotalStories);
  });
});
