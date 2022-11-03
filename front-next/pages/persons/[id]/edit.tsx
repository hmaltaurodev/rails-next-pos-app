import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import FullMoonAppBar from "../../../src/components/FullMoonAppBar";

function EditPerson() {
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      document.title = `Editing Person ${id}`;
    }
  }, [id]);

  return (
    <>
      <FullMoonAppBar />
      <h1>Editing Person: {id}</h1>
    </>
  );
}

export default EditPerson;
