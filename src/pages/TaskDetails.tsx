import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTaskContext } from '../context/TaskContext';
import type { Task } from '../types';
import { Container, Card, Button, Badge } from 'react-bootstrap';

const TaskDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getTask, deleteTask } = useTaskContext();
  const [task, setTask] = useState<Task | undefined>();

  useEffect(() => {
    if (id) {
      const foundTask = getTask(id);
      setTask(foundTask);
    }
  }, [id, getTask]);

  const handleDelete = async () => {
    if (id) {
      try {
        await deleteTask(id);
        navigate('/');
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    }
  };

  if (!task) {
    return <div>Task not found</div>;
  }

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'high': return 'danger';
      case 'medium': return 'warning';
      case 'low': return 'success';
      default: return 'secondary';
    }
  };

  const getStatusColor = (status: Task['status']) => {
    switch (status) {
      case 'completed': return 'success';
      case 'in-progress': return 'warning';
      case 'pending': return 'secondary';
      default: return 'secondary';
    }
  };

  return (
    <Container>
      <Card className="p-4">
        <Card.Body>
          <div className="d-flex justify-content-between align-items-start mb-4">
            <div>
              <h2>{task.title}</h2>
              <div className="mb-2">
                <Badge bg={getPriorityColor(task.priority)} className="me-2">
                  {task.priority}
                </Badge>
                <Badge bg={getStatusColor(task.status)}>
                  {task.status}
                </Badge>
              </div>
            </div>
            <div className="d-flex gap-2">
              <Button
                variant="primary"
                onClick={() => navigate(`/tasks/${id}/edit`)}
              >
                Edit
              </Button>
              <Button
                variant="danger"
                onClick={handleDelete}
              >
                Delete
              </Button>
            </div>
          </div>

          <Card.Text className="mb-4">
            {task.description}
          </Card.Text>

          <div className="text-muted">
            <p><strong>Created:</strong> {new Date(task.createdAt).toLocaleString()}</p>
            <p><strong>Last Updated:</strong> {new Date(task.updatedAt).toLocaleString()}</p>
            <p><strong>Due Date:</strong> {new Date(task.dueDate).toLocaleString()}</p>
          </div>

          <Button
            variant="secondary"
            onClick={() => navigate('/')}
            className="mt-4"
          >
            Back to Dashboard
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default TaskDetails;