// DisplayStatus.js
import React from 'react';

const DisplayStatus = ({ type, message }) => {
  return (
    <div className="display_status_message" 
    
    // Use the type to signal the color of the div, green for sucess, red for error.
    style={{backgroundColor: type === 'error' ? 'red' : type === 'success' ? 'green' : 'white',}}>
      {message}
    </div>
  );
};

export default DisplayStatus;
