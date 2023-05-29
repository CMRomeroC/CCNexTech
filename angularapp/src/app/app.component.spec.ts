import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { StoriesService } from './services/stories.service';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

describe('AppComponent', () => {
  let app: AppComponent;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;
  let fixture: ComponentFixture<AppComponent>;
 
  beforeEach(async () => {
    const userServiceSpy = jasmine.createSpyObj<StoriesService>(['getTotalStories']);
    userServiceSpy.getTotalStories.and.callFake(function () {
      return of({
        result: [
          {
            total :500
          }
        ]
      })
    });

    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: StoriesService,
          userValue: userServiceSpy
        }
      ]
    }).compileComponents();
    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', fakeAsync(() => {
    app.ngOnInit();
    tick();
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'newestStoriesApp'`, () => {
    expect(app.title).toEqual('newestStoriesApp');
  });

});
