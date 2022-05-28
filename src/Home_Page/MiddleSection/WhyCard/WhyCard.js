//Importing libraries
import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

//This is used by the middle section and is responsible for displaying a card with information

//it takes an image and content as it's parameters
//the image is displayed on the local directory 

export default function WhyCard({ image, content }) {
  return (
    <Card //Create a card component 
      elevation={0} //make sure it does not have any shadow
      sx={{ maxWidth: "300px", minHeight: "100px", margin: "10px" }} //css
    >
      <CardActionArea> {/*Acts like a button*/}
        <CardMedia
          component="img" //Declare that it is an image component
          height="80" 
          image={`/Images/${image}.png`} //this is the source for the image
          alt={`${image}`}
        />
        <CardContent> {/*The content of the card*/}
          <Typography style={{color: 'orange'}} gutterBottom variant="h5" component="div" //The name or title of the card
          >
            {image}
          </Typography>
          <Typography variant="body2" color="text.secondary" //Description of what the title is talking about
          >
            {content}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
