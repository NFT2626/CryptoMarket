import React from 'react'
import { Card, CardContent, Typography } from '@mui/material'

function NumberCard({content, number, variant}) {
    return (
        <Card sx={{ boxShadow: 0, bgcolor: "rgba(255, 0, 0, 0)" }}>
        <CardContent>
          <Typography variant= {variant} component="div">
            {content}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {number}
          </Typography>
        </CardContent>
      </Card>
    )
}

export default NumberCard
