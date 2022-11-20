import { observer } from "mobx-react";
import { useContext, useEffect, useState } from "react";
import { Store } from "../App";
import "./../styles/App.css";
import { Button } from "./Button";
export enum ActionType {
  create = "create",
  rename = "rename",
}
export const TreeControls = observer(() => {
  const [value, setValue] = useState<string>("");
  const [action, setAction] = useState<ActionType | null>(null);
  const [inputIsOpened, setInputIsOpened] = useState<boolean>(false);
  const { treeStore } = useContext(Store);
  const { createChildren, renameTitle, deleteTree, selectedTree, resetTree } = treeStore;
  useEffect(() => {
    setInputIsOpened(false);
    setValue("");
  }, [selectedTree]);
  const checkSelectedTree = () => {
    if (!selectedTree) {
      alert("Выберите интересующее девево");
    }
  };
  const rename = () => {
    selectedTree && renameTitle(selectedTree, value);
    setInputIsOpened(false);
  };
  const create = () => {
    selectedTree && createChildren(selectedTree, value);
    setInputIsOpened(false);
  };
  const createHandler = () => {
    checkSelectedTree();
    setAction(ActionType.create);
    setInputIsOpened(true);
  };
  const editHandler = () => {
    checkSelectedTree();
    setAction(ActionType.rename);
    selectedTree && setValue(selectedTree?.title);
    setInputIsOpened(true);
  };
  const deleteHandler = () => {
    checkSelectedTree();
    deleteTree();
  };
  const resetHandler = () => resetTree();
  return (
    <div className='tree-controls'>
      {selectedTree && inputIsOpened && (
        <div className='input-wrapper'>
          <input
            className='input'
            placeholder={action === ActionType.create ? "Введите название" : ""}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            autoFocus={true}
          />
          <div>
            <Button title='Отменить' clickHand={() => setInputIsOpened(false)} />
            <Button
              className='btn_margin-left'
              title='Применить'
              clickHand={action === ActionType.create ? create : rename}
            />
          </div>
        </div>
      )}
      <div className='tree-controls__buttons'>
        <Button className='btn_margin-left' title='Добавить' clickHand={createHandler} />
        <Button className='btn_margin-left' title='Удалить' clickHand={deleteHandler} />
        <Button className='btn_margin-left' title='Редактировать' clickHand={editHandler} />
        <Button className='btn_margin-left' title='Сбросить' clickHand={resetHandler} />
      </div>
    </div>
  );
});
