import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import FullMoonAppBar from "../../../src/components/FullMoonAppBar";

function ShowCategory() {
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      document.title = `Showing Category ${id}`;
    }
  }, [id]);

  return (
    <>
      <FullMoonAppBar />
      <h1>Showing Category: {id}</h1>
    </>
  );
}

export default ShowCategory;
