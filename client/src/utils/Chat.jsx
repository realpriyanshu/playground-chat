import { useState, useMemo } from "react"; // Importing hooks for state management and memoization
import { io } from "socket.io-client"; // Importing Socket.IO client for real-time communication
import React from "react"; // Importing React library
import Message from "./Message"; // Importing the `Message` component to display individual messages

function Chat() {
  const [message, setmessage] = useState(""); // State to hold the current input message
  const [messages, setmessages] = useState([]); // State to hold the list of messages

  // Creating and memoizing the Socket.IO connection to avoid reconnecting on every render
  const socket = useMemo(() => io("http://localhost:5000"), []);

  // Listening for the "recieve" event from the server to handle incoming messages
  socket.on("recieve", (e) => {
    if (e.trim() !== "") {
      setmessages([...messages, e]); // Add the received message to the list
      setmessage(""); // Clear the input field
    }
  });

  // Function to handle the form submission (sending a message)
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    socket.emit("send", message); // Emit the "send" event with the message to the server
    // Uncomment below to add the message to the local list without waiting for server response
    // if(message.trim()!== ""){
    //   setmessages([...messages,message]);
    // }
  };

  // Listening for a "welcome" event from the server (placeholder code for future handling)
  socket.on("welcome", (s) => {
    // Currently does nothing with the "welcome" message
    // Example: Could render a `Message` component or display the welcome message
    // <Message message={{ s }} />
  });

  return (
    <>
      <div id="main" className="w-screen h-screen">
        {/* Main container for the chat application */}
        <div
          id="page1"
          className="w-full h-full bg-gray-900 flex flex-col justify-between"
        >
          {/* Navigation bar */}
          <div id="nav">
            <nav className="bg-white w-screen flex border-gray-200 dark:bg-gray-900">
              <div className="max-w-screen-xl justify-end flex flex-wrap items-center p-4">
                {/* Brand/logo section */}
                <a
                  href="https://flowbite.com/"
                  className="flex items-center space-x-3 rtl:space-x-reverse"
                >
                  <img
                    src="https://flowbite.com/docs/images/logo.svg"
                    className="h-8"
                    alt="Flowbite Logo"
                  />
                  <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                    Messenger
                  </span>
                </a>
              </div>
            </nav>
          </div>

          {/* Message display area */}
          <div id="msg" className="hide-scrollbar flex-1 overflow-y-auto p-4">
            <div className="flex flex-col ml-10 items-start justify-center text-white">
              {messages.map((msg, index) => (
                // Mapping over the messages array to render each message using the `Message` component
                <Message key={index} message={msg} />
              ))}
            </div>
          </div>

          {/* Input form for sending messages */}
          <form onSubmit={handleSubmit} id="chat" className="flex">
            <textarea
              className="bg-slate-300 text-black h-10 w-2/3 ml-48 mb-11 rounded-md justify-end mt-auto resize-none text-center"
              value={message} // Bind textarea value to the `message` state
              onChange={(e) => {
                setmessage(e.target.value); // Update the message state on input change
              }}
              // Uncomment to allow submitting messages with Enter key (while preventing newline)
              // onKeyDown={(e) => {
              //   if (e.key === "Enter" && !e.shiftKey) {
              //     e.preventDefault(); // Prevent default newline behavior
              //     handleSubmit(e); // Trigger message sending
              //   }
              // }}
            ></textarea>

            {/* Send button */}
            <button
              type="submit"
              className="h-10 rounded-md w-20 bg-blue-500 ml-4 border-transparent"
              onClick={function () {
                console.log(); // Placeholder for debugging
              }}
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Chat;
