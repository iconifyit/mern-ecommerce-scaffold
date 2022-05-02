/*
 *
 * List Credits
 *
 */

import React from 'react';

import { connect } from 'react-redux';

import actions from '../../actions';

import CreditList from '../../components/Manager/CreditList';
import SubPage from '../../components/Manager/SubPage';
import LoadingIndicator from '../../components/Common/LoadingIndicator';
import NotFound from '../../components/Common/NotFound';

class List extends React.PureComponent {
  componentDidMount() {
    this.props.fetchCredits();
  }

  render() {
    const { history, credits, isLoading } = this.props;
    const items = credits;

    return (
      <>
        <SubPage
          title='Credits'
          actionTitle='Add'
          handleAction={() => history.push('/dashboard/credit/add')}
        >
          {isLoading ? (
            <LoadingIndicator inline />
          ) : credits.length > 0 ? (
            <CreditList credits={items} />
          ) : (
            <NotFound message='no credits found.' />
          )}
        </SubPage>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    credits: state.credit.credits,
    isLoading: state.credit.isLoading,
    user: state.account.user
  };
};

export default connect(mapStateToProps, actions)(List);
