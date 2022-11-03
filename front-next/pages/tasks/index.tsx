import { useEffect } from "react";
import FullMoonAppBar from "../../src/components/FullMoonAppBar";

function TaskList() {
  useEffect(() => {
    document.title = 'Task List';
  }, []);

  return (
    <>
      <FullMoonAppBar />
      <h1>Task List</h1>
    </>
  );
}

export default TaskList;
