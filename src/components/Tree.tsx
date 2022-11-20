import { observable, toJS } from "mobx";
import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Store } from "../App";
import { ITree } from "../types/tree";

export interface TreeProps {
  tree: ITree;
}
const Tree: React.FC<TreeProps> = observer(({ tree }) => {
  const { treeStore } = useContext(Store);
  const toddleSelect = () => {
    if (treeStore.selectedTree?.id === tree.id) {
      return treeStore.setSelectedTree(null);
    }
    treeStore.setSelectedTree(tree);
  };
  return (
    <div style={{ paddingLeft: 30, backgroundColor: treeStore.selectedTree?.id === tree.id ? "lightblue" : undefined }}>
      <>
        <div onClick={toddleSelect} style={{ padding: "4px 0" }}>
          <span>{tree.title}</span>
        </div>
        {tree.children && tree.children?.map((item) => <Tree key={item.id} tree={item} />)}
      </>
    </div>
  );
});
export default observable(Tree);
