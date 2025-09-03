import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskGroup } from './task-group';

describe('TaskGroup', () => {
  let component: TaskGroup;
  let fixture: ComponentFixture<TaskGroup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskGroup]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskGroup);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
