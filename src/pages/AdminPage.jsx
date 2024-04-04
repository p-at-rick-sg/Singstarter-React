import React, { useEffect, useRef, useState } from "react";
import useFetch from "../hooks/useFetch";
import { useUser } from "../hooks/useUser";

const AdminPage = () => {
  const user = useUser();
  const fetchData = useFetch();

  return <></>;
};

export default AdminPage;
