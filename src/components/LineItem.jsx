import React from 'react'
import { FaTrashAlt } from "react-icons/fa"

export const LineItem = ({ item, handleChange, handleDelete }) => {
    return (
        <li className="item">
            <input
                type="checkbox"
                checked={item.checked}
                onChange={() => handleChange(item.id)}
            />
            <label
                onClick={() => handleChange(item.id)}
                style={(item.checked) ? { textDecoration: 'line-through' } : null}
            >{item.item}
            </label>
            <FaTrashAlt
                onClick={() => handleDelete(item.id)}
                role="button"
                tabIndex={0}
            />
        </li>
    )
}
