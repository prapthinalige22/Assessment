import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayersTreeComponent } from './players-tree.component';

describe('PlayersTreeComponent', () => {
  let component: PlayersTreeComponent;
  let fixture: ComponentFixture<PlayersTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayersTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayersTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
