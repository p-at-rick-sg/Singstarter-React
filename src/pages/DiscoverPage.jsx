import React, { useState, useEffect } from "react";
import { Box, TextField, Typography, Grid } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import HomeCard from "../components/HomeCard";
import useDebounce from "../hooks/useDebounce";

function DiscoverPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // Debounce search term so that search happens 500 ms after user stops typing
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    const fetchData = async () => {
      // Only attempt to fetch data if there's a search term
      if (debouncedSearchTerm) {
        try {
          const response = await fetch(
            `/api/projects/search?term=${debouncedSearchTerm}`
          );
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          //   const data = await response.json();
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

    fetchData();
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
      <Grid container spacing={2} justifyContent="center">
        {searchResults && searchResults.length > 0
          ? searchResults.map((project) => (
              <Grid item key={project._id} xs={12} sm={6} md={4}>
                <HomeCard project={project} />
              </Grid>
            ))
          : searchTerm && (
              <Typography variant="h6" sx={{ mt: 2 }}>
                No projects found
              </Typography>
            )}
      </Grid>
    </Box>
  );
}

export default DiscoverPage;
