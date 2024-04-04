import React, { useEffect, useRef, useState } from "react";
import useFetch from "../hooks/useFetch";
import { useUser } from "../hooks/useUser";
import { format } from "date-fns";
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

const roles = ["Market", "Finance", "Development"];
const randomRole = () => {
  return randomArrayItem(roles);
};

function EditToolbar(props) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const id = randomId();
    setRows((oldRows) => [
      ...oldRows,
      { id, name: "", email: "", isNew: true },
    ]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "name" },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add record
      </Button>
    </GridToolbarContainer>
  );
}

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const fetchData = useFetch();

  //   const initialRows = () => {
  //     {
  //       users.map((user) => {
  //         <div
  //           key={user._id}
  //           _id={user.id}
  //           email={user.email}
  //           firstName={user.firstName}
  //           lastName={user.lastName}
  //           role={user.role}
  //           active={user.active}
  //         />;
  //       });
  //     }
  //     [
  //       {
  //         id: user._id,
  //         name: randomTraderName(),
  //         age: 25,
  //         joinDate: randomCreatedDate(),
  //         role: randomRole(),
  //       },
  //       {
  //         id: randomId(),
  //         name: randomTraderName(),
  //         age: 36,
  //         joinDate: randomCreatedDate(),
  //         role: randomRole(),
  //       },
  //       {
  //         id: randomId(),
  //         name: randomTraderName(),
  //         age: 19,
  //         joinDate: randomCreatedDate(),
  //         role: randomRole(),
  //       },
  //       {
  //         id: randomId(),
  //         name: randomTraderName(),
  //         age: 28,
  //         joinDate: randomCreatedDate(),
  //         role: randomRole(),
  //       },
  //       {
  //         id: randomId(),
  //         name: randomTraderName(),
  //         age: 23,
  //         joinDate: randomCreatedDate(),
  //         role: randomRole(),
  //       },
  //     ];
  //   };

  //Call API USER ALL
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

  useEffect(() => {
    const transformedRows = users.map((user) => ({
      id: user._id,
      name: `${user.firstName} ${user.lastName}`,
      email: user.email,
      joinDate: user.createdDate
        ? format(new Date(user.createdDate), "dd/MM/yyyy")
        : "Unknown Date",
      role: user.role,
      active: user.active,
    }));

    setRows(transformedRows);
  }, [users]); // This effect depends on the users state

  const [rows, setRows] = useState([]);
  const [rowModesModel, setRowModesModel] = useState({});

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => () => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const [filterModel, setFilterModel] = useState({
    items: [],
  });

  const columns = [
    { field: "name", headerName: "Name", width: 200, editable: true },
    {
      field: "email",
      headerName: "Email",
      type: "String",
      width: 200,
      align: "left",
      headerAlign: "left",
      editable: false,
    },
    {
      field: "joinDate",
      headerName: "Join date",
      type: "String",
      width: 150,
      editable: true,
    },
    {
      field: "role",
      headerName: "Role",
      width: 150,
      editable: true,
      type: "singleSelect",
      valueOptions: ["contributor", "user", "admin"], // Specify the roles here
      filterable: true, // Make sure this column is filterable
    },
    {
      field: "active",
      headerName: "Active",
      width: 100,
      editable: true,
      type: "singleSelect",
      valueOptions: ["Active", "Inactive"],
    },

    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <Box
      sx={{
        height: 500,
        width: "60%",
        "& .actions": {
          color: "text.secondary",
        },
        "& .textPrimary": {
          color: "text.primary",
        },
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        slots={{
          toolbar: EditToolbar,
        }}
        slotProps={{
          toolbar: { setRows, setRowModesModel },
        }}
        filterModel={filterModel}
        onFilterModelChange={(newModel) => setFilterModel(newModel)}
      />
    </Box>
  );
};

export default AdminPage;
