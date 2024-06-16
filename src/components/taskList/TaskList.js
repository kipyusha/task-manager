import React from "react";
import TaskCard from "./TaskCard";
import "./TaskListItem.css";

function TaskList({ tasks, userId, onDeleteTask }) {
  // Фильтрация задач текущего пользователя
  const tasksWithImages = tasks.filter(
    (task) => task.photo && task.idUser === userId
  );
  const tasksWithoutImages = tasks.filter(
    (task) => !task.photo && task.idUser === userId
  );

  return (
    <div className="task-grid mt-5">
      <div className="column">
        {tasksWithImages.map((task) => (
          <TaskCard
            key={task.idTask}
            task={task}
            userId={userId}
            onDeleteTask={onDeleteTask}
          />
        ))}
      </div>
      <div className="column">
        {tasksWithoutImages.map((task) => (
          <TaskCard
            key={task.idTask}
            task={task}
            userId={userId}
            onDeleteTask={onDeleteTask}
          />
        ))}
      </div>
    </div>
  );
}

export default TaskList;
