import { Route, Routes } from "react-router";
import { Home } from "./pages/Home";
import { Button } from "antd";
import { Link } from "react-router-dom";
import { CreateQuiz } from "./pages/CreateQuiz";
import { RunQuiz } from "./pages/RunQuiz";
import { Analytics } from "./pages/Analytics";

function App() {
  return (
    <>
      <nav className="px-10 p-2 w-full flex justify-between">
        <Link to="/">Quick quiz</Link>
        <Button color="green" variant="solid">
          <Link to="/analytics">Analytics</Link>
        </Button>
        <Button color="green" variant="solid">
          <Link to="/create">Create Quiz</Link>
        </Button>
      </nav>
      <section className="bg-gray-200 min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreateQuiz />} />
          <Route path="/run/:id" element={<RunQuiz />} />
          <Route path="/analytics" element={<Analytics />} />
        </Routes>
      </section>
    </>
  );
}

export default App;
