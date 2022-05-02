/*
 *
 * Add Credit
 *
 */

import React from 'react';

import { connect } from 'react-redux';

import actions from '../../actions';

import AddCredit from '../../components/Manager/AddCredit';
import SubPage from '../../components/Manager/SubPage';

class Add extends React.PureComponent {
  componentDidMount() {}

  render() {
    const {
      history,
      creditFormData,
      formErrors,
      creditChange,
      addCredit
    } = this.props;

    /* NOTE: slewis 2022-04-30
     * This approach is necessary to avoid bracket 
     * errors when Handlebars auto-generates the code. 
     */
    const changeItem = creditChange;
    const addItem = addCredit;
    const formData = creditFormData;

    return (
      <SubPage
        title='Add Credit'
        actionTitle='Cancel'
        handleAction={() => history.goBack()}
      >
        <AddCredit
          creditFormData={formData}
          formErrors={formErrors}
          creditChange={changeItem}
          addCredit={addItem}
        />
      </SubPage>
    );
  }
}

const mapStateToProps = state => {
  return {
    creditFormData: state.credit.creditFormData,
    formErrors: state.credit.formErrors
  };
};

export default connect(mapStateToProps, actions)(Add);
