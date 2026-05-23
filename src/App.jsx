import { useState } from "react";
import Navbar from "./components/Navbar/navbar";
import Home from "./pages/Home";
import "./App.css";

function App() {
  return (
    <>
      <Navbar />
      <main className="app-main">
        {/* Home page with classroom grid */}
        <Home />
      </main>
    </>
  );
}

export default App;
