import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import {
  Box,
  Paper,
  Grid,
  TextField,
  List,
  ListItem,
  Avatar,
  ListItemAvatar,
  ListItemText,
  Typography,
  Divider,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import useDebounce from "../hooks/useDebounce";
import useFetch from "../hooks/useFetch";
import HomeCard from "../components/HomeCard";

function DiscoverPage() {
  const fetchData = useFetch();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [projectCount, setProjectCount] = useState(0);

  const getProjectCount = async () => {
    try {
      const res = await fetchData("/api/projects/countProject");
      if (res.ok) {
        setProjectCount(res.data.count);
        console.log(`Project Count fetched successfully`, res.data.count);
      } else {
        console.log("Failed to fetch project count", res.statusText);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // Fetch project count on component mount
  useEffect(() => {
    getProjectCount();
  }, []);

  // Debounce search term so that search happens 500ms after user stops typing
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    const searchProject = async () => {
      // Only attempt to fetch data if there's a search term
      if (debouncedSearchTerm) {
        try {
          const response = await fetchData(
            `/api/projects/search?term=${debouncedSearchTerm}`
          );
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          //   const data = await response.json();
          console.log("searching....");
          console.log(debouncedSearchTerm);
          console.log(response.data);
          setSearchResults(response.data); // Assuming the response is an array of projects
        } catch (error) {
          console.error(
            "There was an error fetching the search results:",
            error
          );
          setSearchResults([]); // Ensure searchResults is always an array
        }
      } else {
        setSearchResults([]); // Clear the search results if there's no search term
      }
    };

    searchProject();
  }, [debouncedSearchTerm]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        p: 4,
      }}
    >
      <TextField
        placeholder="Search for projects"
        value={searchTerm}
        onChange={handleSearchChange}
        size="small"
        variant="outlined"
        sx={{ width: "100%", maxWidth: "800px", mb: 2 }}
        InputProps={{
          startAdornment: (
            <SearchIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
          ),
        }}
      />
      {searchTerm && (
        <List
          sx={{ width: "100%", maxWidth: "800px", bgcolor: "background.paper" }}
        >
          {searchResults.length > 0 ? (
            searchResults.map((project) => (
              <React.Fragment key={project._id}>
                <ListItem alignItems="flex-start" button>
                  <ListItemAvatar>
                    <Link
                      to={`/project/${project._id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <Avatar
                        alt={project.title}
                        src={
                          project.images?.[0]?.URL || "defaultImageFallbackURL"
                        }
                        sx={{ width: 56, height: 56, marginRight: 2 }}
                      />
                    </Link>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Link
                        to={`/project/${project._id}`}
                        className="transition-all text-blue-900 hover:text-blue-600"
                        style={{ textDecoration: "none" }}
                      >
                        <Typography variant="subtitle1" color="text.primary">
                          {project.title}
                        </Typography>
                      </Link>
                    }
                    secondary={
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        noWrap
                        component="div"
                      >
                        {project.description}
                      </Typography>
                    }
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
              </React.Fragment>
            ))
          ) : (
            <ListItem>
              <Typography variant="body1">No projects found</Typography>
            </ListItem>
          )}
        </List>
      )}
      <Paper
        sx={{
          p: 2,
          mb: 2,
          width: "100%",
          bgcolor: "background.paper",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography
              gutterBottom
              variant="h4"
              component="div"
              sx={{ textAlign: "left" }}
            >
              Explore {projectCount.toLocaleString()} projects
            </Typography>
          </Grid>
        </Grid>
      </Paper>
      <HomeCard />
    </Box>
  );
}

export default DiscoverPage;
