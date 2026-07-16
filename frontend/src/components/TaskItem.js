import React from 'react';

function TaskItem({ task }) {
  return (
    <div className="task-item">
      <input
        type="checkbox"
        checked={task.completed}
        // Implementar a lógica de toggle depois
      />
      <span className={task.completed ? 'completed' : ''}>
        {task.description}
      </span>
      <button>Editar</button>
      <button>Excluir</button>
    </div>
  );
}

export default TaskItem;
