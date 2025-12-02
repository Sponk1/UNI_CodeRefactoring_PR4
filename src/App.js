import { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Todos from './components/Todos';
import {todoData} from './config/ToDoData';
import {addTask, deleteTask, checkTask, editTask, sortTask} from './functions/TodoListOperations';

function App() {

  const [listTasks, setListTasks] = useState(todoData);
  const [showListTasks, setShowListTasks] = useState([]);
  const [modeSort, setModeSort] = useState('All');

    const handleSubmit = (task) => {
        setListTasks(prev => addTask(prev, task));
    };

    const handleDelete = (_id) => {
        setListTasks(prev => deleteTask(prev, _id));
    };

    const handleCheck = (task) => {
    setListTasks(prev => checkTask(prev, task._id));
    };

    const handleEdit = (task) => {
        setListTasks(prev => editTask(prev, task));
    }

    const handleSortList = (mode) => {
        setModeSort(mode);
    }

    useEffect(() => {
        setShowListTasks(sortTask(listTasks, modeSort));
    }, [listTasks, modeSort]);

  return (
    <div className="flex flex-col items-center w-full h-full bg-white my-10 gap-6">
            <h1 className="text-4xl font-bold uppercase text-gray-600">ToDo List</h1>
            <Header 
                handleSubmit={handleSubmit}
                sortHandler={handleSortList}
             />
            <Todos 
                tasks={showListTasks}
                checkHandler={handleCheck}
                deleteHandler={handleDelete}
                editeHandler={handleEdit}  />
        </div>
  );
}

export default App;
