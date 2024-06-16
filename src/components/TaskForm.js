import React, { useState, useEffect, useRef } from "react";


function TaskForm({ onAddTask, userId }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [lastDate, setLastDate] = useState("");
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [errors, setErrors] = useState({});
  const descriptionRef = useRef(null);

  const validateForm = () => {
    const newErrors = {};
    if (!title) newErrors.title = "Title is required";
    if (!description) newErrors.description = "Description is required";
    if (!lastDate) newErrors.lastDate = "Last date is required";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    const formData = new FormData();
    formData.append("idUser", userId);
    formData.append("text", title);
    formData.append("description", description);
    formData.append("lastDate", lastDate);
    if (photo) {
      formData.append("photo", photo);
    }
    
    onAddTask(formData);
    setTitle("");
    setDescription("");
    setLastDate("");
    setPhoto(null);
    setPhotoPreview(null);
    setErrors({});
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPhoto(null);
      setPhotoPreview(null);
    }
  };

  useEffect(() => {
    if (descriptionRef.current) {
      descriptionRef.current.style.height = "auto";
      descriptionRef.current.style.height = `${descriptionRef.current.scrollHeight}px`;
    }
  }, [description]);

  return (
    <form onSubmit={handleSubmit} className="mt-5 w-50 mx-auto p-2">
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          className={`form-control ${errors.title ? 'is-invalid' : ''}`}
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {errors.title && <div className="invalid-feedback">{errors.title}</div>}
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          className={`form-control overflow-auto ${errors.description ? 'is-invalid' : ''}`}
          id="description"
          value={description}
          onChange={handleDescriptionChange}
          ref={descriptionRef}
          rows={1}
          style={{ resize: 'none' }}
        ></textarea>
        {errors.description && <div className="invalid-feedback">{errors.description}</div>}
      </div>
      <div className="form-group">
        <label htmlFor="lastDate">Last Date</label>
        <input
          type="date"
          className={`form-control ${errors.lastDate ? 'is-invalid' : ''}`}
          id="lastDate"
          value={lastDate}
          onChange={(e) => setLastDate(e.target.value)}
        />
        {errors.lastDate && <div className="invalid-feedback">{errors.lastDate}</div>}
      </div>
      <div className="form-group">
        <label htmlFor="photo">Photo</label>
        <input
          type="file"
          className="form-control"
          id="photo"
          onChange={handlePhotoChange}
        />
        {photoPreview && (
          <div className="mt-3">
            <img src={photoPreview} alt="Preview" className="img-thumbnail" style={{ maxHeight: '200px' }} />
          </div>
        )}
      </div>
      <button type="submit" className="btn btn-primary">
        Add Task
      </button>
    </form>
  );
}

export default TaskForm;



