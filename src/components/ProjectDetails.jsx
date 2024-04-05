import React from "react";

const ProjectDetails = (props) => {
  return (
    <>
      <div>
        placeholders: will change to material ui components w/ propped data
      </div>

      <div>project id</div>
      <div>user id (owner)</div>

      <div>project title</div>
      <div>project description</div>
      <div>project target ($)</div>
      <div>project current total ($)</div>
      <div>project created date</div>
      <div>project end date</div>
    </>
  );
};

export default ProjectDetails;

/*
prop:
-[] project id
-[] user id (owner)
-[] project title
-[] project description
-[] project images
-[] project target
-[] project current total
-[] project created date
-[] project end date

ux flow:
- as user: 
    main page -> project page (contains components) -> <ProjectDetails />, <QandA />, <ImageCarousell />
                 ^prop project id & contributor id   

*/
