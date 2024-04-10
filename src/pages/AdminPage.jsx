import React, { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import { format, compareAsc, parseISO, parse } from "date-fns";
import {
  Container,
  Typography,
  Box,
  Switch,
  FormGroup,
  FormControlLabel,
  Paper,
} from "@mui/material";
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
  BarChart,
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
    const id = Date.now(); // using Date.now() to generate a unique id
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
  const [projects, setProjects] = useState([]);

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

  const getProjects = async () => {
    try {
      const res = await fetchData("/api/projects", "GET");
      if (res.ok) {
        setProjects(res.data);
        console.log(`Projects fetched successfully`);
      } else {
        console.error("Failed to fetch projects:", JSON.stringify(res.data));
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  useEffect(() => {
    getProjects();
  }, []);

  // Prepare chart data
  const barChartData = projects.map((project) => ({
    name:
      project.title.length > 10
        ? `${project.title.substring(0, 10)}...`
        : project.title, // Shorten the title for display
    Target: project.target,
    Current: project.currentTotal,
  }));

  const deleteAccount = async (userID) => {
    try {
      const res = await fetchData(
        `/api/users/delete/${userID}`,
        "DELETE",
        undefined,
        user.accessToken
      );
      if (res.ok) {
        console.log("User ID DELETED", res.data);
      } else {
        // Handle non-ok response
        console.error("Failed to delete user:", res.statusText);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleSaveClick = async (id) => {
    // Find the updated row in the DataGrid's state
    const updatedRow = rows.find((row) => row.id === id);

    // Extract and prepare the data to be updated
    const updatedData = {
      // Assuming name is "FirstName LastName" and needs splitting
      firstName: updatedRow.name.split(" ")[0],
      lastName: updatedRow.name.split(" ").slice(1).join(" ") || "", // Handle no last name
      role: updatedRow.role,
      active: updatedRow.active === "true" ? true : false, // Ensure boolean
    };

    // Log for debugging
    console.log("Data to be updated:", updatedData);

    // Call the function to update data in the backend
    await updateAccount(id, updatedData);
  };

  const updateAccount = async (userID, updatedUser) => {
    console.log(`Attempting to update user ${userID} with data:`, updatedUser);
    try {
      const res = await fetchData(
        `/api/users/update/${userID}`,
        "PATCH",
        updatedUser,
        user.accessToken
      );
      if (res.ok) {
        console.log("User updated successfully", res);
        console.log("GET UPDATED USER:", updatedUser);
        // Optionally refresh user list or update UI accordingly
      } else {
        console.error("Failed to update user:", res.message);
        // Handle errors (e.g., show a message to the user)
      }
    } catch (error) {
      console.error("Error updating user:", error.message);
      // Handle errors (e.g., show a message to the user)
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
    console.log("EDITING");
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleProcessRowUpdate = async (newRow) => {
    // Assuming the newRow.name is in "FirstName LastName" format
    const [firstName, ...lastNameParts] = newRow.name.split(" ");
    const lastName = lastNameParts.join(" "); // Re-join the remaining parts as the last name
    // Construct the updated user data with firstName and lastName separated
    const updatedUserData = {
      firstName: firstName,
      lastName: lastName,
      role: newRow.role,
      active: newRow.active, // Convert string to boolean if necessary
    };

    console.log(`Updating user with ID: ${newRow.id}`, updatedUserData);

    try {
      const response = await fetchData(
        `/api/users/update/${newRow.id}`,
        "PATCH",
        updatedUserData,
        user.accessToken
      );

      if (response.ok) {
        console.log("User updated successfully", response.data);
        return { ...newRow, ...response.data }; // Return updated data, merge in case API returns updated info
      } else {
        console.error("Failed to update user:", response.statusText);
        // Handle non-OK response
      }
    } catch (error) {
      console.error("Error updating user:", error);
      throw error; // Propagate error up to prevent DataGrid from committing the changes
    }
  };

  const handleDeleteClick = (id) => () => {
    deleteAccount(id);
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

  const getUpdatedRowData = (id) => {
    // This should return the updated data for the row with the given id
    const updatedRow = rows.find((row) => row.id === id);
    return {
      firstName: updatedRow.firstName,
      lastName: updatedRow.lastName,
      active: updatedRow.active,
      // Include other fields as necessary
    };
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
      valueOptions: ["true", "false"],
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
          processRowUpdate={handleProcessRowUpdate} // Add this prop
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
            data={chartData}
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
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Project Funding Overview
        </Typography>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={barChartData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Target" fill="#8884d8" name="Funding Goal" />
            <Bar dataKey="Current" fill="#82ca9d" name="Funds Raised" />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Container>
  );
};

export default AdminPage;
