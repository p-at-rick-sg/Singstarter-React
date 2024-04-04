import React, { useEffect, useRef, useState } from "react";
import useFetch from "../hooks/useFetch";
import { useUser } from "../hooks/useUser";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";
import {
  randomCreatedDate,
  randomTraderName,
  randomId,
  randomArrayItem,
} from "@mui/x-data-grid-generator";

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const fetchData = useFetch();

  const getAllUser = async () => {
    try {
      const res = await fetchData("/api/users/all", "GET");
      if (res.ok) {
        setUsers(res.data);
        console.log("Users fetched successfully");
      } else {
        console.log(res.data);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getAllUser();
  }, []);

  return <></>;
};

export default AdminPage;
