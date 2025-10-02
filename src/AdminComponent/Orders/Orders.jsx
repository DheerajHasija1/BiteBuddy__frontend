import { Card, FormControl, FormControlLabel, RadioGroup, Typography,Radio } from '@mui/material'
import React, { useState } from 'react'
import OrderTable from './OrderTable'
import { Margin } from '@mui/icons-material'


const orderStatus = [
  {label:"Pending", value:"PENDING"},
  {label:"Completed", value:"COMPLETED"},
  {label:"All", value:"ALL"}
]

export const Orders = () => {
  const [filterValue, setFilterValue] = useState();

  const handleFilter =(e,value) =>{
    setFilterValue(value);
  }
  
return (
  <div className='px-2' style={{marginLeft: '-20px'}}> 
    <Card className='p-5'>
      <Typography sx={{paddingBottom:"0.5rem"}} variant="h5"> 
        Order Status
      </Typography>
      <FormControl>
        <RadioGroup onChange={handleFilter} row name='category' value={filterValue || "all"}>
          {orderStatus.map((item) => <FormControlLabel
            key={item.label}
            value={item.value}
            control={<Radio/>}
            label={item.label}
            sx={{color:"gray"}}
          />)}
        </RadioGroup>
      </FormControl>
    </Card>
    <OrderTable />
  </div>
)

}

export default Orders;