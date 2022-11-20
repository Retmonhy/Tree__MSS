import { TreeStore } from "./trees";
class AppStore {
  treeStore: TreeStore;
  constructor() {
    this.treeStore = new TreeStore();
  }
}
export default { store: new AppStore() };
