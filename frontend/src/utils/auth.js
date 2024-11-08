
//functions for handling tokens

// save to local storage
export const setToken = (token) => localStorage.setItem('token', token);


//retrieve the token from local storage
export const getToken = (token) => localStorage.getItem('token');


// remove the token from local storage
export const removeToken = () => localStorage.removeItem('token');