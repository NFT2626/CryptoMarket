//Importing libraries
import React from 'react'
import { Card, CardContent, Typography } from '@mui/material'
//this component is responsible for displaying a card to describe information of the coin eg. the volume data

function NumberCard({content, number, variant}) {
    return (
        <Card sx={{ boxShadow: 0, bgcolor: "rgba(255, 0, 0, 0)" }} elevation={0}>
        <CardContent>
          <Typography variant= {variant} component="div" //the content ie. the title
          >
            {content}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary"
          //the number that goes along with the title
          >
            {number}
          </Typography>
        </CardContent>
      </Card>
    )
}

export default NumberCard
