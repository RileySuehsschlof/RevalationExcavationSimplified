import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Register = () => {
    const [username, setuserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/users/register', { username, password, email });
            setMessage(response.data.message);

            setTimeout(() => {
                navigate('/');  // Redirect to main page after login
            }, 1500)

        } catch (error) {
            setMessage(error.response.data.error);
        }
    };
    return (
        <>
            <Navbar />
            <div className="login-container">
                <div className="login-form-container">
                    <div>
                        <h2>Register</h2>

                        <form onSubmit={handleSubmit} className="login-form">
                            <div className="input-group">
                                <label htmlFor="username">Username</label>
                                <input type="text"
                                    placeholder='Username'
                                    value={username}
                                    onChange={(e) => setuserName(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="input-group">
                                <label htmlFor="password">Password</label>
                                <input type="password"
                                    placeholder='Password'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="input-group">
                                <label htmlFor="email">Email</label>
                                <input type="email"
                                    placeholder='Email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>

                            <button type='submit'>Register</button>
                        </form>
                        <p>{message}</p>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};
export default Register;