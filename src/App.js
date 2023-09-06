import Add from "./TodoList/add";
import "./App.css";
import DropdownBox from "./TodoList/category";
import Log from "./Api/Log";
import Todo from "./TodoList/todo";
import TodoApp from "./TodoList/todo1";

function App() {
  return (
    <div className="App">
      <Add />
      <Todo />
      {/* <Log /> */}
      {/* <TodoApp /> */}
    </div>
  );
}

export default App;
