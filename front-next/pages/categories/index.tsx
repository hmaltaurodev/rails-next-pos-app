import { useEffect } from "react";
import FullMoonAppBar from "../../src/components/FullMoonAppBar";

function CategoryList() {
  useEffect(() => {
    document.title = 'Category List';
  }, []);

  return (
    <>
      <FullMoonAppBar />
      <h1>Category List</h1>
    </>
  );
}

export default CategoryList;
