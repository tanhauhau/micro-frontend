import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import foodListReducer from './reducer';
import Bridge from '@micro-fe/Bridge';

const reducerMap = {
  foods: foodListReducer,
};

// inject async reducer
Bridge.Channel.publish('registerReducer', reducerMap);

function FoodList({ loading, foods, fetchFoodList }) {
  useEffect(() => {
    fetchFoodList();
  }, []);

  return (
    <>
      <h1>Foods</h1>
      {foods.map(food => (
        <React.Fragment key={food.id}>
          <Link to={'/food/' + food.id}>{food.name}</Link>
          <p>{food.description}</p>
        </React.Fragment>
      ))}
    </>
  );
}

export default connect(
  state => ({
    loading: state.foods.loading,
    foods: state.foods.foods,
  }),
  {
    fetchFoodList() {
      return async dispatch => {
        const foods = await (await window.fetch(
          __BASE_URL__ + '/foods.json'
        )).json();

        dispatch({ type: 'FETCH_FOODS_SUCCESS', data: { foods } });
      };
    },
  }
)(FoodList);
