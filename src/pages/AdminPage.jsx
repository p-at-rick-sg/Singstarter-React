import React, { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import { format, compareAsc, parseISO, parse } from "date-fns";
import { Box, Button, Container, Paper, Typography } from "@mui/material";
import { useUser } from "../hooks/useUser";
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
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Area,
  PieChart,
  Pie,
  Cell,
} from "recharts";

function EditToolbar({ setRows, setRowModesModel }) {
  const handleClick = () => {
    const id = Math.random().toString(36).substr(2, 9);
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
  const fetchData = useFetch();
  const [users, setUsers] = useState([]);
  const [rows, setRows] = useState([]);
  const [rowModesModel, setRowModesModel] = useState({});
  const [regDates, setRegDates] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [pieChartData, setPieChartData] = useState([]);
  const { user, setUser, checkSession, setPageTitle } = useUser();

  //Call API USER ALL
  const getAllUser = async () => {
    try {
      const res = await fetchData("/api/users/all", "GET");
      if (res.ok) {
        setUsers(res.data);
        console.log("Users fetched successfully");
        const dates = res.data.map((user) => user.createdDate);
        setRegDates(dates);
        // console.log("Something", res.date.createdDate);
      } else {
        console.log(res.data);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getAllUser();
  }, []);

  const deleteAccount = async (userID) => {
    try {
      const res = await fetchData(`/api/users/delete/${userID}`);
      if (res.ok) {
        console.log("User ID DELETED", res.data);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    const transformedRows = users.map((user) => ({
      id: user._id,
      name: `${user.firstName} ${user.lastName}`,
      email: user.email,
      joinDate: user.createdDate
        ? format(parseISO(user.createdDate), "dd/MM/yyyy")
        : "Unknown Date",
      role: user.role,
      active: user.active,
    }));
    setRows(transformedRows);

    // Correctly placed useEffect to process chart data
    const processedChartData = processDataForChart(users);
    setChartData(processedChartData);
  }, [users]);

  const processDataForChart = (users) => {
    const monthMap = {};
    users.forEach((user) => {
      const monthYear = format(parseISO(user.createdDate), "MMM-yyyy");
      if (!monthMap[monthYear]) {
        monthMap[monthYear] = {
          userCount: 0,
          activeCount: 0,
          registrations: 0,
        };
      }
      monthMap[monthYear].userCount += 1;
      if (user.active) {
        monthMap[monthYear].activeCount += 1;
      }
      monthMap[monthYear].registrations += 1;
    });

    let chartData = Object.keys(monthMap).map((monthYear) => ({
      month: monthYear,
      Users: monthMap[monthYear].userCount,
      Active: monthMap[monthYear].activeCount,
      Registrations: monthMap[monthYear].registrations,
    }));

    // Sort chartData by month in ascending order
    chartData = chartData.sort((a, b) => {
      const dateA = parse(a.month, "MMM-yyyy", new Date());
      const dateB = parse(b.month, "MMM-yyyy", new Date());
      return compareAsc(dateA, dateB);
    });

    return chartData;
  };

  useEffect(() => {
    const roleDistribution = users.reduce((acc, user) => {
      acc[user.role] = (acc[user.role] || 0) + 1;
      return acc;
    }, {});

    const chartData = Object.keys(roleDistribution).map((role) => ({
      name: role,
      value: roleDistribution[role],
    }));

    setPieChartData(chartData);
  }, [users]);

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

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

  // Sample data for the chart
  const data = [
    { name: "Jan", Users: 400 },
    { name: "Feb", Users: 300 },
    // More data points...
  ];

  const composedChartData = [
    { name: "Jan", Users: 400, Active: 240, Registrations: 240 },
    { name: "Feb", Users: 300, Active: 139, Registrations: 221 },
    { name: "Mar", Users: 200, Active: 980, Registrations: 229 },
    { name: "Apr", Users: 278, Active: 390, Registrations: 200 },
    // Add more data as needed
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom component="div">
        Admin Dashboard
      </Typography>
      <Paper sx={{ p: 2, display: "flex", flexDirection: "column", mb: 2 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          // initialState={{
          //   pagination: {
          //     paginationModel: {
          //       pageSize: 20,
          //     },
          //   },
          // }}
          // pageSizeOptions={[5]}
          editMode="row"
          rowModesModel={rowModesModel}
          onRowModesModelChange={setRowModesModel}
          components={{
            Toolbar: EditToolbar,
          }}
          componentsProps={{
            toolbar: { setRows, setRowModesModel },
          }}
          autoHeight
        />
      </Paper>
      <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
        <Typography variant="h6" component="h2">
          User Registrations Over Time
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="Users"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Paper>
      <Paper sx={{ p: 2, display: "flex", flexDirection: "column", mb: 2 }}>
        <Typography variant="h6" gutterBottom component="div">
          Detailed Statistics
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <ComposedChart
            data={chartData}
            margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
          >
            <CartesianGrid stroke="#f5f5f5" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Users" barSize={20} fill="#413ea0" />
            <Line type="monotone" dataKey="Active" stroke="#ff7300" />
            <Area
              type="monotone"
              dataKey="Registrations"
              fill="#8884d8"
              stroke="#8884d8"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </Paper>
      <div>
        <h2>User Role Distribution</h2>
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={pieChartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={150}
              fill="#8884d8"
              dataKey="value"
              nameKey="name"
              label={({ name, percent }) =>
                `${name} ${(percent * 100).toFixed(0)}%`
              }
            >
              {pieChartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Container>
  );
};

export default AdminPage;
