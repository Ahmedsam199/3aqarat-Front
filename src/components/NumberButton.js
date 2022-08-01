import React from 'react';
import { Col, Input } from 'reactstrap'
const NumberButton = ({ number, handleClick }) => {
    return <Col>
        <Input
            type="button"
            className="form-control"
            value={number}
            onClick={() => handleClick(number)}
        />
    </Col>
};

export default NumberButton;
