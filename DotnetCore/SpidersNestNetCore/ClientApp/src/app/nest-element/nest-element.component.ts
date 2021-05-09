import { Component } from '@angular/core';
import { NestNodeData } from '../../client-models/NestNodeData/NestNodeData';
import { NestNodeComponent } from '../nest-node/nest-node.component';

@Component({
    selector: 'spi-nest-element',
    templateUrl: './nest-element.component.html',
    styleUrls: ['./nest-element.component.scss']
})
/** NestElement component*/
export class NestElementComponent {

  AllNestNodes: NestNodeData[] = [
    new NestNodeData('Dragon Prince', 'Not Implemented'),
    new NestNodeData('Owl House', 'Not Implemented'),
    new NestNodeData('Sanderson Progress', 'Not Implemented'),
    new NestNodeData('Ashes of Creation', 'Not Implemented')
  ];

    /** NestElement ctor */
  constructor() {
    

  }
}
