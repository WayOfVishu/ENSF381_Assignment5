import { useState, useEffect, createContext, useContext } from 'react';
import DisplayStatus from './DisplayStatus.js';


// Authenication context to manage login status.
export const AuthContext = createContext();

// Create a context to manage authentication status.
const AuthProvider = ({ children }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [authStatus, setAuthStatus] = useState({ type: "", message: "" });

  return (
    <AuthContext.Provider value={{ username, setUsername, password, setPassword, authStatus, setAuthStatus }}>
      {children}
    </AuthContext.Provider>
  );
}

function LoginForm() {
  const { username, setUsername, password, setPassword, authStatus, setAuthStatus } = useContext(AuthContext);


  async function ValidateLoginInfo(event) {
    event.preventDefault();
    let currentMessages = [];

    // Validate user login info.
    if (username === '') {
      currentMessages.push("Username is required");
    }

    if (password === '') {
      currentMessages.push("Password is required");
    }
    else if (password.length < 8) {
      currentMessages.push("Password must be at least 8 characters");
    }

    // If error occured, display error message.
    if (currentMessages.length > 0) {
      setAuthStatus({ type: "error", message: currentMessages.join(", ") });
    }
    // If no error, send login request to backend.
    else {
      fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: username, password: password })
      })
        .then(response => response.json())
        .then(data => {
          if (data.message === "Login successful") {

            setAuthStatus({ type: "success", message: data.message });

            // Store the current user in localStorage
            localStorage.setItem('student_id', JSON.stringify(data.student_id));

            window.location.href = "/courses";
            setAuthStatus({ type: "error", message: data.message });
          }
        })
        .catch(error => {
          console.error("Error during login:", error);
          setAuthStatus({ type: "error", message: "An error occured attempting to login." });
        });
    }
  }

  //Handles redirection to /courses after successful login. Waits for 2 seconds first.
  useEffect(() => {
    if (authStatus.type === "success") {

      setTimeout(() => {
        window.location.href = '/courses';
      }, 2000);
    }
  }, [authStatus]);


  return (
    <div>
      <h2>Login</h2>
      <form className="form-styling">
        <label for="name">Username: </label>
        <input className="input-field" id="name" name="username" onChange={(e) => setUsername(e.target.value)} />
        <br />
        <label for="password">Password: </label>
        <input className="input-field" id="password" name="password" onChange={(e) => setPassword(e.target.value)} />
        <br />

        <input class="signup-button" onClick={ValidateLoginInfo} id="Login_Button" type="submit" value="Login" />
      </form>
      <br />
      <a href="/login">Forget Password?</a>

      {/* Display the login status */}
      <DisplayStatus type={authStatus.type} message={authStatus.message} />
    </div>
  );
}

export default LoginForm;
export { AuthProvider };
