import React from 'react';
import Food from '../../controller/food/index';
import Button from '../../components/button/index';
import Table from '../../components/table/index';

class FoodPage extends React.Component{
  render(){
    const f = new Food('caption', 'head', 'data', 'foot');
    return(
      <div>
        <Table food={f} />
        <Button text="Food Button"/>
      </div>
    );
  }
}

export default FoodPage;
