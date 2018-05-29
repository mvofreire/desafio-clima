import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherWhatIDoComponent } from './weather-what-i-do.component';

describe('WeatherWhatIDoComponent', () => {
  let component: WeatherWhatIDoComponent;
  let fixture: ComponentFixture<WeatherWhatIDoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeatherWhatIDoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherWhatIDoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
