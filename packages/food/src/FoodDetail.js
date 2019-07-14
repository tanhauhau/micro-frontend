import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import foodDetailReducer from './reducer';

import Bridge from '@micro-fe/Bridge';

const reducerMap = {
  foods: foodDetailReducer,
};

// inject async reducer
Bridge.Channel.publish('registerReducer', reducerMap);

function FoodDetail({ match, history, food, fetchFoodDetail }) {
  const { id } = match.params;
  useEffect(() => {
    if (!food) {
      fetchFoodDetail(id);
    }
  }, [id, food]);

  return (
    <>
      <Link to="/foods">Food List</Link>
      {food && (
        <>
          <h2>{food.name}</h2>
          <h2>{food.description}</h2>
        </>
      )}
    </>
  );
}

export default connect(
  (
    state,
    {
      match: {
        params: { id },
      },
    }
  ) => ({
    food: state.foods.foodMap[id],
  }),
  {
    fetchFoodDetail(id) {
      return async dispatch => {
        const response = await window.fetch(__BASE_URL__ + `/data/${id}.json`);
        const food = await response.json();

        dispatch({ type: 'FETCH_FOOD_SUCCESS', data: { food } });
      };
    },
  }
)(FoodDetail);
