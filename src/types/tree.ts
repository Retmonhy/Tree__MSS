export interface ITree {
  id: string;
  title: string;
  children?: ITree[];
}
export interface IFindTreeeResult {
  parent: ITree | null;
  tree: ITree | null;
}
