const INITIAL_STATE = {
  foods: [],
  foodMap: {},
};
export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'FETCH_FOOD_SUCCESS': {
      const { food } = action.data;
      const foodIndex = state.foods.findIndex(_food => _food.id === food.id);
      return {
        ...state,
        foods: foodIndex > -1 ? state.foods : [...state.foods, food],
        foodMap: {
          ...state.foodMap,
          [food.id]: food,
        },
      };
    }
    default:
      return state;
  }
}
