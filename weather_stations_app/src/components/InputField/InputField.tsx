import { FC } from 'react'
import { Button } from 'react-bootstrap'
import './InputField.css'
import { useFoundCount } from '../../store/stations'

interface Props {
    value: string
    setValue: (value: string) => void
    onSubmit: () => void
    loading?: boolean
    placeholder?: string
    buttonTitle?: string
}

export const InputField: FC<Props> = ({ value, setValue, onSubmit, loading, placeholder, buttonTitle = 'Поиск' }) => 
    {
        const foundCount = useFoundCount();
        return(
            <div className="inputField">
            <input value={value} placeholder={placeholder} onChange={(event => setValue(event.target.value))}/>
            <Button disabled={loading} onClick={onSubmit}>{buttonTitle}</Button>
            <h4>Найдено станций: {foundCount}</h4>
        </div>
        )
    }
