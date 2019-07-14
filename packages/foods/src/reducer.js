const INITIAL_STATE = {
  foods: [],
  foodMap: {},
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'FETCH_FOODS_SUCCESS':
      const foodMap = { ...state.foodMap };
      action.data.foods.forEach(food => {
        foodMap[food.id] = food;
      });
      return { ...state, foods: action.data.foods, foodMap };
    default:
      return state;
  }
}
