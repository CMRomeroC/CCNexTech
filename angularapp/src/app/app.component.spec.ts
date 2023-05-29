import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { of } from 'rxjs';
import { StoriesService } from './services/stories.service';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let storiesServiceSpy: jasmine.SpyObj<StoriesService>;

  beforeEach(async () => {
    // Crea un spy del servicio StoriesService
    const spy = jasmine.createSpyObj('StoriesService', ['getStories', 'getTotalStories', 'getStory']);

    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [
        { provide: StoriesService, useValue: spy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;

    // Obtén una referencia al spy del servicio StoriesService
    storiesServiceSpy = TestBed.inject(StoriesService) as jasmine.SpyObj<StoriesService>;
  });

  it('should load stories on initialization', () => {
    const dummyResponse = ['story1', 'story2'];
    storiesServiceSpy.getStories.and.returnValue(of(dummyResponse));

    component.ngOnInit();

    expect(storiesServiceSpy.getStories).toHaveBeenCalledWith(component.pageSize, component.currentPage);
    expect(component.stories).toEqual(dummyResponse);
  });

  it('should get total stories on initialization', () => {
    const dummyResponse = 100;
    storiesServiceSpy.getTotalStories.and.returnValue(of(dummyResponse));

    component.ngOnInit();

    expect(storiesServiceSpy.getTotalStories).toHaveBeenCalled();
    expect(component.totalPages).toBe(Math.ceil(dummyResponse / component.pageSize));
  });

  it('should load stories with pagination', () => {
    const dummyResponse = ['story1', 'story2'];
    storiesServiceSpy.getStories.and.returnValue(of(dummyResponse));

    component.LoadStories();

    expect(storiesServiceSpy.getStories).toHaveBeenCalledWith(component.pageSize, component.currentPage);
    expect(component.stories).toEqual(dummyResponse);
  });

  it('should navigate to previous page', () => {
    component.currentPage = 2;

    component.previousPage();

    expect(component.currentPage).toBe(1);
    expect(storiesServiceSpy.getStories).toHaveBeenCalled();
  });

  it('should navigate to next page', () => {
    component.currentPage = 1;
    component.totalPages = 2;

    component.nextPage();

    expect(component.currentPage).toBe(2);
    expect(storiesServiceSpy.getStories).toHaveBeenCalled();
  });

  it('should search for story by id', () => {
    const dummyResponse = ['story1'];
    const id = 123;
    storiesServiceSpy.getStory.and.returnValue(of(dummyResponse));

    // Simular el elemento de entrada de texto
    const inputElement: HTMLInputElement = document.createElement('input');
    inputElement.id = 'storyId';
    inputElement.value = id.toString();
    document.body.appendChild(inputElement);

    component.searchStory();

    expect(storiesServiceSpy.getStory).toHaveBeenCalledWith(id);
    expect(component.stories).toEqual(dummyResponse);
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'angularapp'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('angularapp');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).toContain('angularapp app is running!');
  });
});

