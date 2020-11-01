import "./App.css";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import PostForm from "./components/postForm";
function App() {
  return (
    <div className="App">
      <Navbar />
      <Landing />
      <PostForm />
    </div>
  );
}

export default App;
