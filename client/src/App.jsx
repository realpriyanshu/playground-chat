import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./pages/Signup.jsx";
import Signin from "./pages/Signin.jsx";
import Landing from "./pages/Landing.jsx";
import React from "react"; // Importing React library

import Chat from "./utils/Chat.jsx";
import PrivateRoute from "./utils/PrivateRoute.jsx"; // Import PrivateRoute

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<Signin />} />
        
        {/* Protect the Chat route */}
        <Route
          path="/chat/:roomId?"
          element={
            <PrivateRoute>
              <Chat />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
