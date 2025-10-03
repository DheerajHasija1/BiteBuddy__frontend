import React from 'react'
import { Box, Card, CardHeader, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material'
import CreateIcon from '@mui/icons-material/Create'


const  FoodCategoryTable =() => {
    return (
    <Box>
        <Card sx={{mt: 0}}> 
        <CardHeader 
             action={
          <IconButton aria-label="settings">
            <CreateIcon />
          </IconButton>
            }

            title={"Food Category"} 
            sx={{pt: 1, pb: 1, alignItems:"center"}} 
        />
        
        
        <TableContainer component={Paper} sx={{boxShadow: 0}}> 
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
                <TableRow> 
                <TableCell align="left" sx={{py: 1}}>Id</TableCell>
                <TableCell align="left" sx={{py: 1}}>Name</TableCell>
                </TableRow>
            </TableHead>
            
            <TableBody>
                <TableRow  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align="left" sx={{py: 1}}>{"id"}</TableCell>
                    <TableCell align="left" sx={{py: 1}}>{"name"}</TableCell>
                </TableRow>
            </TableBody>
            </Table>
        </TableContainer>
        </Card>
    </Box>
    )
}

export default FoodCategoryTable;