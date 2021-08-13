import React from 'react';
import {Col, Row} from 'reactstrap'

const RowBlock = ({itemList, itemInfo}) => {
  return (
    <Row>
      <Col md='6'>
        {itemList}
      </Col>
      <Col md='6'>
          {itemInfo}
      </Col>
  </Row>
  )
}

export default RowBlock