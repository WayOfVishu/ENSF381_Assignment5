import { useContext } from 'react';
import { AuthContext } from './LoginForm';

function AuthMessage() {
  const {authStatus } = useContext(AuthContext);

  // Based on AuthContext, display a message based on message and type.
  return (
    <div>
      {authStatus.type && (
        <p>
          {authStatus.type === 'success' ? 'Success' : 'Error'} - {authStatus.message}
        </p>
      )}
    </div>
  );
}

export default AuthMessage;
