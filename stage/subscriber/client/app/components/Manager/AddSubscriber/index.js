/**
 *
 * AddSubscriber
 *
 */

import React from 'react';

const uuidv4 = require('uuid/v4');

import Button from '../../Common/Button';
import BaseManagerForm from '../BaseManagerForm';

const AddSubscriber = props => {
    const {
        user,
        subscriberFormData,
        formErrors,
        subscriberChange,
        addSubscriber,
    } = props;

    const handleSubmit = event => {
        event.preventDefault();
        addSubscriber();
    };

    /* NOTE: slewis 2022-04-30
     * This approach is necessary to avoid bracket 
     * errors when Handlebars auto-generates the code. 
     */
    const theEntity = subscriberFormData;
    const entityChange = subscriberChange;
    const addItem = addSubscriber;

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
        <div className='add-subscriber-actions'>
            <Button type='submit' text='Add Subscriber' />
        </div>
        </BaseManagerForm>
    );
};

export default AddSubscriber;
