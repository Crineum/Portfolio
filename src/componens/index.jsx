import React, { useState, useEffect } from 'react'
import './index.scss'
import axios from 'axios';
import Model from './MachineData/Model';
import Brand from './Brand';
import Modification from './MachineData/Modification';
import Params from './MachineData/Params';

export default function Index() {
    const [brandCar, setBrandCar] = useState([[]]);
    const [list, setList] = useState([0, [], [], []])

    useEffect(() => {
        const AxiosDataBrand = async () => {
            const brand = await axios.get(`https://ixora-auto.ru/wipers/auto`)
            setBrandCar(() => { return [[...brand.data], []] })
        }

        AxiosDataBrand()
            .catch(console.error);
    }, [])

    async function ModelCar(item) {
        const AxiosDataModel = async () => {
            const model = await axios.get(`https://ixora-auto.ru/wipers/model/${item.id}`)
            setBrandCar((item) => { return [[...item[0]], [...model.data]] })
        }
        AxiosDataModel()
            .catch(console.error);

        setList((i) => {
            i[0] = 1;
            i[1] = item.name
            return (i);
        })
    }
    async function ModificationCar(item) {
        const AxiosDateModification = async () => {
            const modification = await axios.get(`https://ixora-auto.ru/wipers/modif/${item.id}`)
            setBrandCar((item) => { return [[...item[0]], [...item[1]], [...modification.data]] })
        }
        AxiosDateModification()
            .catch(console.error);
        setList((i) => {
            i[0] = 2;
            i[2] = item.name
            return (i);
        })
    }
    async function ParamsCar(item) {
        const AxiosDateParms = async () => {
            const parms = await axios.get(`https://ixora-auto.ru/wipers/param/${item.id}`)
            setBrandCar((item) => { return [[...item[0]], [...item[1]], [...item[2]], [...parms.data]] })
        }
        AxiosDateParms()
            .catch(console.error)
        setList((i) => {
            i[0] = 3;
            i[3] = item.name
            return (i);
        })
    }
    return (
        <>
            <div className='wrapper'>
                <div className="wrapper_content">
                    <div className="hedader">
                        <p onClick={() => setList((i) => { i[0] = 0; return [...i]; })}>Подборка стеклоочистителей</p>
                        {(list[0] > 0) ? <p onClick={() => setList((i) => { i[0] = 1; return [...i]; })}>{list[1]}</p> : ''}
                        {(list[0] > 1) ? <p onClick={() => setList((i) => { i[0] = 2; return [...i]; })}>{list[2]}</p> : ''}
                        {(list[0] > 2) ? <p>{list[3]}</p> : ''}
                    </div>
                    {(list[0] === 0) ? <Brand brandCar={brandCar[0]} ModelCar={ModelCar} /> : ''}
                    {(list[0] === 1) ? <Model brandCar={brandCar[1]} ModificationCar={ModificationCar} /> : ''}
                    {(list[0] === 2) ? <Modification brandCar={brandCar[2]} ParamsCar={ParamsCar} /> : ''}
                    {(list[0] === 3) ? <Params brandCar={brandCar[3]} /> : ''}
                </div>
            </div>
        </>
    )
}
