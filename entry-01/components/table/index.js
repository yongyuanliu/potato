import React from 'react';
import './table.css';

class Table extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <table>
        <caption>{this.props.food.caption}</caption>
        <thead>
          <tr>
            <th>{this.props.food.head}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{this.props.food.data}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td>{this.props.food.foot}</td>
          </tr>
        </tfoot> 
      </table>
    ); 
  }
}

export default Table;
