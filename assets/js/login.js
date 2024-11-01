import {login } from './data.js';

const loginButton =document.querySelector('#login_Button');
loginButton.addEventListener('click', async () => {
  login();
});
