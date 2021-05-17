import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { register } from '../../store/actions/auth';

import registerImage from '../../assets/images/register.svg'
import './Auth.scss';

const Register = ({ history }) => {
    const dispatch = useDispatch();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState('male');
    const [password, setPassword] = useState('');

    const submitForm = (e) => {
        e.preventDefault();

        dispatch(register({
            firstName,
            lastName,
            email,
            gender,
            password
        }, history));
    }

    return (
        <div id='auth-container'>
            <div id='auth-card'>
                <div className='card-shadow'>
                    <div id='image-section'>
                        <img src={registerImage} alt='Login' />
                    </div>

                    <div id='form-section'>
                        <h2>Create an account</h2>

                        <form onSubmit={submitForm}>
                            <div className='input-field mb-1'>
                                <input
                                    onChange={(({ target }) => setFirstName(target.value))}
                                    value={ firstName }
                                    required='required'
                                    type='text'
                                    placeholder='First name'
                                />
                            </div>
                            <div className='input-field mb-1'>
                                <input 
                                    onChange={(({ target }) => setLastName(target.value))}
                                    value={ lastName }
                                    required='required'
                                    type='taxt'
                                    placeholder='Last name'
                                />
                            </div>
                            <div className='input-field mb-1'>
                                <input
                                    onChange={(({ target }) => setEmail(target.value))}
                                    value={ email }
                                    required='required'
                                    type='email'
                                    placeholder='Email' 
                                />
                            </div>
                            <div className='input-field mb-1'>
                                <select 
                                    value={ gender } 
                                    onChange={(({ target }) => setGender(target.value))}
                                    required='required'
                                >
                                    <option value='male'>Male</option>
                                    <option value='female'>Female</option>
                                </select>
                            </div>
                            <div className='input-field mb-2'>
                                <input 
                                    onChange={(({ target }) => setPassword(target.value))}
                                    value={ password }
                                    required='required'
                                    type='password' 
                                    placeholder='Password'
                                />
                            </div>

                            <button>REGISTER</button>
                        </form>

                        <p>Have an account? <Link to='/login'>Login</Link></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register;