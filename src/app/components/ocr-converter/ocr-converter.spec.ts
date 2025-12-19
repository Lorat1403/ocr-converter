import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OcrConverter } from './ocr-converter';

describe('OcrConverter', () => {
  let component: OcrConverter;
  let fixture: ComponentFixture<OcrConverter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OcrConverter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OcrConverter);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
