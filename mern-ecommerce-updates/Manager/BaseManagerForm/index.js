/**
 *
 * ProductForm
 *
 */

import React from 'react';

const uuidv4 = require('uuid/v4');
import { Row, Col } from 'reactstrap';

import Input from '../../Common/Input';
import Switch from '../../Common/Switch';
import SelectOption from '../../Common/SelectOption';

const BaseManagerForm = props => {
    const {
        handleSubmit,
        entityChange,
        entity,
        children,
        parents,
        user,
        formErrors,
        hasDimensions,
        hasPrice,
        hasParent,
        hasFile,
        hasCategory,
        hasType,
        categories
    } = props;

    const [productType, setProductType] = React.useState(entity.type ? entity.type : null);

    console.log('BaseManagerForm', entity)

    return (
        <form onSubmit={handleSubmit} noValidate>
            <Row>
                <Col xs='12' lg='6'>
                    <Input
                        type={'text'}
                        error={formErrors['name']}
                        label={'Name'}
                        name={'name'}
                        placeholder={'Name'}
                        value={entity.name}
                        onInputChange={(name, value) => {
                            entityChange(name, value);
                        }}
                    />
                </Col>
                <Col xs='12' lg='6'>
                    <Input
                        type={'text'}
                        label={'UUID'}
                        name={'uuid'}
                        placeholder={'UUID (IconJar)'}
                        value={entity.uuid || 'undefined'}
                        onInputChange={(name, value) => {
                            entityChange(name, value);
                        }}
                        readonly
                    />
                </Col>
            </Row>
            <Row>
                <Col xs='12' md='12'>
                    <Input
                        type={'textarea'}
                        error={formErrors['tags']}
                        label={'Tags'}
                        name={'tags'}
                        placeholder={'Product Tags'}
                        value={entity.tags}
                        onInputChange={(name, value) => {
                            entityChange(name, value);
                        }}
                    />
                </Col>
            </Row>
            <Row>
            {hasPrice && (
                <Col xs='12' lg='4'>
                    <Input
                        type={'number'}
                        error={formErrors['price']}
                        label={'Price'}
                        name={'price'}
                        min={1}
                        placeholder={'Product Price'}
                        value={entity.price}
                        onInputChange={(name, value) => {
                            entityChange(name, value);
                        }}
                    />
                </Col>
            )}
            {hasDimensions && (
                <React.Fragment>
                    <Col xs='4' lg='4'>
                        <Input
                            type={'number'}
                            error={formErrors['width']}
                            label={'width (px)'}
                            name={'width'}
                            min={1}
                            placeholder={'Width'}
                            value={entity.width}
                            onInputChange={(name, value) => {
                                entityChange(name, value);
                            }}
                        />
                    </Col>
                    <Col xs='4' lg='4'>
                        <Input
                            type={'number'}
                            error={formErrors['height']}
                            label={'Height (px)'}
                            name={'height'}
                            min={1}
                            placeholder={'Height'}
                            value={entity.height}
                            onInputChange={(name, value) => {
                                entityChange(name, value);
                            }}
                        />
                    </Col>
                </React.Fragment>
            )}
            </Row>
            <Row>
                {hasParent &&  (
                    <Col xs='12' lg='6'>
                        <SelectOption
                            error={formErrors['parent']}
                            label={'Select Parent'}
                            multi={false}
                            value={entity.parent}
                            options={parents}
                            handleSelectChange={value => {
                                entityChange('parent', value);
                            }}
                        />
                    </Col>
                )}
                {hasCategory &&  (
                    <Col xs='12' lg='6'>
                        <SelectOption
                            error={formErrors['categories']}
                            label={'Select Categories'}
                            multi={true}
                            defaultValue={entity.categories}
                            options={categories}
                            handleSelectChange={value => {
                                entityChange('categories', value);
                            }}
                        />
                    </Col>
                )}
            </Row>
            {hasType && (
                <Row>
                    <Col xs='12' lg='6'>
                        <div style={{display: "inline-block", padding: "20px"}}>
                            <label>
                                <input
                                    name="type"
                                    type="radio"
                                    value="Icon"
                                    checked={productType === 'Icon'}
                                    onChange={() => {
                                        setProductType('Icon')
                                        entityChange('type', 'Icon');
                                    }}
                                />&nbsp;Icon&nbsp;
                            </label>
                        </div>
                        <div style={{display: "inline-block", padding: "20px"}}>
                            <label>
                                <input
                                    name="type"
                                    type="radio"
                                    value="Illustration"
                                    checked={productType === 'Illustration'}
                                    onChange={() => {
                                        setProductType('Illustration')
                                        entityChange('type', 'Illustration');
                                    }}
                                />&nbsp;Illustration&nbsp;
                            </label>
                        </div>
                        <span className='invalid-message' style={{color: "red"}}>{formErrors['type']}</span>
                    </Col>
                    {hasFile && (
                        <Col xs='12' lg='6'>
                            <Input
                                type={'file'}
                                error={formErrors['file']}
                                name={'file'}
                                label={'file'}
                                placeholder={'Please Upload Image'}
                                onInputChange={(name, value) => {
                                    entityChange(name, value);
                                }}
                            />
                        </Col>
                    )}
                </Row>
            )}
            <Row>
                <Col xs='12' md='12' className='my-2'>
                    <Switch
                        id={'active-product'}
                        name={'isActive'}
                        label={'Active?'}
                        checked={entity.isActive}
                        toggleCheckboxChange={value => entityChange('isActive', value)}
                    />
                </Col>
            </Row>
            <hr />
            {children}
        </form>
    );
};

export default BaseManagerForm;
