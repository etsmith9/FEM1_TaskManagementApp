import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTaskContext } from '../context/TaskContext';
import type { Task } from '../types';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';

const Dashboard = () => {
  const { tasks, loading, error } = useTaskContext();
  const [filter, setFilter] = useState<Task['status'] | 'all'>('all');

  const filteredTasks = filter === 'all'
    ? tasks
    : tasks.filter(task => task.status === filter);

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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Container>
      <Row className="mb-4">
        <Col>
          <h2>Task Dashboard</h2>
        </Col>
        <Col xs="auto">
          <Link to="/tasks/new" className="btn btn-primary">
            Create New Task
          </Link>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col>
          <div className="btn-group">
            <Button
              variant={filter === 'all' ? 'primary' : 'outline-primary'}
              onClick={() => setFilter('all')}
            >
              All
            </Button>
            <Button
              variant={filter === 'pending' ? 'primary' : 'outline-primary'}
              onClick={() => setFilter('pending')}
            >
              Pending
            </Button>
            <Button
              variant={filter === 'in-progress' ? 'primary' : 'outline-primary'}
              onClick={() => setFilter('in-progress')}
            >
              In Progress
            </Button>
            <Button
              variant={filter === 'completed' ? 'primary' : 'outline-primary'}
              onClick={() => setFilter('completed')}
            >
              Completed
            </Button>
          </div>
        </Col>
      </Row>

      <Row>
        {filteredTasks.map(task => (
          <Col key={task.id} md={4} className="mb-4">
            <Card className="task-card">
              <Card.Body>
                <Card.Title>{task.title}</Card.Title>
                <Card.Text>{task.description}</Card.Text>
                <div className="task-meta">
                  <div className="d-flex mb-3">
                    <Badge bg={getPriorityColor(task.priority)}>
                      {task.priority}
                    </Badge>
                    <Badge bg={getStatusColor(task.status)}>
                      {task.status}
                    </Badge>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="due-date">
                      Due: {new Date(task.dueDate).toLocaleDateString()}
                    </span>
                    <Link to={`/tasks/${task.id}`} className="btn btn-outline-primary btn-sm">
                      View Details
                    </Link>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Dashboard;