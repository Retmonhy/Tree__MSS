import { observer } from "mobx-react";
import { createContext } from "react";
import Tree from "./components/Tree";
import { TreeControls } from "./components/TreeControls";
import stores from "./stores";
import "./styles/App.css";
export const Store = createContext(stores.store);
export const App = observer(() => {
  // const { treeStore } = stores.store;

  return (
    <Store.Provider value={stores.store}>
      <div className='container'>
        <div className='content'>
          <Tree tree={stores.store.treeStore.tree} />
          <TreeControls />
        </div>
      </div>
    </Store.Provider>
  );
});

