import React, { useRef, useState } from 'react'
import axios from 'axios';

export default function Content({ record, setRecord }) {
    const [nameRecord, setNameRecord] = useState(false);
    const name = useRef('');

    function Cnop_new_record() {
        if (name.current.value.trim() !== "") {
            setRecord(i => {
                i.Subtasks.push({ Name: name.current.value, Through: 0 })
                axios.put(`http://localhost:3001/media/${record.id}`, i)
                return i;
            })
            setNameRecord(false);
        } else {
            alert("Введите название")
        }
    }

    function Strikethrough(index) {
        setRecord(i => {
            i.Subtasks[index].Through = 1;
            axios.put(`http://localhost:3001/media/${record.id}`, i).then(respons => { })
                .catch(err => console.log(err))
            return { ...i };
        })
    }

    return (
        <div className="Content">
            <p className='title'>{record.Name}</p>
            <div className="Content_record">
                {(record.Subtasks).map((item, index) => {
                    return (
                        <div key={index} className={item.Through === 1 ? "inactive" : ""}>
                            <label className='custom-checkbox'>
                                <input type="checkbox" />
                                <span></span>
                            </label>
                            <p className={item.Through === 1 ? 'strikethrough_text' : ""} onClick={() => Strikethrough(index)}>{item.Name}</p>
                        </div>
                    )
                })}
            </div>
            <div className="Cnop_new_record">
                {/* <div className="contentCross"></div> */}
                {(record.Name !== "") ? <p onClick={() => setNameRecord(true)}>add task</p> : ''}
            </div>
            {nameRecord ? <div className="name_record" >
                <div className="name_record_Content">
                    <input ref={name} type="text" placeholder='Введите название' />
                    <div className="name_record_BlockCnop">
                        <p onClick={() => Cnop_new_record()}>Yes</p>
                        <p onClick={() => setNameRecord(false)}>No</p>
                    </div>
                </div>
            </div> : ""
            }
        </div >
    )
}
