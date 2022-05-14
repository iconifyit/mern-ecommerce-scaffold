/*
 *
 * Transaction
 *
 */

import React from 'react';

import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import actions from '../../actions';
 
import List from './List';
import Add from './Add';
import Edit from './Edit';
import Page404 from '../../components/Common/Page404';

class Transaction extends React.PureComponent {
  render() {
    const { user } = this.props;

    return (
      <div className='transaction-dashboard'>
        <Switch>
          <Route exact path='/dashboard/transaction' component={List} />
          {user.role === 'ROLE_ADMIN' && ( 
                <React.Fragment>
                    <Route exact path='/dashboard/transaction/edit/:id' component={Edit} />
                    <Route exact path='/dashboard/transaction/add' component={Add} />
                </React.Fragment>
          )}
          <Route path='*' component={Page404} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.account.user
  };
};

export default connect(mapStateToProps, actions)(Transaction);
