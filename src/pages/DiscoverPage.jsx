import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  List,
  ListItem,
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
        sx={{ width: "100%", maxWidth: "500px", mb: 4 }}
        InputProps={{
          startAdornment: (
            <SearchIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
          ),
        }}
      />
      {searchTerm && (
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        >
          {searchResults.length > 0 ? (
            searchResults.map((project) => (
              <React.Fragment key={project._id}>
                <ListItem button>
                  <Typography variant="subtitle1">{project.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {project.description}
                  </Typography>
                </ListItem>
                <Divider />
              </React.Fragment>
            ))
          ) : (
            <ListItem>
              <Typography variant="body1">No projects found</Typography>
            </ListItem>
          )}
        </List>
      )}
      <HomeCard></HomeCard>
    </Box>
  );
}

export default DiscoverPage;
