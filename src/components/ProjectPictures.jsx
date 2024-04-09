import React, { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Dialog,
  DialogContent,
} from "@mui/material";

const ProjectPictures = ({ selectedProjectID }) => {
  const fetchData = useFetch();
  const [projectImages, setProjectImages] = useState([]);

  const getProjectPictures = async () => {
    if (selectedProjectID !== null) {
      try {
        const res = await fetchData(
          "/api/projects/pictures/" + selectedProjectID,
          "GET",
          undefined,
          undefined
        );

        if (res.ok) {
          setProjectImages(res.data);
        } else {
          console.log(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const images = projectImages.map((item) => item.URL);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [open, setOpen] = useState(false);

  const goToNextSlide = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPrevSlide = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    getProjectPictures();
  }, []);

  return (
    <div>
      <Card style={{ maxWidth: 600, margin: "auto", marginTop: 20 }}>
        <CardMedia
          component="img"
          height="300"
          image={images[currentImageIndex]}
          alt={`Image ${currentImageIndex + 1}`}
          onClick={handleOpen}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            Image {currentImageIndex + 1}
          </Typography>
        </CardContent>
        <CardActions style={{ justifyContent: "center" }}>
          <Button
            variant="contained"
            onClick={goToPrevSlide}
            style={{ marginRight: 10 }}
          >
            Previous
          </Button>
          <Button variant="contained" onClick={goToNextSlide}>
            Next
          </Button>
        </CardActions>
      </Card>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <img
            src={images[currentImageIndex]}
            alt={`Image ${currentImageIndex + 1}`}
            style={{ maxWidth: "100%" }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProjectPictures;
