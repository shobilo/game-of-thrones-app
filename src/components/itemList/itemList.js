import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types'
import Spinner from '../spinner'

import './itemList.css';

function ItemList(props) {

    const [itemList, updateItemList] = useState([])

    useEffect(() => {
        const {getData} = props;
        getData()
            .then((data) => {
                updateItemList(data)
                })
    }, [])

    const renderItems = (array) => {
        return array.map(item => {
            const {id} = item
            const label = props.renderItem(item)
            return (
                <li
                    key={id}
                    className="list-group-item"
                    onClick={() => props.onItemSelected(item.id)}
                    >
                    {label}
                </li>
            )
        })
    }

    if (!itemList) {
        return <Spinner/>
    }

    const items = renderItems(itemList)

    return (
        <ul className="item-list list-group">
            {items}
        </ul>
    );
}

export default ItemList

    
ItemList.defaultProps = {
    onItemSelected: () => {}
}

ItemList.propTypes = {
    onItemSelected: PropTypes.func
}

