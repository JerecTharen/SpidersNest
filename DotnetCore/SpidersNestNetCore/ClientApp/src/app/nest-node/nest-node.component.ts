import { Component, Input, OnInit } from '@angular/core';
import { NestNodeData } from '../../client-models/NestNodeData/NestNodeData';

@Component({
    selector: 'spi-nest-node',
    templateUrl: './nest-node.component.html',
    styleUrls: ['./nest-node.component.scss']
})
/** NestNode component*/
export class NestNodeComponent implements OnInit {
  /** NestNode ctor */
  @Input() NestNodeData: NestNodeData;

  constructor() {
    console.log('checking data: ', this.NestNodeData);
  }

  ngOnInit() {
    console.log('checking data in init: ', this.NestNodeData.Name + ' ' + this.NestNodeData.Content);
  }
}
