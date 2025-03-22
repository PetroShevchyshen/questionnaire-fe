import { Route, Routes } from "react-router";
import { Home } from "./pages/Home";
import { Button } from "antd";
import { Link } from "react-router-dom";
import { CreateQuiz } from "./pages/CreateQuiz";

function App() {
  return (
    <>
      <nav className="px-10 p-2 w-full flex justify-between">
        <p>Quick quiz</p>
        <Button color="green" variant="solid">
          <Link to="/create">Create Quiz</Link>
        </Button>
      </nav>
      <section className="bg-gray-200 h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreateQuiz />} />
        </Routes>
      </section>
    </>
  );
}

export default App;
