import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import FullMoonAppBar from "../../../src/components/FullMoonAppBar";

function ShowTask() {
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      document.title = `Showing Task ${id}`;
    }
  }, [id]);

  return (
    <>
      <FullMoonAppBar />
      <h1>Showing Task: {id}</h1>
    </>
  );
}

export default ShowTask;
