import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTaskContext } from '../context/TaskContext';
import type { Task, TaskFormData } from '../types';
import { Container, Form, Button, Card } from 'react-bootstrap';

const TaskForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addTask, updateTask, getTask } = useTaskContext();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState<TaskFormData>({
    title: '',
    description: '',
    status: 'pending',
    priority: 'medium',
    dueDate: new Date().toISOString().split('T')[0],
  });

  useEffect(() => {
    if (isEditing && id) {
      const task = getTask(id);
      if (task) {
        setFormData({
          title: task.title,
          description: task.description,
          status: task.status,
          priority: task.priority,
          dueDate: task.dueDate.split('T')[0],
        });
      }
    }
  }, [id, isEditing, getTask]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEditing && id) {
        await updateTask(id, formData);
      } else {
        await addTask(formData);
      }
      navigate('/');
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Container>
      <Card className="p-4">
        <Card.Body>
          <h2 className="mb-4">{isEditing ? 'Edit Task' : 'Create New Task'}</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Priority</Form.Label>
              <Form.Select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Due Date</Form.Label>
              <Form.Control
                type="date"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <div className="d-flex gap-2">
              <Button type="submit" variant="primary">
                {isEditing ? 'Update Task' : 'Create Task'}
              </Button>
              <Button
                variant="secondary"
                onClick={() => navigate('/')}
              >
                Cancel
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default TaskForm;