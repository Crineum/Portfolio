import React from 'react'

export default function Modification({ brandCar, ParamsCar }) {
    return (
        <div className="content contentMachineData">
            {
                brandCar.map((item) => {
                    return (

                        <p key={item.id} onClick={() => ParamsCar(item)}>
                            {item.name}
                        </p>
                    )
                })
            }
        </div>
    )
}
