import React from 'react'

export default function Brand({ brandCar, ModelCar }) {
    return (
        <div className="content contentBrand">
            {
                brandCar.map((item) => {
                    return (
                        <p key={item.id} onClick={() => ModelCar(item)}>
                            {item.name}
                        </p>
                    )
                })
            }
        </div>
    )
}
