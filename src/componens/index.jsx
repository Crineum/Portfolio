import React from 'react'
import Heder from './Heder';
import Menu from './Block_menu';
import Content from './Block_content';
import Post from '../assets/task.json'
import './index.scss';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';

export default function Index() {
    const [postName, setPostName] = useState([]);
    const [record, setRecord] = useState({ "Name": "", "Subtasks": [] });
    useEffect(() => {
        axios.get('http://localhost:3001/name', {})
            .then(response => setPostName(response.data))
            .catch(error => console.log(error))
    }, [])


    return (
        <>
            <Heder />
            <div className='Content'>
                {/* <Menu post={post} setRecord={setRecord} Post={Post} /> */}
                <Menu postName={postName} setPostName={setPostName} setRecord={setRecord} />
                <Content record={record} setRecord={setRecord} Post={Post} />
            </div>
        </>
    )
}
