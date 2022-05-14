/**
 *
 * AddTransaction
 *
 */

import React from 'react';

const uuidv4 = require('uuid/v4');

import Button from '../../Common/Button';
import { Row, Col } from 'reactstrap';
import Input from '../../Common/Input';
import Switch from '../../Common/Switch';
import SelectOption from '../../Common/SelectOption';

const AddTransaction = props => {
    const {
        user,
        transactionFormData,
        formErrors,
        transactionChange,
        addTransaction,
    } = props;

    const handleSubmit = event => {
        event.preventDefault();
        addTransaction();
    };

    /* NOTE: slewis 2022-04-30
     * This approach is necessary to avoid bracket 
     * errors when Handlebars auto-generates the code. 
     */
    const entity = transactionFormData;
    const entityChange = transactionChange;
    const addItem = addTransaction;

    entity.uuid = uuidv4();

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
                            label={ 'User' }
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
                            id={'isDeleted'}
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
            <div className='add-transaction-actions'>
                <Button type='submit' text='Add Transaction' />
            </div>
        </form>
    );
};

export default AddTransaction;
