import React, {useState} from 'react';
import {Box, Button, Typography, Tabs, Tab, TabPanel} from "@material-ui/core"

const BuyForm = () => {
    const [limit, setLimit] = useState('')
    
    const handleChange = (event) => {
        setLimit(event.target.value);
      };
	return <Box>
        <Box style={{backgroundColor: 'grey', paddingLeft: 10, paddingRight: 15}}>
         <Tabs
        value={limit}
        onChange={handleChange}
        indicatorColor="primary"
      >
        <Tab tabItemContainerStyle={{width: '20px'}}
  style={ {minWidth: 20,
    paddingLeft: 0,
    paddingRight: 0,
letterSpacing: '-0.1em', fontSize: '0.8em'}}
   label="Limit" />
        <Tab style={ {minWidth: 20,
    paddingLeft: 0,
    paddingRight: 0,
letterSpacing: '-0.1em', fontSize: '0.8em', marginLeft: '10px'}} label="Market" />
      </Tabs>

</Box>
            <Box style={{fontSize: '0.5em'}}>
                <caption style={{display:"inline"}}> Available Balance: 9.9999 USDT</caption>
                </Box>

    </Box>
};

export default BuyForm;
