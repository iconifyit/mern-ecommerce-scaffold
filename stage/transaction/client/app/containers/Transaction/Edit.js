/*
 *
 * Edit Transaction
 *
 */

import React from 'react';

import { connect } from 'react-redux';

import actions from '../../actions';

import EditTransaction from '../../components/Manager/EditTransaction';
import SubPage from '../../components/Manager/SubPage';
import NotFound from '../../components/Common/NotFound';

class Edit extends React.PureComponent {
  componentDidMount() {
    this.props.resetTransaction();
    this.props.fetchTransaction(this.props.match.params.id);
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.props.resetTransaction();
      this.props.fetchTransaction(this.props.match.params.id);
    }
  }

  render() {
    const {
      history,
      transaction,
      formErrors,
      transactionEditChange,
      updateTransaction,
      deleteTransaction,
      activateTransaction
    } = this.props;

    /* NOTE: slewis 2022-04-30
     * This approach is necessary to avoid bracket 
     * errors when Handlebars auto-generates the code. 
     */
    const editItem = transactionEditChange;
    const updateItem = updateTransaction;
    const deleteItem = deleteTransaction;
    const activateItem = activateTransaction;
    const item = transaction;

    return (
      <SubPage
        title='Edit Transaction'
        actionTitle='Cancel'
        handleAction={history.goBack}
      >
        { item?._id ? (
          <EditTransaction
            transaction={item}
            formErrors={formErrors}
            transactionChange={editItem}
            updateTransaction={updateItem}
            deleteTransaction={deleteItem}
            activateTransaction={activateItem}
          />
        ) : (
          <NotFound message='No transaction found.' />
        ) }
      </SubPage>
    );
  }
}

const mapStateToProps = state => {
  return {
    transaction: state.transaction.transaction,
    formErrors: state.transaction.editFormErrors
  };
};

export default connect(mapStateToProps, actions)(Edit);
