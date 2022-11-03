import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import FullMoonAppBar from "../../../src/components/FullMoonAppBar";

function EditTask() {
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      document.title = `Editing Task ${id}`;
    }
  }, [id]);

  return (
    <>
      <FullMoonAppBar />
      <h1>Editing Task: {id}</h1>
    </>
  );
}

export default EditTask;
