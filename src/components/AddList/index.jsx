import React, {useEffect, useState} from "react";
import axios from "axios";

import List from "../List";
import Badge from "../Badge";

import closeSvg from '../../assets/img/close.svg'

import './addListButton.scss';

const AddList = ({colors, onAdd}) => {

    const [visiblePopup, setVisiblePopup] = useState(false);
    const [selectedColor, setSelectedColor] = useState(3);
    const [isLoading, setIsLoading] = useState(false);
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        if (Array.isArray(colors)) {
            setSelectedColor(colors[0].id);
        }
    }, [colors]);

    const onClose = () => {
        setVisiblePopup(false);
        setInputValue('');
        setSelectedColor(colors[0].id);
    }

    const addList = () => {
        if (!inputValue) {
            alert('введите значение для полей');
            return;
        }
        setIsLoading(true);
        axios.post('http://localhost:3001/lists',
            {"name": inputValue, "colorId": selectedColor})
            .then(({data}) => {
                const color = colors.filter(c => c.id === selectedColor)[0];
                const listObj = { ...data, color, tasks: [] };
                onAdd(listObj);
                onClose();
            })
            .catch((e)=>{
                alert('Ошибка при добавлении списка!');
            })
            .finally(()=>{
                setIsLoading(false);
            })
    }

    return (
        <div className={'add-list'}>
            <List
                onClick={() => setVisiblePopup(true)}
                items={[
                    {
                        className: 'list__add-button',
                        icon: <svg
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M6 1V11" stroke="black" strokeWidth="1.5" strokeLinecap="round"
                                  strokeLinejoin="round"/>
                            <path d="M1 6H11" stroke="black" strokeWidth="1.5" strokeLinecap="round"
                                  strokeLinejoin="round"/>
                        </svg>
                        ,
                        name: 'Добавить папку'

                    }
                ]}
            />
            {visiblePopup && (<div className={'add-list__popup'}>
                <img
                    src={closeSvg}
                    alt="close button"
                    className="add-list__popup-close-btn"
                    onClick={onClose}
                />
                <input
                    value={inputValue}
                    className={'field'}
                    type={'text'}
                    placeholder={'Название папки'}
                    onChange={e => setInputValue(e.target.value)}
                />
                <div className="add-list__popup-colors">
                    {
                        colors.map(color => (
                            <Badge
                                onClick={() => setSelectedColor(color.id)}
                                key={color.id}
                                color={color.name}
                                className={selectedColor === color.id && 'active'}
                            />
                        ))
                    }
                </div>
                <button onClick={addList} className={'button'}>
                    {isLoading ? "Добавление..." : "Добавить"}
                </button>
            </div>)}
        </div>
    );
};

export default AddList;