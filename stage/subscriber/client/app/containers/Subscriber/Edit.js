/*
 *
 * Edit Subscriber
 *
 */

import React from 'react';

import { connect } from 'react-redux';

import actions from '../../actions';

import EditSubscriber from '../../components/Manager/EditSubscriber';
import SubPage from '../../components/Manager/SubPage';
import NotFound from '../../components/Common/NotFound';

class Edit extends React.PureComponent {
  componentDidMount() {
    this.props.resetSubscriber();
    this.props.fetchSubscriber(this.props.match.params.id);
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.props.resetSubscriber();
      this.props.fetchSubscriber(this.props.match.params.id);
    }
  }

  render() {
    const {
      history,
      subscriber,
      formErrors,
      subscriberEditChange,
      updateSubscriber,
      deleteSubscriber,
      activateSubscriber
    } = this.props;

    /* NOTE: slewis 2022-04-30
     * This approach is necessary to avoid bracket 
     * errors when Handlebars auto-generates the code. 
     */
    const editItem = subscriberEditChange;
    const updateItem = updateSubscriber;
    const deleteItem = deleteSubscriber;
    const activateItem = activateSubscriber;
    const item = subscriber;

    return (
      <SubPage
        title='Edit Subscriber'
        actionTitle='Cancel'
        handleAction={history.goBack}
      >
        { item?._id ? (
          <EditSubscriber
            subscriber={item}
            formErrors={formErrors}
            subscriberChange={editItem}
            updateSubscriber={updateItem}
            deleteSubscriber={deleteItem}
            activateSubscriber={activateItem}
          />
        ) : (
          <NotFound message='No subscriber found.' />
        ) }
      </SubPage>
    );
  }
}

const mapStateToProps = state => {
  return {
    subscriber: state.subscriber.subscriber,
    formErrors: state.subscriber.editFormErrors
  };
};

export default connect(mapStateToProps, actions)(Edit);
