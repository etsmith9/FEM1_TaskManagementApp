import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { Navbar as BootstrapNavbar, Container, Button } from 'react-bootstrap';

const Navbar = () => {
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();

  return (
    <BootstrapNavbar bg="light" expand="lg" className="mb-4">
      <Container>
        <BootstrapNavbar.Brand as={Link} to="/">Task Manager</BootstrapNavbar.Brand>
        <BootstrapNavbar id="basic-navbar-nav">
          <div className="d-flex justify-content-between align-items-center w-100">
            {isAuthenticated && (
              <div className="d-flex gap-3 me-auto">
                <Link to="/" className="text-decoration-none">
                  <Button variant="outline-primary">
                    Dashboard
                  </Button>
                </Link>
                <Link to="/tasks/new" className="text-decoration-none">
                  <Button variant="primary">
                    Create Task
                  </Button>
                </Link>
                <Button
                  variant="outline-danger"
                  onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
                >
                  Log Out
                </Button>
              </div>
            )}
            <div className="d-flex align-items-center">
              {isAuthenticated ? (
                <span className="me-3 d-none d-lg-inline">Welcome, {user?.name}</span>
              ) : (
                <Button variant="primary" onClick={() => loginWithRedirect()}>
                  Log In
                </Button>
              )}
            </div>
          </div>
        </BootstrapNavbar>
      </Container>
    </BootstrapNavbar>
  );
};

export default Navbar; 