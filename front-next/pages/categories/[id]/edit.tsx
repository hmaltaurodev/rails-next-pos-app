import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import FullMoonAppBar from "../../../src/components/FullMoonAppBar";

function EditCategory() {
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      document.title = `Editing Category ${id}`;
    }
  }, [id]);

  return (
    <>
      <FullMoonAppBar />
      <h1>Editing Category: {id}</h1>
    </>
  );
}

export default EditCategory;
