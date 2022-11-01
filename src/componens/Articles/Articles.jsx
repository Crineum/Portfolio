import React, { useEffect, useState } from "react";
import "./Articles.css"

export default function PostBlock(){
    const [post,setPost] = useState([])
    const [showMore,setShowMore] = useState(3)
    const [classChanges,setClassChanges] = useState(true);
    const [viewCreate,setViewCreate] = useState(false);
    const [viewEdit,setViewEdit] = useState(-1);

    useEffect(()=>{
        fetch('https://jsonplace-univclone.herokuapp.com/posts')
        .then(response => response.json())
        .then(json => setPost(json.slice(0,10)))
    },[]);





    /*Создает блоки с постами*/
    function Posts({item,index}){
        const [view,setView] = useState(false);
        const [color,setColor] = useState(0);
        return(
            <div key={item.id} id={item.id} className={`postContent ${(color === 0)?'ColorLightTelegrey':(color === 1)?'ColorLightMallow':"ColorLemonYellow"}`}>
                <p className="postContentTitle m_p_10">{item.title}</p>
                <p className="postContentBody m_p_10">{item.body}</p>
                <div className="postContentCnop m_p_10">
                    <button className="postContentCnopView" onClick={()=>{setView(pre=>!pre)}}>View</button>
                    <button className="postContentCnopChaCol" onClick={()=>(color < 2)?setColor((pre)=>pre+1):setColor((pre)=>pre=0)}>Change Color</button>
                </div>
                {(view)?<View item={item} setView={setView} index={index}/>:""}
                          
            </div>
        )
    }
    /*В функции Post. выводит модальное окно, с подробными данными */
    function View({item,index,setView}) {
        return(
            <div className="View" onClick={()=>setView(pre=>!pre)}>
                <div className="ViewComtent" onClick={((e)=>e.stopPropagation())}>
                    <div className="ViewTitle">
                        <p>Article Info</p>
                        <div className="cross" onClick={()=>setView(pre=>!pre)}></div>
                    </div>
                    <div className="ViewBody">
                        <p className="ViewBodyTitle">{item.title}</p>
                        <p className="ViewBodyContent">{item.body}</p>
                    </div>
                    <div className="postContentCnop m_p_10 ViewDelete">
                        <button className="postContentCnopView" onClick={()=>setViewEdit((pre)=>pre =index)}>Edit</button>
                        <button className="postContentCnopChaCol" onClick={()=>{DeletePost(item,index,{setView});}}>Delete</button>
                    </div>
                </div> 
            </div>
        )
    }
    /*Выводит модальное окно из Post для создания записи*/
    function ViewCreate({setViewCreate}){   
        return(
            <div className="View" onClick={()=>setViewCreate(pre=>!pre)}>
                <div className="ViewComtent" onClick={((e)=>e.stopPropagation())}>
                    <div className="ViewTitle">
                        <p>Article Create</p>
                        <div className="cross" onClick={()=>setViewCreate(pre=>!pre)}></div>
                    </div>
                    <div className="ViewBody">
                        <label>
                            <p>Title</p>
                            <input type="text" />
                        </label>
                        <label>
                            <p >Text</p>
                            <textarea className="ViewBodyTextaria"></textarea>
                        </label>
                       <div className="ViewBodyCnop" onClick={()=>CreatPost()}><p>Create</p></div>
                    </div>
                </div>
            </div>
        )
    }
    /*Выводит модальное окно из View для редактирования записи*/
    function ViewEdit({setViewEdit}){   
        return(
            <div className="View" onClick={()=>setViewEdit(pre=>pre = -1)}>
                <div className="ViewComtent" onClick={((e)=>e.stopPropagation())}>
                    <div className="ViewTitle">
                        <p>Article Edit</p>
                        <div className="cross" onClick={()=>setViewEdit(pre=>pre = -1)}></div>
                    </div>
                    <div className="ViewBody">
                        <label>
                            <p>Title</p>
                            <input type="text" defaultValue={post[viewEdit].title}/>
                        </label>
                        <label>
                            <p>Text</p>
                            <textarea className="ViewBodyTextaria" defaultValue={post[viewEdit].body}></textarea>
                        </label>
                        <div className="ViewBodyCnop" onClick={()=>EditPost()}><p>Update</p></div>
                    </div>
                </div>
            </div>
        )
    }
    /*Функция запускается из ViewCreate и выполняет логику создание поста*/
    function CreatPost(){
        const title = document.querySelector(".ViewBody").children[0].children[1].value;
        const body = document.querySelector(".ViewBodyTextaria").value;
        setPost([
            ...post,
            {
                userId:1,
                id:post.length+1,
                title:title,
                body:body,
            }
        ]);
        setViewCreate((pre)=>!pre)
    }
    /*Функция запускается из ViewEdit и выполняет логику изменения поста*/
    function EditPost(){
        const title = document.querySelector(".ViewBody").children[0].children[1].value;
        const body = document.querySelector(".ViewBodyTextaria").value;
        setPost((pre)=>pre.map((item)=>{
            if (post[viewEdit] !== item){
                return item;
            }else{
                return {
                    userId:item.userId,
                    id:item.id,
                    title:title,
                    body:body,
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
            setPost((pre)=>pre.filter(item=>item !== pre[index]));
        }   
    }




    return (
        <>
        <div className={(classChanges)?"Content":"ContentV2"}>
            
            <div className="nav">
                <p>Article List</p>
                <div className="blockCnop">
                    {(classChanges)?<button onClick={()=>setClassChanges((pre)=>!pre)}><p>Make small cards</p></button>:<button onClick={()=>setClassChanges((pre)=>!pre)}><p>Make big cards</p></button>}
                    <button onClick={()=>setViewCreate((pre)=>!pre)}><p>Add Article</p></button>
                </div>
            </div>
            <div className="post">
                {post.slice(0,showMore).map((item,index)=>{
                    return(
                        <Posts item={item} index={index}/>
                    )
                })}
            </div>
            {(showMore < post.length)?<div className="CnopMore" onClick={()=>setShowMore(pre=>pre+3)}><p>Show more</p></div>:""}
            <footer></footer>
            {(viewCreate)?<ViewCreate setViewCreate={setViewCreate}/>:""}
            {(viewEdit >= 0)?<ViewEdit setViewEdit={setViewEdit}/>:""} 
        </div>
        </>
    )
}