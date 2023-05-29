import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { StoriesService } from './stories.service';

describe('StoriesService', () => {
  let service: StoriesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(StoriesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return total stories', () => {
    service.getTotalStories().subscribe((result: { results: { lentgh: any; }; }) => {
      expect(result).toBeTruthy();
      expect(result.results).toBeTruthy();
      expect(result.results.lentgh).toEqual(1);
    });

    const req = httpMock.expectOne('https://localhost:7175/api/gettotalstories/');
    expect(req.request.method).toBe('GET');
  });

  it('should return a story', () => {
    service.getStory(1).subscribe((result: any) => {
      expect(result).toBeTruthy();
      expect(result.results).toBeTruthy();
      expect(result.results.lentgh).toEqual(1);
    });
  });

  it('should return a story', () => {
    service.getStories(1,15).subscribe((result: any) => {
      expect(result).toBeTruthy();
      expect(result.results).toBeTruthy();
      expect(result.results.lentgh).toEqual(15);
    });
  });

});
