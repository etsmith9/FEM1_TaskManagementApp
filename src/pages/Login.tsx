import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { Container, Card, Button } from 'react-bootstrap';

const Login: React.FC = () => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
      <Card className="p-4 shadow" style={{ maxWidth: '400px', width: '100%' }}>
        <Card.Body className="text-center">
          <Card.Title className="mb-4">Welcome to the Task Management App</Card.Title>
          <Card.Text className="mb-4">
            Please log in to create, manage and view your tasks.
          </Card.Text>
          <Button
            variant="primary"
            size="lg"
            onClick={() => loginWithRedirect()}
            className="w-100"
          >
            Log In
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login; 