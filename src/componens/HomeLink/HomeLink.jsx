import React from 'react'
import "./HomeLink.css";

export default function HomeLink() {
  return (
      <>
        <div className="HomeLink">
          <h1>Ошибка 404</h1>
          <p>Кажется что-то пошло не так! Страница, которую вы запрашиваете, не существует. Возможно она устарела, была удалена, или был введен неверный адрес в адресной строке.</p>
          <a href="/">
            <button href="">Перейти на главную</button>
          </a>
          
        </div>
      </>
  )
}