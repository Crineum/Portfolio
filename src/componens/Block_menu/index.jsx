import axios from 'axios';
import React, { useRef, useState } from 'react'

export default function Menu({ postName, setPostName, setRecord }) {
    const [nameItems, setNameItems] = useState(false);
    const name = useRef('');

    function Post(item) {
        axios(`http://localhost:3001/media/${item.id}`).then(resp => setRecord(() => resp.data))
    }
    async function Cnop_new_items() {
        await axios.post(`http://localhost:3001/media`, { Name: name.current.value, Subtasks: [] }).then(resp => { })
        await axios.post(`http://localhost:3001/name`, { Name: name.current.value }).then(resp => { })
        axios.get('http://localhost:3001/name', {})
            .then(response => setPostName(response.data))
            .then(setNameItems(false))
            .catch(error => console.log(error))
    }
    return (
        <div className="Menu">
            <div className="menuContent">
                <p className='title'>Lists:</p>
                <div className="menu_items">
                    {postName.map((item, index) => {
                        return (
                            <div key={index}>
                                <label className='custom-checkbox'>
                                    <input type="radio" name='Radio' />
                                    <span><p onClick={() => Post(item)}>{item.Name}</p></span>
                                    {/* <span><p onClick={() => setRecord(() => { return { ...item } })}>{item.Name}</p></span> */}
                                </label>
                            </div>
                        )
                    })}
                </div>
                <div className="Cnop_new_items" onClick={() => setNameItems(true)}>
                    <div className="cross" />
                </div>
            </div>
            {nameItems ? <div className="name_items" >
                <div className="name_items_Content">
                    <input ref={name} type="text" placeholder='Введите название' />
                    <div className="name_items_BlockCnop">
                        <p onClick={() => Cnop_new_items()}>Yes</p>
                        <p onClick={() => setNameItems(false)}>No</p>
                    </div>
                </div>
            </div> : ""
            }
        </div >
    )
}
