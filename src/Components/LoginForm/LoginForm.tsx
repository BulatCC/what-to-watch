import { ChangeEvent, useState, useEffect } from 'react';
import { ButtonBig } from '../ButtonBig/ButtonBig';
import { useDebounce } from '../../Hooks/UseDebounce';
import { validateEmail } from '../../Services/Utils';

const LoginForm = () => {
    const [inputValue, setInpuValue] = useState('');
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [singInMessage, setSingInMessage] = useState('Enter valid email adress and any password.');
    const debounceInput = useDebounce(inputValue, 500);
    const debounceEmail = useDebounce(isEmailValid, 500);
    const buttonClickHandler = () => {
        console.log('click');
    };

    const showError = () => {
        if (inputValue.length === 0) {
            return true;
        }
        return debounceEmail;
    }

    useEffect(() => {
        if (inputValue.length > 0) {
            setIsEmailValid(validateEmail(debounceInput));
        }
    }, [debounceInput]);

    useEffect(() => {
        if (inputValue.length > 0) {
            isEmailValid ? setSingInMessage('Email is correct.') : setSingInMessage('Please enter a valid email address.');
        }
    }, [isEmailValid]);
    
    useEffect(() => {
        if (inputValue.length === 0) {
            setIsEmailValid(true);
            setSingInMessage('Enter valid email adress and any password.');
        }
    }, [inputValue]);

    const inputHandler = (evt: ChangeEvent<HTMLInputElement>) => {
        setInpuValue(evt.target.value);
    }

    return (
        <form action='#' className='sign-in__form'>
            <div className='sign-in__message'>
                <p>{singInMessage}</p>
            </div>
            <div className='sign-in__fields'>
                <div className={`sign-in__field ${showError() ? '' : 'sign-in__field--error'}`} >
                    <input onInput={inputHandler} className='sign-in__input' type='email' placeholder='Email address' name='user-email' id='user-email' />
                    <label className='sign-in__label visually-hidden' htmlFor='user-email'>Email address</label>
                </div>
                <div className='sign-in__field'>
                    <input className='sign-in__input' type='password' placeholder='Password' name='user-password' id='user-password' />
                    <label className='sign-in__label visually-hidden' htmlFor='user-password'>Password</label>
                </div>
            </div>
            <div className='sign-in__submit'>
                <ButtonBig title='Sign in' btnCssClass='sign-in__btn' clickHandler={buttonClickHandler} />
            </div>
        </form>
    );
}

export { LoginForm };
