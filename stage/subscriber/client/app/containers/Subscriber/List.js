/*
 *
 * List Subscribers
 *
 */

import React from 'react';

import { connect } from 'react-redux';

import actions from '../../actions';

import SubscriberList from '../../components/Manager/SubscriberList';
import SubPage from '../../components/Manager/SubPage';
import LoadingIndicator from '../../components/Common/LoadingIndicator';
import NotFound from '../../components/Common/NotFound';

class List extends React.PureComponent {
  componentDidMount() {
    this.props.fetchSubscribers();
  }

  render() {
    const { history, subscribers, isLoading } = this.props;
    const items = subscribers;

    return (
      <>
        <SubPage
          title='Subscribers'
          actionTitle='Add'
          handleAction={() => history.push('/dashboard/subscriber/add')}
        >
          {isLoading ? (
            <LoadingIndicator inline />
          ) : subscribers.length > 0 ? (
            <SubscriberList subscribers={items} />
          ) : (
            <NotFound message='no subscribers found.' />
          )}
        </SubPage>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    subscribers: state.subscriber.subscribers,
    isLoading: state.subscriber.isLoading,
    user: state.account.user
  };
};

export default connect(mapStateToProps, actions)(List);
