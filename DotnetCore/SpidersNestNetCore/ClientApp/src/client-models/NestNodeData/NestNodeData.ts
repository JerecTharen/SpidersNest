import { INestNodeData } from "./INestNodeData";

export class NestNodeData implements INestNodeData {
  Name: string;
  Content: string;
  constructor(name: string, content: string) {
    this.Name = name;
    this.Content = content;
  }
}
