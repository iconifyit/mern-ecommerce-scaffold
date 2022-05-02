/**
 *
 * AddCredit
 *
 */

import React from 'react';

const uuidv4 = require('uuid/v4');

import Button from '../../Common/Button';
import BaseManagerForm from '../BaseManagerForm';

const AddCredit = props => {
    const {
        user,
        creditFormData,
        formErrors,
        creditChange,
        addCredit,
    } = props;

    const handleSubmit = event => {
        event.preventDefault();
        addCredit();
    };

    /* NOTE: slewis 2022-04-30
     * This approach is necessary to avoid bracket 
     * errors when Handlebars auto-generates the code. 
     */
    const theEntity = creditFormData;
    const entityChange = creditChange;
    const addItem = addCredit;

    theEntity.uuid = uuidv4();

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
        <div className='add-credit-actions'>
            <Button type='submit' text='Add Credit' />
        </div>
        </BaseManagerForm>
    );
};

export default AddCredit;
