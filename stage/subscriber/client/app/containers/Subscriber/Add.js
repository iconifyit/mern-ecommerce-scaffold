/*
 *
 * Add Subscriber
 *
 */

import React from 'react';

import { connect } from 'react-redux';

import actions from '../../actions';

import AddSubscriber from '../../components/Manager/AddSubscriber';
import SubPage from '../../components/Manager/SubPage';

class Add extends React.PureComponent {
  componentDidMount() {}

  render() {
    const {
      history,
      subscriberFormData,
      formErrors,
      subscriberChange,
      addSubscriber
    } = this.props;

    /* NOTE: slewis 2022-04-30
     * This approach is necessary to avoid bracket 
     * errors when Handlebars auto-generates the code. 
     */
    const changeItem = subscriberChange;
    const addItem = addSubscriber;
    const formData = subscriberFormData;

    return (
      <SubPage
        title='Add Subscriber'
        actionTitle='Cancel'
        handleAction={() => history.goBack()}
      >
        <AddSubscriber
          subscriberFormData={formData}
          formErrors={formErrors}
          subscriberChange={changeItem}
          addSubscriber={addItem}
        />
      </SubPage>
    );
  }
}

const mapStateToProps = state => {
  return {
    subscriberFormData: state.subscriber.subscriberFormData,
    formErrors: state.subscriber.formErrors
  };
};

export default connect(mapStateToProps, actions)(Add);
