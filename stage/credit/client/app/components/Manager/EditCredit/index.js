/**
 *
 * EditCredit
 *
 */

import React from 'react';
import Button from '../../Common/Button';
import BaseManagerForm from '../BaseManagerForm';


const EditCredit = props => {
    const {
        user,
        credit,
        creditChange,
        formErrors,
        updateCredit,
        deleteCredit,
        activateCredit
    } = props;

    const handleSubmit = event => {
        event.preventDefault();
        updateCredit();
    };

    /* NOTE: slewis 2022-04-30
     * This approach is necessary to avoid bracket 
     * errors when Handlebars auto-generates the code. 
     */
    const entityChange = creditChange;
    const updateItem = updateCredit;
    const deleteItem = deleteCredit;
    const activateItem = activateCredit;
    const theEntity = credit;

    console.log('EditCredit', credit);

    return (
        <BaseManagerForm
            entity={theEntity}
            handleSubmit={handleSubmit}
            formErrors={formErrors}
            entityChange={entityChange}
            user={user}
            hasPrice={false}
            hasParent={false}
            hasFile={false}
            hasDimensions={false}
            hasCategory={false}
        >
            <div className='d-flex flex-column flex-md-row'>
                <Button
                    type='submit'
                    text='Save'
                    className='mb-3 mb-md-0 mr-0 mr-md-3'
                />
                <Button
                    variant='danger'
                    text='Delete'
                    onClick={() => deleteItem(theEntity._id)}
                />
            </div>
        </BaseManagerForm>
    );
};

export default EditCredit;
