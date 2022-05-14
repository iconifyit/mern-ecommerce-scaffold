/*
 *
 * Add Transaction
 *
 */

import React from 'react';

import { connect } from 'react-redux';

import actions from '../../actions';

import AddTransaction from '../../components/Manager/AddTransaction';
import SubPage from '../../components/Manager/SubPage';

class Add extends React.PureComponent {
  componentDidMount() {}

  render() {
    const {
      history,
      transactionFormData,
      formErrors,
      transactionChange,
      addTransaction
    } = this.props;

    /* NOTE: slewis 2022-04-30
     * This approach is necessary to avoid bracket 
     * errors when Handlebars auto-generates the code. 
     */
    const changeItem = transactionChange;
    const addItem = addTransaction;
    const formData = transactionFormData;

    return (
      <SubPage
        title='Add Transaction'
        actionTitle='Cancel'
        handleAction={() => history.goBack()}
      >
        <AddTransaction
          transactionFormData={formData}
          formErrors={formErrors}
          transactionChange={changeItem}
          addTransaction={addItem}
        />
      </SubPage>
    );
  }
}

const mapStateToProps = state => {
  return {
    transactionFormData: state.transaction.transactionFormData,
    formErrors: state.transaction.formErrors
  };
};

export default connect(mapStateToProps, actions)(Add);
