/*
 *
 * List Transactions
 *
 */

import React from 'react';

import { connect } from 'react-redux';

import actions from '../../actions';

import TransactionList from '../../components/Manager/TransactionList';
import SubPage from '../../components/Manager/SubPage';
import LoadingIndicator from '../../components/Common/LoadingIndicator';
import NotFound from '../../components/Common/NotFound';

class List extends React.PureComponent {
  componentDidMount() {
    this.props.fetchTransactions();
  }

  render() {
    const { history, transactions, isLoading } = this.props;
    const items = transactions;

    return (
      <>
        <SubPage
          title='Transactions'
          actionTitle='Add'
          handleAction={() => history.push('/dashboard/transaction/add')}
        >
          {isLoading ? (
            <LoadingIndicator inline />
          ) : transactions.length > 0 ? (
            <TransactionList transactions={items} />
          ) : (
            <NotFound message='no transactions found.' />
          )}
        </SubPage>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    transactions: state.transaction.transactions,
    isLoading: state.transaction.isLoading,
    user: state.account.user
  };
};

export default connect(mapStateToProps, actions)(List);
