import { IFindTreeeResult } from "./../types/tree";
import { v4 } from "uuid";
import { makeAutoObservable, runInAction, toJS } from "mobx";
import { ITree } from "../types/tree";

export const initialTree: () => ITree = () => ({
  id: "0",
  title: "Покупка квартиры",
  children: [
    {
      id: "1",
      title: "Поиск квартиры",
    },
    {
      id: "2",
      title: "Осмотр квартиры",
      children: [
        {
          id: "3",
          title: "Внешний вид дома",
          children: [
            {
              id: "4",
              title: "Фасад",
            },
            {
              id: "5",
              title: "Общее состояние",
            },
          ],
        },
        {
          id: "6",
          title: "Состояние квартиры",
        },
      ],
    },
    {
      id: "7",
      title: "Оформление документов",
    },
    {
      id: "8",
      title: "Внесение оплаты",
      children: [
        { id: "9", title: "Сходить в банк" },
        { id: "10", title: "Оплатить" },
      ],
    },
  ],
});
export class TreeStore {
  tree: ITree;
  selectedTree: ITree | null = null;
  constructor() {
    this.tree = initialTree();
    makeAutoObservable(this, {
      tree: true,
      selectedTree: true,
    });
  }
  resetTree = () => {
    runInAction(() => {
      this.tree = initialTree();
    });
  };
  setSelectedTree = (incomingTree: ITree | null) => {
    if (!incomingTree) {
      return runInAction(() => {
        this.selectedTree = incomingTree;
      });
    }
    const { tree } = this.findTree(incomingTree.id);

    if (!tree) return;
    runInAction(() => {
      this.selectedTree = tree;
    });
  };
  createChildren = (incomingTree: ITree, childrenTitle: string) => {
    const newChildren = { id: v4(), title: childrenTitle };
    const { tree } = this.findTree(incomingTree.id);
    if (!tree) return;
    runInAction(() => {
      if (tree?.children) {
        tree?.children?.push(newChildren);
      } else {
        tree.children = [newChildren];
      }
    });
  };
  renameTitle = (incomingTree: ITree, newTitle: string) => {
    const { tree } = this.findTree(incomingTree.id);
    if (!tree) return;
    runInAction(() => {
      tree.title = newTitle;
    });
  };
  deleteTree = () => {
    if (!this.selectedTree) return;
    const { parent, tree } = this.findTree(this.selectedTree.id);
    if (parent && parent.children) {
      parent.children = parent.children.filter((i) => i.id !== this.selectedTree?.id);
    }
  };

  private findTree = (treeId: string, incomingTree: ITree = this.tree): IFindTreeeResult => {
    let result: IFindTreeeResult | null = { parent: null, tree: null };
    if (incomingTree.id === treeId) {
      return { parent: null, tree: incomingTree };
    }
    if (incomingTree.children) {
      for (let i = 0; i < incomingTree.children.length; i++) {
        result = {
          parent: this.findTree(treeId, incomingTree.children[i]).parent ?? incomingTree,
          tree: this.findTree(treeId, incomingTree.children[i]).tree,
        };
        if (result.tree) break;
      }
    }
    return result;
  };
}
