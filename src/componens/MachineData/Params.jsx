import React from 'react'

export default function Params({ brandCar }) {
    return (
        <>
            <div className="content contentParams">
                {
                    brandCar.map((item, index) => {
                        return (
                            <>
                                <p key={item.id + index + 1}>
                                    {`Длина щетки со стороны водителя (см) - ${item.length1}`}
                                </p>
                                <p key={item.id + index + 2}>
                                    {`Длина щетки со стороны пассажира (см) - ${item.length2}`}
                                </p>
                                {item.length3 !== '' ? <p key={item.id}>{`Длина задней щетки (см) - ${item.length3}`}</p> : ''}
                                <p key={item.id + index + 3}>
                                    {`Тип  крепления - ${item.fasten}`}
                                </p>

                            </>
                        )
                    })
                }
            </div>
        </>
    )
}
