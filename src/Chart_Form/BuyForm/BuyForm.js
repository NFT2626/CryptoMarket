import React from 'react';
import {Box, Button, Typography} from "@material-ui/core"

const BuyForm = () => {
    const [isBuying, setBuying] = useState(true)
    const [orderOption, setOrderOption] = useState("Limit")
	return <Box>
        <Typography variant="h4">Spot</Typography>
        <Box sx={{display="flex", justifyContent="space-between"}}>
            <Button className={isBuying && "button-green"}>BUY</Button>
            <Button className={!isBuying && "button-red"}>SELL</Button>
        </Box>
        <Box sx={{display="flex"}}>
            <Button> Limit</Button>
            <Button> Market</Button>
            <Button> Stop-limit</Button>
        </Box>
        {() => {
            if(orderOption === "Limit") {
                return (<Limit />)
            }
            else if(orderOption="Market"){
                return (<Market />)
            }
            else{
                return (<StopLimit />)
            }
        }}
    </Box>
};

export default BuyForm;
