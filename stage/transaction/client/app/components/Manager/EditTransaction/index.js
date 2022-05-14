/**
 *
 * EditTransaction
 *
 */

import React from 'react';

const uuidv4 = require('uuid/v4');

import Button from '../../Common/Button';
import { Row, Col } from 'reactstrap';
import Input from '../../Common/Input';
import Switch from '../../Common/Switch';
import SelectOption from '../../Common/SelectOption';


const EditTransaction = props => {
    const {
        user,
        transaction,
        transactionChange,
        formErrors,
        updateTransaction,
        deleteTransaction,
        activateTransaction
    } = props;

    const handleSubmit = event => {
        event.preventDefault();
        updateTransaction();
    };

    /* NOTE: slewis 2022-04-30
     * This approach is necessary to avoid bracket 
     * errors when Handlebars auto-generates the code. 
     */
    const entityChange = transactionChange;
    const updateItem = updateTransaction;
    const deleteItem = deleteTransaction;
    const activateItem = activateTransaction;
    const entity = transaction;

    console.log('EditTransaction', transaction);

    return (
        <form onSubmit={handleSubmit} noValidate>
                <Row>
                    <Col xs='12' lg='6'>
                        <Input
                            type={'number'}
                            error={formErrors['amount']}
                            label={'Amount'}
                            name={'amount'}
                            placeholder={'0.00'}
                            value={ entity.amount }
                            onInputChange={(name, value) => {
                                entityChange(name, value);
                            }}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col xs='12' lg='6'>
                        <Input
                            type={'text'}
                            error={formErrors['memo']}
                            label={'Memo'}
                            name={'memo'}
                            placeholder={'Memo text'}
                            value={ entity.memo }
                            onInputChange={(name, value) => {
                                entityChange(name, value);
                            }}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col xs='12' lg='6'>
                        <SelectOption
                            error={formErrors['user']}
                            label={'User'}
                            multi={false}
                            value={ entity.user }
                            options={ users }
                            handleSelectChange={value => {
                                entityChange('user', value);
                            }}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col xs='12' lg='6'>
                        <Switch
                            id={'active-product'}
                            name={'isDeleted'}
                            label={'Is Deleted'}
                            checked={ entity.isDeleted }
                            toggleCheckboxChange={value => entityChange('isDeleted', value)}
                        />
                    </Col>
                </Row>
                <Row>
                    <div style={{display: "inline-block", padding: "20px"}}>
                        <label>
                            <input
                                name="type"
                                type="radio"
                                value="Credit"
                                checked={ transactionType ===  'Credit' }
                                onChange={() => {
                                    setProductType('Credit');
                                    entityChange('transactionType', 'Credit');
                                }}
                            />&nbsp;Credit&nbsp;
                        </label>
                    </div>
                    <div style={{display: "inline-block", padding: "20px"}}>
                        <label>
                            <input
                                name="type"
                                type="radio"
                                value="Debit"
                                checked={ transactionType ===  'Debit' }
                                onChange={() => {
                                    setProductType('Debit');
                                    entityChange('transactionType', 'Debit');
                                }}
                            />&nbsp;Debit&nbsp;
                        </label>
                    </div>
                    <span className='invalid-message' style={{color: "red"}}>{formErrors['transactionType']}</span>
                </Row>
            <div className='d-flex flex-column flex-md-row'>
                <Button
                    type='submit'
                    text='Save'
                    className='mb-3 mb-md-0 mr-0 mr-md-3'
                />
                <Button
                    variant='danger'
                    text='Delete'
                    onClick={() => deleteItem(entity._id)}
                />
            </div>
        </form>
    );
};

export default EditTransaction;
