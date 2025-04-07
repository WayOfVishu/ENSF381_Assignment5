import { useState } from 'react';


function RegForm() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');

    // The set of messages to be printed onscreen
    const [messages,Setmessages] = useState([]);    
    
    function ValidateForm(event) {
        event.preventDefault();
        
        // Make a list to hold messages.
        const messages = [];

        // Regex expressions required to check username.
        let lengthRegex = new RegExp("^.{3,20}$");
        let charRegex = new RegExp("^[a-zA-Z0-9_-]+$");
        let startWithLetterRegex = new RegExp("^[a-zA-Z]");
        let noSpacesRegex = new RegExp("^[^\\s]*$");  // Use double backslash to escape 's'
        let noSpecialCharsRegex = new RegExp("^[a-zA-Z0-9 ]*$");

        // Regex expressions required to check password.
        let atLeast8CharactersRegex = new RegExp("^.{8,}$");
        let atLeast1UppercaseRegex = new RegExp("[A-Z]");
        let atLeast1LowercaseRegex = new RegExp("[a-z]");
        let atLeast1DigitRegex = new RegExp("[0-9]");
        let atLeast1SpecialCharRegex = new RegExp("[!@#$%^&*]");

        // Must match password to confirm password.
        let confirmPasswordCheck = (password === confirmPassword);

        // Regex expression required to check email.
        let emailFormatRegex = new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$");


        if(!lengthRegex.test(username)){
            messages.push("Username must be between 3 and 20 characters long.");
        }
        if(!charRegex.test(username)){
            messages.push("Allowed characters in username: alphanumeric characters (letters A-Z, numbers 0-9), hyphens (-), and underscores (_)");
        }
        if(!startWithLetterRegex.test(username)){
            messages.push("Username must start with a letter.");
        }
        if(!noSpacesRegex.test(username)){
            messages.push("Username must not contain spaces.");
        }
        if(!noSpecialCharsRegex.test(username)){
            messages.push("Username must not contain special characters other than hyphens (-), and underscores (_)");
        }
        if(!lengthRegex.test(password)){
            messages.push("Password must be between 8 and 20 characters long.");
        }
        if(!atLeast8CharactersRegex.test(password)){
            messages.push("Password must be at least 8 characters long.");
        }
        if(!atLeast1UppercaseRegex.test(password)){
            messages.push("Password must contain at least one uppercase letter.");
        }
        if(!atLeast1LowercaseRegex.test(password)){
            messages.push("Password must contain at least one lowercase letter.");
        }
        if(!atLeast1DigitRegex.test(password)){
            messages.push("Password must contain at least one digit.");
        }
        if(!atLeast1SpecialCharRegex.test(password)){
            messages.push("Password must contain at least one special character.");
        }
        if(!noSpacesRegex.test(password)){
            messages.push("Password must not contain spaces.");
        }
        if(!confirmPasswordCheck){
            messages.push("Passwords do not match.");
        }
        if(!emailFormatRegex.test(email)){
            messages.push("Email format is invalid.");
        }
        if(!noSpacesRegex.test(email)){
            messages.push("Email must not contain spaces.");
        }

        // If there are messages, display them.
        if (messages.length > 0) {
            Setmessages(messages);
        } else {
            messages.push("Form submitted successfully. Redirecting to login page...");
            Setmessages(messages);
            setTimeout(() => {
                window.location.href = "/login"; // Replace with your actual login page URL
            }, 2000);
        }
        
    }


  return (
    <div className="RegForm">
        <h1>Sign Up</h1>

        <form className="form-styling" onSubmit={ValidateForm}>
            <label for="username">Username:</label>
            <input className="input-field" type="text" id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)}/><br/>

            <label for="password">Password:</label>
            <input className="input-field" type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)}/><br/>

            <label for="confirm-password">Confirm Password:</label>
            <input className="input-field" type="password" id="confirm-password" name="confirm-password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} /><br/>

            <label for="email">Email:</label>
            <input className="input-field" type="text" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)}/><br/>

            <button className="signup-button" type="submit">Sign Up</button>
        </form>
        
        {messages.length > 0 && (
        <div className="message-box">
            {messages.map((error, index) => (
            <p key={index}>{error}</p>
        ))}
  </div>
)}
    </div>
  );
}

export default RegForm;
