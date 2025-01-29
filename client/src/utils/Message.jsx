import React from "react";

const Message = ({ message, user }) => {
  return (
    <div className="flex items-center mb-2">
      {/* Circle showing the user's first name initial */}
      <div className="w-10 h-10 flex items-center justify-center bg-blue-500 text-white font-bold rounded-full mr-3">
        {user.charAt(0).toUpperCase()} {/* First letter of the user's name */}
      </div>
      {/* Display the username and message */}
      <div>
        <div className="text-gray-300 font-semibold">{user}</div> {/* Username */}
        <div className="bg-gray-700 text-white p-3 rounded-lg">{message}</div> {/* Message */}
      </div>
    </div>
  );
};

export default Message;
