import { Route, Routes } from "react-router";

function App() {
  return (
    <>
      <Routes>
        <Route path="/test" element={<p>test</p>} />
      </Routes>
      <div>Test</div>
    </>
  );
}

export default App;
