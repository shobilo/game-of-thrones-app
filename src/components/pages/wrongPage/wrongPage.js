import React from 'react';
import Button from 'reactstrap/lib/Button';
import {Link} from 'react-router-dom'
import './wrongPage.css'

const WrongPage = () => {
  return (
    <div className="block rounded">
      <h4>Oops, seems like you visit the wrong door</h4>
      <p>To come back on home page, click the button below</p>
      <Button color="primary">
        <Link to='/'>Home</Link>
      </Button>
    </div>
  )
}

export default WrongPage