import axios from 'axios';

const baseURL =
	process.env.NODE_ENV === 'production'
		? 'https://caju-server.onrender.com'
		: 'http://localhost:3000';

const api = axios.create({
	baseURL,
});

export default api;
