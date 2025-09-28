export const isPresentInFavorites = (favorites, restaurantId) => {
    for(let item of favorites){
        if(item.id === restaurantId){
            return true;
        }
    }
    return false;
};