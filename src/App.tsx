import { observer } from "mobx-react";
import { createContext } from "react";
import { v4 } from "uuid";
import { Button } from "./components/Button";
import Tree from "./components/Tree";
import { TreeControls } from "./components/TreeControls";
import stores from "./stores";
import "./styles/App.css";
export const Store = createContext(stores.store);
export const App = observer(() => {
  // const { treeStore } = stores.store;
  const { createChildren, setSelectedTree } = stores.store.treeStore;
  return (
    <Store.Provider value={stores.store}>
      <div className='container'>
        <div className='content'>
          {stores.store.treeStore.tree.map((tree) => (
            <Tree tree={tree} key={v4()} />
          ))}
          <Button
            title='Добавить дерево'
            clickHand={() => {
              const newChildren = createChildren(null, "Новый элемент");
              setSelectedTree(newChildren);
            }}
          />

          <TreeControls />
        </div>
      </div>
    </Store.Provider>
  );
});

