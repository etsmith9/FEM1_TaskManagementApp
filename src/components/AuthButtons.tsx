import { useAuth0 } from '@auth0/auth0-react';

const AuthButtons = () => {
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();

  return (
    <div>
      {!isAuthenticated ? (
        <button onClick={() => loginWithRedirect()} className="bg-blue-500 text-white px-4 py-2">Login</button>
      ) : (
        <>
          <p>Welcome, {user?.name}</p>
          <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })} className="bg-red-500 text-white px-4 py-2">
            Logout
          </button>
        </>
      )}
    </div>
  );
};

export default AuthButtons;