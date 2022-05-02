/**
 *
 * EditSubscriber
 *
 */

import React from 'react';
import Button from '../../Common/Button';
import BaseManagerForm from '../BaseManagerForm';


const EditSubscriber = props => {
    const {
        user,
        subscriber,
        subscriberChange,
        formErrors,
        updateSubscriber,
        deleteSubscriber,
        activateSubscriber
    } = props;

    const handleSubmit = event => {
        event.preventDefault();
        updateSubscriber();
    };

    /* NOTE: slewis 2022-04-30
     * This approach is necessary to avoid bracket 
     * errors when Handlebars auto-generates the code. 
     */
    const entityChange = subscriberChange;
    const updateItem = updateSubscriber;
    const deleteItem = deleteSubscriber;
    const activateItem = activateSubscriber;
    const theEntity = subscriber;

    console.log('EditSubscriber', subscriber);

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

export default EditSubscriber;
