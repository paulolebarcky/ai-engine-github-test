import React, { useState } from 'react';

function TaskItem({ task, onEditTask, onDeleteTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedDescription, setEditedDescription] = useState(task.description);

  const handleToggleComplete = () => {
    onEditTask(task.id, { completed: !task.completed });
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    if (editedDescription.trim() !== '' && editedDescription !== task.description) {
      onEditTask(task.id, { description: editedDescription });
    }
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditedDescription(task.description);
    setIsEditing(false);
  };

  const handleDeleteClick = () => {
    onDeleteTask(task.id);
  };

  return (
    <div className="task-item">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={handleToggleComplete}
      />
      {isEditing ? (
        <input
          type="text"
          value={editedDescription}
          onChange={(e) => setEditedDescription(e.target.value)}
          onBlur={handleSaveClick} // Salva ao perder o foco
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleSaveClick();
            }
          }}
        />
      ) : (
        <span className={task.completed ? 'completed' : ''} onDoubleClick={handleEditClick}>
          {task.description}
        </span>
      )}

      {isEditing ? (
        <>
          <button onClick={handleSaveClick}>Salvar</button>
          <button onClick={handleCancelEdit}>Cancelar</button>
        </>
      ) : (
        <>
          <button onClick={handleEditClick}>Editar</button>
          <button onClick={handleDeleteClick}>Excluir</button>
        </>
      )}
    </div>
  );
}

export default TaskItem;
