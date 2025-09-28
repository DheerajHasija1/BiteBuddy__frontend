export const isPresentInFavorites = (favorites, restaurantId) => {
    if (!favorites || !restaurantId) return false;
    for(let item of favorites){
        if(item.id === restaurantId){
            return true;
        }
    }
    return false;
};  