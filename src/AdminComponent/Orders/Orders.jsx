import { Card, FormControl, FormControlLabel, RadioGroup, Typography, Radio } from '@mui/material'
import React, { useState, useEffect } from 'react'
import OrderTable from './OrderTable'
import { fetchRestaurantsOrder } from "../../Component/State/Restaurant Order/Action"
import { useDispatch, useSelector } from 'react-redux'

const orderStatus = [
  { label: "Pending", value: "PENDING" },
  { label: "Completed", value: "COMPLETED" },
  { label: "All", value: "" }
]

export const Orders = () => {
  const [filterValue, setFilterValue] = useState("");
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { restaurant } = useSelector((store) => store);

  const handleFilter = (e, value) => {
    setFilterValue(value);
  }

  useEffect(() => {
    dispatch(fetchRestaurantsOrder({
      jwt,
      restaurantId: restaurant.usersRestaurant?.id,
      orderStatus: filterValue || null
    }))
  }, [filterValue])

  return (
    <div className='px-2' style={{ marginLeft: '-20px' }}>
      <Card className='p-5'>
        <Typography sx={{ paddingBottom: "0.5rem" }} variant="h5">
          Order Status
        </Typography>
        <FormControl>
          <RadioGroup onChange={handleFilter} row name='category' value={filterValue}>
            {orderStatus.map((item) => <FormControlLabel
              key={item.label}
              value={item.value}
              control={<Radio />}
              label={item.label}
              sx={{ color: "gray" }}
            />)}
          </RadioGroup>
        </FormControl>
      </Card>
      <OrderTable />
    </div>
  )
}

export default Orders;
