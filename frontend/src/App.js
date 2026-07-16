import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import './App.css'; // Vamos criar este arquivo depois

function App() {
  const [tasks, setTasks] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const clearMessages = () => {
    setErrorMessage(null);
    setSuccessMessage(null);
  };

  const fetchTasks = async () => {
    clearMessages();
    try {
      const response = await fetch('/api/tasks');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Erro ao buscar tarefas:", error);
      setErrorMessage("Não foi possível carregar as tarefas. Tente novamente mais tarde.");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAddTask = async (description) => {
    clearMessages();
    if (!description.trim()) {
      setErrorMessage("A descrição da tarefa não pode ser vazia.");
      return;
    }
    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ description }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const newTask = await response.json();
      setTasks((prevTasks) => [...prevTasks, newTask]);
      setSuccessMessage("Tarefa adicionada com sucesso!");
    } catch (error) {
      console.error("Erro ao adicionar tarefa:", error);
      setErrorMessage("Não foi possível adicionar a tarefa. Tente novamente.");
    }
  };

  const handleEditTask = async (id, updatedFields) => {
    clearMessages();
    if (updatedFields.description !== undefined && !updatedFields.description.trim()) {
      setErrorMessage("A descrição da tarefa não pode ser vazia.");
      return;
    }
    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedFields),
      });
      if (response.status === 404) {
        setErrorMessage("Tarefa não encontrada. Ela pode ter sido excluída.");
        fetchTasks(); // Tenta recarregar a lista para refletir o estado atual
        return;
      }
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const updatedTask = await response.json();
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === id ? updatedTask : task))
      );
      setSuccessMessage("Tarefa atualizada com sucesso!");
    } catch (error) {
      console.error("Erro ao editar tarefa:", error);
      setErrorMessage("Não foi possível atualizar a tarefa. Tente novamente.");
    }
  };

  const handleDeleteTask = async (id) => {
    clearMessages();
    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: 'DELETE',
      });
      if (response.status === 404) {
        setErrorMessage("Tarefa não encontrada. Ela pode já ter sido excluída.");
        fetchTasks();
        return;
      }
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
      setSuccessMessage("Tarefa excluída com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir tarefa:", error);
      setErrorMessage("Não foi possível excluir a tarefa. Tente novamente.");
    }
  };

  return (
    <div className="App">
      <h1>Minha Lista de Tarefas</h1>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
      <TaskForm onAddTask={handleAddTask} />
      {tasks.length === 0 ? (
        <p>Nenhuma tarefa ainda. Adicione a primeira!</p>
      ) : (
        <TaskList
          tasks={tasks}
          onEditTask={handleEditTask}
          onDeleteTask={handleDeleteTask}
        />
      )}
    </div>
  );
}

export default App;
