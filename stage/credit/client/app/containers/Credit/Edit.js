/*
 *
 * Edit Credit
 *
 */

import React from 'react';

import { connect } from 'react-redux';

import actions from '../../actions';

import EditCredit from '../../components/Manager/EditCredit';
import SubPage from '../../components/Manager/SubPage';
import NotFound from '../../components/Common/NotFound';

class Edit extends React.PureComponent {
  componentDidMount() {
    this.props.resetCredit();
    this.props.fetchCredit(this.props.match.params.id);
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.props.resetCredit();
      this.props.fetchCredit(this.props.match.params.id);
    }
  }

  render() {
    const {
      history,
      credit,
      formErrors,
      creditEditChange,
      updateCredit,
      deleteCredit,
      activateCredit
    } = this.props;

    /* NOTE: slewis 2022-04-30
     * This approach is necessary to avoid bracket 
     * errors when Handlebars auto-generates the code. 
     */
    const editItem = creditEditChange;
    const updateItem = updateCredit;
    const deleteItem = deleteCredit;
    const activateItem = activateCredit;
    const item = credit;

    return (
      <SubPage
        title='Edit Credit'
        actionTitle='Cancel'
        handleAction={history.goBack}
      >
        { item?._id ? (
          <EditCredit
            credit={item}
            formErrors={formErrors}
            creditChange={editItem}
            updateCredit={updateItem}
            deleteCredit={deleteItem}
            activateCredit={activateItem}
          />
        ) : (
          <NotFound message='No credit found.' />
        ) }
      </SubPage>
    );
  }
}

const mapStateToProps = state => {
  return {
    credit: state.credit.credit,
    formErrors: state.credit.editFormErrors
  };
};

export default connect(mapStateToProps, actions)(Edit);
