function TaskCard({ task, userId, onDeleteTask }) {
    return (
      <div className="task-item">
        <div className="card">
          <div className="card-body">
            <h5 className="card-header">{task.text}</h5>
  
            {task.photo && (
              <img
                src={`http://localhost:5000${task.photo}`}
                alt="task"
                className="img-fluid rounded mx-auto d-block custom-img-width"
              />
            )}
  
            <h6 className="card-title custom-pre-wrap pt-2 mb-0">Описание:</h6>
            <p className="card-text custom-pre-wrap px-5 pt-2">
              {task.description}
            </p>
  
            {task.idUser === userId && (
              <button
                className="btn btn-danger mt-1"
                onClick={() => onDeleteTask(task.idTask)}
              >
                Delete
              </button>
            )}
  
            <p className="text-end mt-2 mb-0">{task.lastDate}</p>
          </div>
        </div>
      </div>
    );
  }

export default TaskCard