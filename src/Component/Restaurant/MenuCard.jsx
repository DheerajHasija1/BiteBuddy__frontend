import React, { useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import { categorizeIngredients } from '../Util/CategorizeIngredients';
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../State/Cart/Action';

const MenuCard = ({ item }) => {
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const dispatch = useDispatch();
  
  const handleAddItemToCart = (e) => {
    e.preventDefault();
    const reqData = {
      token: localStorage.getItem("jwt"),
      cartItem: {
        foodId: item.id,
        quantity: 1,
        ingredients: selectedIngredients,
      },
    };  
    dispatch(addItemToCart(reqData));
    console.log("reqData", reqData);
  };
    
  const handleCheckBoxChange = (itemName) => {
    console.log("itemName", itemName);
    if (selectedIngredients.includes(itemName)) {
      setSelectedIngredients(selectedIngredients.filter(item => item !== itemName));
    } else {
      setSelectedIngredients([...selectedIngredients, itemName]);
    }
  }

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1-content"
        id="panel1-header"
      >
        <div className='lg:flex items-center justify-between w-full'>
          <div className='lg:flex items-center lg:gap-5'>
            <img 
              className='w-[7rem] h-[7rem] object-cover rounded' 
              src={item.images && item.images.length > 0 ? item.images[0] : 'https://via.placeholder.com/150'} 
              alt={item.name} 
            />
            <div className='space-y-1 lg:space-y-5 lg:max-w-2xl'>
              <p className='font-semibold text-xl'>{item.name}</p>
              <p className='text-green-500 font-bold'>₹{item.price}</p>
              <p className='text-gray-400'>{item.description}</p>
            </div>
          </div>
        </div>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
          <div>
            <div className='flex gap-5 flex-wrap'>
              {item.ingredients && item.ingredients.length > 0 ? (
                Object.keys(categorizeIngredients(item.ingredients)).map((category) => (
                  <div key={category}>
                    <p className='font-semibold text-lg mb-2'>{category}</p>
                    <FormGroup>
                      {categorizeIngredients(item.ingredients)[category].map((ingredient) => (
                        <FormControlLabel 
                          key={ingredient.id}
                          control={
                            <Checkbox
                              onChange={() => handleCheckBoxChange(ingredient.name)}
                            />
                          } 
                          label={ingredient.name} 
                        />
                      ))}
                    </FormGroup>
                  </div>
                ))
              ) : (
                <p className='text-gray-500'>No ingredients available</p>
              )}
            </div>

            <div className='pt-5'>
              <Button 
                onClick={handleAddItemToCart}
                variant='contained' 
                disabled={!item.available}
              >
                {item.available ? "ADD TO CART" : "Out of Stock"}
              </Button>
            </div>
          </div>
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
};

export default MenuCard;
