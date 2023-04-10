import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Auth } from "./pages/auth";
import { Home } from "./pages/Home";
import { SavedRecipes } from "./pages/SavedRecipes";
import { CreateRecipes } from "./pages/CreateRecipes";
import { Navbar } from "./components/Navbar";

function App() {
  return (
    <div className="app">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/create-recipe" element={<CreateRecipes />} />
          <Route path="/saved-recipes" element={<SavedRecipes />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
