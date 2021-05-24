/// <reference path="../../../node_modules/@types/jasmine/index.d.ts" />
import { TestBed, ComponentFixture, ComponentFixtureAutoDetect, waitForAsync } from '@angular/core/testing';
import { BrowserModule, By } from "@angular/platform-browser";
import { NestNodeData } from '../../client-models/NestNodeData/NestNodeData';
import { NestNodeComponent } from './nest-node.component';

let component: NestNodeComponent;
let fixture: ComponentFixture<NestNodeComponent>;
let headerSizeArr: string[] = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];

describe('NestNode component', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
        declarations: [ NestNodeComponent ],
        imports: [ BrowserModule ],
        providers: [
          { provide: ComponentFixtureAutoDetect, useValue: true }
        ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NestNodeComponent);
    component = fixture.componentInstance;
    let stubNestNodeData: NestNodeData = new NestNodeData("Name", "Content");
    component.NestNodeData = stubNestNodeData;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should do something', (() => {
        expect(true).toEqual(true);
  }));

  it('should have a title as a header', (() => {
    let titleElementName: string = fixture.nativeElement.querySelector('.card-header').localName;
    expect(titleElementName[0]).toEqual('h');
  }));
});
