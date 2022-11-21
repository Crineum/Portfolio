import React from 'react'

export default function Model({ brandCar, ModificationCar }) {
    return (
        <>
            <div className="content contentMachineData">
                {
                    brandCar.map((item) => {
                        return (

                            <p key={item.id} onClick={() => ModificationCar(item)}>
                                {item.name}
                            </p>
                        )
                    })
                }
            </div>
        </>
    )
}
