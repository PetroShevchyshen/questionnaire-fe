import { Button } from "antd";
import { Route, Routes } from "react-router";

function App() {
  return (
    <>
      <Routes>
        <Route path="/test" element={<p>test</p>} />
      </Routes>
      <div>Test</div>
      <Button color="purple" variant="solid">
        Save
      </Button>
    </>
  );
}

export default App;
