import React from 'react'
export function AddButton({
    onAddTabPress
}) {
    return (
        <div onClick={onAddTabPress} className="addButton" >
            +
        </div>
    )
}
