import React, { useEffect, useState } from 'react'
import "./User.css"

export default function Users() {
   const [users,setUsers] = useState([])
    const [showMore,setShowMore] = useState(3)
    const [classChanges,setClassChanges] = useState(true);
    const [viewCreate,setViewCreate] = useState(false);
    const [viewEdit,setViewEdit] = useState(-1);

    useEffect(()=>{
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(json => setUsers(json))
    },[]);



    /*Создает блоки с постами*/
    function Users({item,index}){
        const [view,setView] = useState(false);
        const [color,setColor] = useState(0);
        return(
            <div key={item.id} id={item.id} className={`UserContent ${(color === 0)?'ColorLightTelegrey':(color === 1)?'ColorLightMallow':"ColorLemonYellow"}`}>
                <p className="UserName m_p_10">{(item.name !=="")?item.name:`Name: Empty`}</p>
                <p className="UserEmail m_p_10">{`Email: ${(item.email !== "")?item.email:"Empty"}`}</p>
                <p className="UserPhone m_p_10">{`Phone: ${(item.phone !== "")?item.phone:"Empty"}`}</p>
                <div className="postContentCnop m_p_10">
                    <button className="postContentCnopView" onClick={()=>{setView(pre=>!pre)}}>View</button>
                    <button className="postContentCnopChaCol" onClick={()=>(color < 2)?setColor((pre)=>pre+1):setColor((pre)=>pre=0)}>Change Color</button>
                </div>
                {(view)?<View item={item} setView={setView} index={index}/>:""}
                          
            </div>
        )
    }
    /*В функции Users выводит модальное окно, с подробными данными */
    function View({item,index,setView}) {
        return(
            <div className="ViewUsers" onClick={()=>setView(pre=>!pre)}>
                <div className="ViewComtent" onClick={((e)=>e.stopPropagation())}>
                    <div className="ViewTitle">
                        <p>User Info</p>
                        <div className="cross" onClick={()=>setView(pre=>!pre)}></div>
                    </div>
                    <div className="ViewBodyUsers">
                        <p className="UserNameView">{(item.name !== "")?`${item.name}`:"Name: Empty"}</p>
                        <p className='UserViewData m_p_10'>{`User name: ${(item.username !== "")?`${item.username}`:`Empty`}`}</p>
                        <p className='UserViewData m_p_10'>{`Email: ${(item.email !== "")?`${item.email}`:`Empty`}`}</p>
                        <p className='UserViewData m_p_10'>{`Phone: ${(item.phone !== "")?`${item.phone}`:`Empty`}`}</p>
                        <p className='UserViewData m_p_10'>{`Website: ${(item.website !== "")?`${item.website}`:`Empty`}`}</p> 
                    </div>
                    <div className="postContentCnop m_p_10 ViewDelete">
                        <button className="postContentCnopView" onClick={()=>setViewEdit((pre)=>pre =index)}>Edit</button>
                        <button className="postContentCnopChaCol" onClick={()=>{DeletePost(item,index,{setView});}}>Delete</button>
                    </div>
                </div> 
            </div>
        )
    }
    /*Выводит модальное окно из Users для создания записи*/
    function ViewCreate({setViewCreate}){   
        return(
            <div className="ViewUsers" onClick={()=>setViewCreate(pre=>!pre)}>
                <div className="ViewComtent" onClick={((e)=>e.stopPropagation())}>
                    <div className="ViewTitle">
                        <p>User Create</p>
                        <div className="cross" onClick={()=>setViewCreate(pre=>!pre)}></div>
                    </div>
                    <div className="ViewBodyUsers">
                        <div className="ViewBodyUsersContent">
                            <label>
                                <p>Name</p>
                                <input type="text"/>
                            </label>
                            <label>
                                <p>User name</p>
                                <input type="text"/>
                            </label>
                            <label>
                                <p>Email</p>
                                <input type="text"/>
                            </label>
                            <label>
                                <p>Phone</p>
                                <input type="text"/>
                            </label>
                            <label>
                                <p>Website</p>
                                <input type="text"/>
                            </label>
                        </div>
                        <div className="ViewBodyCnopUser" onClick={()=>CreatUsers()}><p>Create</p></div>
                    </div>
                </div>
            </div>
        )
    }
    /*Выводит модальное окно из View для редактирования записи*/
    function ViewEdit({setViewEdit}){   
        // console.log(users[viewEdit]);
        const viewData = users[viewEdit];
        return(
            <div className="ViewUsers" onClick={()=>setViewEdit(pre=>pre = -1)}>
                <div className="ViewComtent" onClick={((e)=>e.stopPropagation())}>
                    <div className="ViewTitle">
                        <p>User Edit</p>
                        <div className="cross" onClick={()=>setViewEdit(pre=>pre = -1)}></div>
                    </div>
                    <div className="ViewBodyUsers">
                        <div className="ViewBodyUsersContent">
                            <label>
                                <p>Name</p>
                                <input type="text" defaultValue={viewData.name}/>
                            </label>
                            <label>
                                <p>User name</p>
                                <input type="text" defaultValue={viewData.username}/>
                            </label>
                            <label>
                                <p>Email</p>
                                <input type="text" defaultValue={viewData.email}/>
                            </label>
                            <label>
                                <p>Phone</p>
                                <input type="text" defaultValue={viewData.phone}/>
                            </label>
                            <label>
                                <p>Website</p>
                                <input type="text" defaultValue={viewData.website}/>
                            </label>
                        </div>
                        
                        
                        <div className="ViewBodyCnopUser" onClick={()=>EditUsers()}><p>Update</p></div>
                    </div>
                </div>
            </div>
        )
    }
    /*Функция запускается из ViewCreate и выполняет логику создание поста*/
    function CreatUsers(){
        const CreatUsers = new Array; 
        for(let item of document.querySelector('.ViewBodyUsersContent').children){
            if (item.children[1].value.trim() !== ""){
                CreatUsers.push(item.children[1].value);
            }else{
                CreatUsers.push("");
            }
            
        }
        console.log(CreatUsers);
        setUsers([
            ...users,
            {
                id:users.length+1,
                name:CreatUsers[0],
                username:CreatUsers[1],
                email:CreatUsers[2],
                address:{},
                phone:CreatUsers[3],
                website:CreatUsers[4],
                company:{},
            }
        ]);
        setViewCreate((pre)=>!pre)
    }
    /*Функция запускается из ViewEdit и выполняет логику изменения поста*/
    function EditUsers(){
        const editUsers = new Array; 
        for(let item of document.querySelector('.ViewBodyUsersContent').children){
            if (item.children[1].value.trim() !== ""){
                editUsers.push(item.children[1].value);
            }else{
                editUsers.push("");
            }
            
        }
        setUsers((pre)=>pre.map((item)=>{
            if (users[viewEdit] !== item){
                return item;
            }else{
                return {
                    name:editUsers[0],
                    username:editUsers[1],
                    email:editUsers[2],
                    phone:editUsers[3],
                    website:editUsers[4],
                    address:item.address,
                    company:item.company,
                }  
            }
        })
        )
        setViewEdit(pre=>pre = -1)
    }
    /*Функция запускается из View и выполняет логику удаления поста*/
    function DeletePost(item,index,{setView}){
        const questionDelete = window.confirm("Do you really want to delete this card?");
        if (questionDelete === true){
            setView((pre)=>!pre);
            setUsers((pre)=>pre.filter(item=>item !== pre[index]));
        }   
    }

    return (
        <>
        <div className={(classChanges)?"Content":"ContentV2"}>
            
            <div className="nav">
                <p>User List</p>
                <div className="blockCnop">
                    {(classChanges)?<button onClick={()=>setClassChanges((pre)=>!pre)}><p>Make small cards</p></button>:<button onClick={()=>setClassChanges((pre)=>!pre)}><p>Make big cards</p></button>}
                    <button onClick={()=>setViewCreate((pre)=>!pre)}><p>Add Article</p></button>
                    
                </div>
            </div>
            <div className="User">
                {users.slice(0,showMore).map((item,index)=>{
                    return(
                        <Users item={item} index={index}/>
                    )
                })}
            </div>
            {(showMore < users.length)?<div className="CnopMore" onClick={()=>setShowMore(pre=>pre+3)}><p>Show more</p></div>:""}
            <footer></footer>
            {(viewCreate)?<ViewCreate setViewCreate={setViewCreate}/>:""}
            {(viewEdit >= 0)?<ViewEdit setViewEdit={setViewEdit}/>:""} 
        </div>
        </>
    )
}