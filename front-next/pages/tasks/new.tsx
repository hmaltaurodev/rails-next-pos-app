import { useEffect } from "react";
import FullMoonAppBar from "../../src/components/FullMoonAppBar";

function NewTask() {
  useEffect(() => {
    document.title = 'New Task';
  }, []);

  return (
    <>
      <FullMoonAppBar />
      <h1>New Task</h1>
    </>
  );
}

export default NewTask;
