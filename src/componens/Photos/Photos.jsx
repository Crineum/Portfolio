import React, { useEffect, useState } from 'react';
import "./Photos.css";

export default function Photos() {
   const [photos,setPhotos] = useState([])
    const [showMore,setShowMore] = useState(3)
    const [classChanges,setClassChanges] = useState(true);
    const [viewCreate,setViewCreate] = useState(false);
    const [viewEdit,setViewEdit] = useState(-1);

    useEffect(()=>{
        fetch('https://jsonplaceholder.typicode.com/photos')
        .then(response => response.json())
        .then(json => setPhotos(json.splice(0,10)))
    },[]);






    /*Создает блоки с постами*/
    function Photos({item,index}){
        const [view,setView] = useState(false);
        const [color,setColor] = useState(0);
        return(
            <div key={item.id} id={item.id} className={`PhotoContent ${(color === 0)?'ColorLightTelegrey':(color === 1)?'ColorLightMallow':"ColorLemonYellow"}`}>
                <p className="UserName m_p_10">{(item.title !=="")?item.title:`Title: Empty`}</p>
                <div className='Photos' >
                  <img src={(`${item.url}`)}/>
                  
                </div>
                
                <div className="postContentCnop m_p_10">
                    <button className="postContentCnopView" onClick={()=>{setView(pre=>!pre)}}>View</button>
                    <button className="postContentCnopChaCol" onClick={()=>(color < 2)?setColor((pre)=>pre+1):setColor((pre)=>pre=0)}>Change Color</button>
                </div>
                {(view)?<View item={item} setView={setView} index={index}/>:""}
                          
            </div>
        )
    }
    /*В функции Photos выводит модальное окно, с подробными данными */
    function View({item,index,setView}) {
        return(
            <div className="ViewPhoto" onClick={()=>setView(pre=>!pre)}>
                <div className="ViewComtentPhoto" onClick={(e)=>e.stopPropagation()}>
                    <div className="ViewTitlePhotos">
                        <p>Photo Info</p>
                        <div className="cross" onClick={()=>setView(pre=>!pre)}></div>
                    </div>
                    <div className="ViewBodyPhoto">
                        <p className="PhotoNameView">{(item.title !== "")?`${item.title}`:"Title: Empty"}</p>
                        <div className='PhotosEdit' >
                            <img src={(`${item.url}`)}/>
                        </div>
                       </div>
                    <div className="PhotoContentCnop">
                        <button className="postContentCnopView" onClick={()=>setViewEdit((pre)=>pre =index)}>Edit</button>
                        <button className="postContentCnopChaCol" onClick={()=>{DeletePost(item,index,{setView});}}>Delete</button>
                    </div>
                </div> 
            </div>
        )
    }
    /*Выводит модальное окно из Photos для создания записи*/
    function ViewCreate({setViewCreate}){   
        return(
            <div className="ViewPhoto" onClick={()=>setViewCreate(pre=>!pre)}>
                <div className="ViewComtent" onClick={(e)=>e.stopPropagation()}>
                    <div className="ViewTitle">
                        <p>Photo Create</p>
                        <div className="cross" onClick={()=>setViewCreate(pre=>!pre)}></div>
                    </div>
                    <div className="ViewBodyPhoto">
                        <div className="ViewBodyPhotoContent">
                            <label>
                                <p>Title</p>
                                <input type="text"/>
                            </label>
                            <label>
                                <p>Url</p>
                                <input type="text"/>
                            </label>
                        </div>
                        <div className="ViewBodyCnopPhoto" onClick={()=>CreatPhoto()}><p>Create</p></div>
                    </div>
                </div>
            </div>
        )
    }
    /*Выводит модальное окно из View для редактирования записи*/
    function ViewEdit({setViewEdit}){   
        // console.log(users[viewEdit]);
        const viewData = photos[viewEdit];
        return(
            <div className="ViewPhoto" onClick={()=>setViewEdit(pre=>pre = -1)}>
                <div className="ViewComtent" onClick={(e)=>e.stopPropagation()}>
                    <div className="ViewTitle">
                        <p>Photo Edit</p>
                        <div className="cross" onClick={()=>setViewEdit(pre=>pre = -1)}></div>
                    </div>
                    <div className="ViewBodyPhoto">
                        <div className="ViewBodyPhotoContent">
                            <label>
                                <p>Title</p>
                                <input type="text" defaultValue={viewData.title}/>
                            </label>
                            <label>
                                <p>Url</p>
                                <input type="text" defaultValue={viewData.url}/>
                            </label>
                        </div>
                        
                        
                        <div className="ViewBodyCnopPhoto" onClick={()=>EditPhoto()}><p>Update</p></div>
                    </div>
                </div>
            </div>
        )
    }
    /*Функция запускается из ViewCreate и выполняет логику создание поста*/
    function CreatPhoto(){
        const CreatPhoto = new Array; 
        for(let item of document.querySelector('.ViewBodyPhotoContent').children){
            if (item.children[1].value.trim() !== ""){
                CreatPhoto.push(item.children[1].value);
            }else{
                CreatPhoto.push("");
            }
            
        }
        console.log(CreatPhoto);
        setPhotos([
            ...photos,
            { 
                albumId:"",
                id:photos.length+1,
                title:CreatPhoto[0],
                url:CreatPhoto[1],
                thumbnailUrl:"",
            }
        ]);
        setViewCreate((pre)=>!pre)
    }
    /*Функция запускается из ViewEdit и выполняет логику изменения поста*/
    function EditPhoto(){
        const editPhotos = new Array; 
        for(let item of document.querySelector('.ViewBodyPhotoContent').children){
            if (item.children[1].value.trim() !== ""){
                editPhotos.push(item.children[1].value);
            }else{
                editPhotos.push("");
            }
            
        }
        setPhotos((pre)=>pre.map((item)=>{
            if (photos[viewEdit] !== item){
                return item;
            }else{
                return {
                    albumId:item.albumId,
                    id:item.id,
                    title:editPhotos[0],
                    url:editPhotos[1],
                    thumbnailUrl:item.thumbnailUrl,
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
            setPhotos((pre)=>pre.filter(item=>item !== pre[index]));
        }   
    }

    return (
        <>
            <div className={(classChanges)?"Content":"ContentV2"}>
                <div className="nav">
                    <p>Photo List</p>
                    <div className="blockCnop">
                        {(classChanges)?<button onClick={()=>setClassChanges((pre)=>!pre)}><p>Make small cards</p></button>:<button onClick={()=>setClassChanges((pre)=>!pre)}><p>Make big cards</p></button>}
                        <button onClick={()=>setViewCreate((pre)=>!pre)}><p>Add Article</p></button>
                        
                    </div>
                </div>
                <div className="User">
                    {photos.slice(0,showMore).map((item,index)=>{
                        return(
                            <Photos item={item} index={index}/>
                        )
                    })}
                </div>
                {(showMore < photos.length)?<div className="CnopMore" onClick={()=>setShowMore(pre=>pre+3)}><p>Show more</p></div>:""}
                <footer></footer>
                {(viewCreate)?<ViewCreate setViewCreate={setViewCreate}/>:""}
                {(viewEdit >= 0)?<ViewEdit setViewEdit={setViewEdit}/>:""} 
            </div>
        </>
    )
}









