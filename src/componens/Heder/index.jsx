import React from 'react'

export default function Heder() {
    return (
        <header>
            <p>ToDo <span>{`${new Date().toJSON().slice(0, 10).split(/-/g).reverse().join(".")}`}</span></p>
        </header>
    )
}
