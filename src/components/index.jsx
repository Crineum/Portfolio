import React,{ useEffect,useState } from "react";

export default function Selection(){
    const [counter,setCounter] = useState(0); 
    const [carCompanies,setCarCompanies] = useState([]);
    const [modelCar,setModelCar]=useState([]);
    const [title,setTitle]=useState([]);
    useEffect(()=>{
        fetch('https://ixora-auto.ru/wipers/auto').then(resp=>resp.json()).then(json=>{
            setCarCompanies(()=>json);
        }).catch((err)=>{
            console.warn(err);
            alert('Ошибка при получении Марок')
        });
    },[])
    function OnClickAutoBrandContent(item){
        setCounter((pre)=>pre+1);
        fetch(`https://ixora-auto.ru/wipers/model/${item.id}`).then(resp=>resp.json()).then(json=>{
            setModelCar(()=>json)
        }).catch((err)=>{
            console.warn(err);
            alert('Ошибка при получении Моделей')
        });
        console.log(item.name);
        setTitle([...title,item.name]);
    }
    function OnClickContentAutoModel(item){
        setCounter(pre=>pre+1);
        fetch(`https://ixora-auto.ru/wipers/modif/${item.id}`).then(resp=>resp.json()).then(json=>{
            setModelCar(()=>json)
        }).catch((err)=>{
            console.warn(err);
            alert('Ошибка при получении поколений машины')
        });
        setTitle([...title,item.name]);
    }
    function OnClickContentWiperBlades(item){
        setCounter(pre=>pre+1);
        fetch(`https://ixora-auto.ru/wipers/param/${item.id}`).then(resp=>resp.json()).then(json=>{
            setModelCar(()=>json)
        }).catch((err)=>{
            console.warn(err);
            alert('Ошибка при получении данных о машине')
        });
        setTitle([...title,item.name]);
    }
    
    function AutoBrandContent() {
        return(
            <div className="AutoBrandContent">
                {carCompanies.map((item)=>{
                    return(
                        <div key={item.id}>
                            <p onClick={()=>OnClickAutoBrandContent(item)}>{item.name}</p>
                        </div>
                    )
                })}
            </div>
        )
    }
    function ContentAutoModel() {
        return(
            <div className="contentAutoModel">
                {
                    modelCar.map((item)=>{
                        return(
                            <div key={item.id}>
                                <p onClick={()=>OnClickContentAutoModel(item)}>{item.name}</p>
                            </div> 
                        )
                    })
                }
            </div>
        )
    }
    function AutoGenerationContent(){
        return(
            <div className="autoGenerationContent">
                {modelCar.map((item)=>{
                    return(
                        <div key={item.id}>
                            <p onClick={()=>OnClickContentWiperBlades(item)}>{item.name}</p>
                        </div> 
                    )
                })}
            </div>
        )
    }
    function ContentWiperBlades(){
        return (
            <div className="contentWiperBlades">
                {modelCar.map((item)=>{
                    return(
                        <>
                            <p key={item+1}>Длина щетки со стороны водителя (см) - {item.length1}</p>
                            <p key={item + 2}>Длина щетки со стороны пассижира (см) - {item.length2}</p>
                            {item.length3 !== ""? <p key={item+3}>Длина задней щетки (см) - {item.length3}</p>:""}
                            <p key={item +4}>Тип крепления - {item.fasten}</p>
                        </>
                        
                    )
                })}
                
            </div>
        )
    }
        

    return (
        <div id="SelectionWindscreenWipersContent">
            <div className="Title">
                <p className="Name" onClick={()=>{setCounter((pre)=>pre=0);setTitle([]);}}>
                    <p>Подбор стеклоочистителей</p> 
                    <p>{(counter >= 1)?`${title[0]}`:""} {(counter >= 2)?`${title[1]}`:""}</p>
                    <p>{(counter >= 3)?`${title[2]}`:""}</p>
                </p>
                <div className="line"></div>
            </div>
            {(counter === 0)?<AutoBrandContent/>:(counter === 1)?<ContentAutoModel/>:(counter === 2)?<AutoGenerationContent/>:<ContentWiperBlades/>}
        </div>
    )
}
