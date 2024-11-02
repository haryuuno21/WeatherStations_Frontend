import { FC, useEffect, useState } from 'react'

const data: string[] = [
    'Берик Дондаррион',
    'Леди Мелиссандра',
    'Полливер',
    'Уолдер Фрей',
    'Тайвин Ланнистер',
    'Сир Мерин Трэнт',
    'Король Джоффри',
    'Сир Илин Пейн',
    'Гора',
    'Пес',
    'Серсея Ланнистер',
]

const StartPage: FC = () => {
    // В функциональных компонентах для работы с состоянием можно использовать хук useState()
    // Он возвращает кортеж из двух элементов:
    // 1 элемент - объект состояния
    // 2 элемент - метод который позволит нам обновить состояние
    const [randomName, setRandomName] = useState('')

    // Кстати, это хороший пример деструктуризации массива в JavaScript
    const [names, setNames] = useState(data)

    const [showNames, setShowNames] = useState(false)

    // В данном хендлере мы изменяем состояние на какое-то конкретное
    const handleShowNames = () => {
        setShowNames(true)
    }

    // В данном хендлере мы изменяем состояние на какое-то конкретное
    const handleHideNames = () => {
        setShowNames(false)
    }

    useEffect(()=>{
        console.log('Этот код выполняется только на первом рендере компонента')
        // В данном примере можно наблюдать Spread syntax (Троеточие перед массивом)
        setNames((names) => [...names, 'Бедный студент'])

        return () => {
            console.log('Этот код выполняется, когда компонент будет размонтирован')
        }
    },[])

    useEffect(()=>{
        console.log('Этот код выполняется каждый раз, когда изменится состояние showNames')
        setRandomName(names[Math.floor(Math.random()*names.length)])
    },[showNames])

    return (
        <div>
            <h3>Случайное имя из списка: {randomName}</h3>
            {/*Кнопка для того, чтобы показать имена*/}
            <button onClick={handleShowNames}>Хочу увидеть список имен</button>
            {/*Кнопка для того, чтобы скрыть имена*/}
            <button onClick={handleHideNames}>Хочу скрыть список имен</button>

            {/*React отрисует список только если showNames будет равен true, boolean значения игнорируются при отрисовке*/}
            {showNames && (
                <ul>
                    {names.map((name, index)=> (
                        <li key={index}>
                            <span>{name}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default StartPage