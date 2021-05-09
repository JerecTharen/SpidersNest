/// <reference path="../../../../node_modules/@types/jasmine/index.d.ts" />
import { TestBed, async, ComponentFixture, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { BrowserModule, By } from "@angular/platform-browser";
import { NestNodeComponent } from './nest-node.component';

let component: NestNodeComponent;
let fixture: ComponentFixture<NestNodeComponent>;

describe('NestNode component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ NestNodeComponent ],
            imports: [ BrowserModule ],
            providers: [
                { provide: ComponentFixtureAutoDetect, useValue: true }
            ]
        });
        fixture = TestBed.createComponent(NestNodeComponent);
        component = fixture.componentInstance;
    }));

    it('should do something', async(() => {
        expect(true).toEqual(true);
    }));
});