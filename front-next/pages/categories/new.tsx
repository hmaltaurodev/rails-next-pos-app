import { useEffect } from "react";
import FullMoonAppBar from "../../src/components/FullMoonAppBar";

function NewCategory() {
  useEffect(() => {
    document.title = 'New Category';
  }, []);

  return (
    <>
      <FullMoonAppBar />
      <h1>New Category</h1>
    </>
  );
}

export default NewCategory;
