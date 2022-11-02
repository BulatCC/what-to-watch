import { ChangeEvent, useState, useEffect,useContext } from 'react';
import { ButtonBig } from '../ButtonBig/ButtonBig';
import { useDebounce } from '../../Hooks/UseDebounce';
import { validateEmail } from '../../Services/Utils';
import { appContext } from '../../Context/App';
import { apiActions } from '../../Context/ApiActions';

const LoginForm = () => {
    const [inputValue, setInpuValue] = useState({
        email: '',
        password: '',
    });
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [isPasswordValid, setIsPasswordValid] = useState(true);
    const [singInMessage, setSingInMessage] = useState('Enter valid email adress and any password.');
    const debounceEmailInput = useDebounce(inputValue.email, 500);
    const debounceEmailError = useDebounce(isEmailValid, 500);
    const { dispatch } = useContext(appContext);
    const buttonClickHandler = () => {
        if (inputValue.email && inputValue.password) {
            apiActions.login(dispatch, inputValue);
        }
    };

    const showEmailError = () => {
        if (inputValue.email.length === 0) {
            return true;
        }
        return debounceEmailError;
    }

    useEffect(() => {
        if (inputValue.email.length > 0) {
            setIsEmailValid(validateEmail(debounceEmailInput));
        }
    }, [debounceEmailInput]);

    useEffect(() => {
        if (inputValue.email.length > 0) {
            isEmailValid ? setSingInMessage('Email is correct.') : setSingInMessage('Please enter a valid email address.');
        }
    }, [isEmailValid]);
    
    useEffect(() => {
        if (inputValue.email.length === 0) {
            setIsEmailValid(true);
            setSingInMessage('Enter valid email adress and any password.');
        }
    }, [inputValue.email]);

    const inputHandler = (evt: ChangeEvent<HTMLInputElement>) => {
        setInpuValue({
            ...inputValue,
            [evt.target.name]: evt.target.value,
        });
        evt.target.name === 'password' && evt.target.value === '' ? setIsPasswordValid(false) : setIsPasswordValid(true)
    }

    return (
        <form action='#' className='sign-in__form'>
            <div className='sign-in__message'>
                <p>{singInMessage}</p>
            </div>
            <div className='sign-in__fields'>
                <div className={`sign-in__field ${showEmailError() ? '' : 'sign-in__field--error'}`} >
                    <input onInput={inputHandler} className='sign-in__input' type='email' placeholder='Email address' name='email' id='email' />
                    <label className='sign-in__label visually-hidden' htmlFor='email'>Email address</label>
                </div>
                <div className={`sign-in__field ${isPasswordValid ? '' : 'sign-in__field--error'}`} >
                    <input onInput={inputHandler} className='sign-in__input' type='password' placeholder='Password' name='password' id='password' />
                    <label className='sign-in__label visually-hidden' htmlFor='password'>Password</label>
                </div>
            </div>
            <div className='sign-in__submit'>
                <ButtonBig title='Sign in' btnCssClass='sign-in__btn' clickHandler={buttonClickHandler} />
            </div>
        </form>
    );
}

export { LoginForm };
