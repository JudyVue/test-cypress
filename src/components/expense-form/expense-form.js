import React from 'react';
import PropTypes from 'prop-types';

const defaultState = {
  title: '',
  price: 0,
};

export default class ExpenseForm extends React.Component {
  constructor(props) {
    super(props);
    // TODO: add functionality to handle this.props.expense
    this.state = this.props.expense ? this.props.expense : defaultState;
  }

  handleSubmit = (event) => {
    event.preventDefault();
    // TODO: change this to handleComplete intead of handleAddExpense
    this.props.handleComplete(this.state);

    // this.props.handleAddExpense(this.state);
    this.setState(defaultState);
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    // this bracket notation denotes a computed value or a dynamic property name
    this.setState({
      [name]: value,
    });
  }

  render() {
    const buttonText = this.props.expense ? 'Update Expense' : 'Create Expense';
    return (
      <form onSubmit={ this.handleSubmit }>
        <input 
          type="text"
          name="title"
          placeholder="title"
          value={ this.state.title }
          onChange={ this.handleChange }
        />
        <input 
          type="number"
          name="price"
          placeholder="price"
          value={ this.state.price }
          onChange={ this.handleChange }
        />
        <button type="submit">{buttonText}</button>
      </form>
    );
  }
}

ExpenseForm.propTypes = {
  expense: PropTypes.object,
  handleComplete: PropTypes.func,
};
