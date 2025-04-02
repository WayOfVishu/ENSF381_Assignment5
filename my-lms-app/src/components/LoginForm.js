import { useState,useEffect,createContext,useContext  } from 'react';
import DisplayStatus from './DisplayStatus.js';


    // Authenication context to manage login status.
    export const AuthContext = createContext();
  
    // Create a context to manage authentication status.
    const AuthProvider = ({ children }) => {
      const [username, setUsername] = useState('');
      const [password, setPassword] = useState('');
      const [authStatus, setAuthStatus] = useState({ type: "", message: "" });
    
      return (
        <AuthContext.Provider value={{ username,setUsername,password,setPassword,authStatus, setAuthStatus }}>
          {children}
        </AuthContext.Provider>
      );
    }

function LoginForm() {
  const { username, setUsername, password, setPassword, authStatus, setAuthStatus } = useContext(AuthContext);


async function ValidateLoginInfo(){

  let currentMessages = [];

  // Validate user login info.
  if(username === '')
    {
      currentMessages.push("Username is required");
    }

  if(password === '')
    {
      currentMessages.push("Password is required");
    }
  else if(password.length < 8){
    currentMessages.push("Password must be at least 8 characters");
  }

  // If error occured, display error message.
  if(currentMessages.length > 0)
    {
      setAuthStatus({ type: "error", message: currentMessages.join(", ") });
    }
  else
    {
      // If no error occured, call the API to validate the user login info.
      const data = await fetchDataFromAPI();

      const user = data.find((user) => user.username === username && user.email === password);

      if(user)
        {
          // set status to success
          setAuthStatus({ type: "success", message: "Login successful!" });
        }
      else
        {
          setAuthStatus({ type: "error", message: "Invalid username or password" });
        }
    }
}

  // Function to fetch data from API.
  async function fetchDataFromAPI(){
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const data =  await response.json();
    return data;
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

          <label for="name">Username: </label>
          <input id="name" name="username" onChange={(e) => setUsername(e.target.value)}/>
          <br/>
          <label for="password">Password: </label>
          <input id="password" name="password" onChange={(e) => setPassword(e.target.value)}/>
          <br/>

        <input onClick={ValidateLoginInfo} id="Login_Button" type="submit" value="Login"/>
        <br/>
        <a href="/login">Forget Password?</a>

      {/* Display the login status */}
      <DisplayStatus type={authStatus.type} message={authStatus.message} />
      </div>
    );
  }
  
  export default LoginForm;
  export { AuthProvider }; 
  