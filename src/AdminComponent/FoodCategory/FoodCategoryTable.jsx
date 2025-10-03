import React from 'react'
import { Box, Card, CardHeader, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material'
import CreateIcon from '@mui/icons-material/Create'
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CreateFoodCategoryForm from './CreateFoodCategoryForm';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const  FoodCategoryTable =() => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
    <Box>
        <Card sx={{mt: 0}}> 
        <CardHeader 
             action={
          <IconButton onClick={handleOpen} aria-label="settings">
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

        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
            <Box sx={style}>
                <CreateFoodCategoryForm/>
            </Box>
        </Modal>
    </Box>
    )
}

export default FoodCategoryTable;