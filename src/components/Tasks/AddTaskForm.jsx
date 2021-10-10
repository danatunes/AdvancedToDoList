import React, {useState} from 'react';
import addSvg from "../../assets/img/add.svg";
import axios from "axios";

const AddTaskForm = ({list, onAddTask}) => {

    const [visibleForm, setVisibleForm] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const toggleFormVisible = () => {
        setVisibleForm(!visibleForm);
        setInputValue('');
    }


    const addTask = () => {
        const obj = {
            listId: list.id,
            text: inputValue,
            completed: false
        };

        setIsLoading(true);

        axios.post('http://localhost:3001/tasks', obj)
            .then(({data}) => {
                console.log(data);
                onAddTask(list.id, data);
                toggleFormVisible();
            })
            .catch((e)=>{
                alert(e);
            })
            .finally(() => {
                setIsLoading(false);
            })
    }

    return (
        <div className="tasks__form">
            {
                !visibleForm
                    ?
                    <div onClick={toggleFormVisible} className="tasks__form-new">
                        <img src={addSvg} alt="Add icon"/>
                        <span>Новая задача</span>
                    </div>
                    :
                    <div className="tasks__form-block">
                        <input
                            value={inputValue}
                            type="text"
                            className={'field'}
                            placeholder={'Текст задачи'}
                            onChange={e => setInputValue(e.target.value)}
                        />
                        <button
                            disabled={isLoading}
                            onClick={addTask}
                            className='button'
                        >
                            {!isLoading? 'Добавить задачу' : 'Добавление...'}
                        </button>
                        <button onClick={toggleFormVisible} className='button button--gray'>
                            Отмена
                        </button>
                    </div>
            }
        </div>
    );
};

export default AddTaskForm;