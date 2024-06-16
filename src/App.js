import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Login from './components/authentication/Login';
import Register from './components/authentication/Register';
import TaskForm from './components/TaskForm';
import TaskList from './components/taskList/TaskList';

function App() {
  const [userId, setUserId] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [isLogin, setIsLogin] = useState(true); // Добавленное состояние для переключения между формами

  useEffect(() => {
    if (userId) {
      fetchTasks();
    }
  }, [userId]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleLogin = (id) => {
    setUserId(id);
  };

  const handleRegister = (id) => {
    setUserId(id);
  };

  const handleAddTask = async (task) => {
    try {
      const response = await axios.post('http://localhost:5000/api/add', task, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      if (response.data.success) {
        fetchTasks();
      }
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const handleDeleteTask = async (idTask) => {
    try {
      const response = await axios.post('http://localhost:5000/api/del', {
        idUser: userId,
        idTask
      });
      if (response.data.success) {
        fetchTasks();
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className="container">
      {!userId ? (
        
        isLogin ? (
          <>
            <Login onLogin={handleLogin} setIsLogin={setIsLogin} />
          </>
        ) : (
          <>
            <Register onRegister={handleRegister} setIsLogin={setIsLogin}/>
          </>
        )
      
      ) : (
        <>
          <TaskForm onAddTask={handleAddTask} userId={userId} />
          <TaskList tasks={tasks} userId={userId} onDeleteTask={handleDeleteTask} />
        </>
      )}
    </div>
  );
}

export default App;



