
import axios from 'axios';

const login = async () => {
  const url = 'http://localhost:3000/auth/login';
  const data = {
    username: 'new_user20', 
    password: 'new_password20'
  };

  try {
    const response = await axios.post(url, data);
    const token = response.data.token;

    if (!token) {
      throw new Error('Token not provided');
    }

    console.log('Token:', token);

    try {
      const itemsResponse = await axios.get('http://localhost:3000/api/items', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log('Items:', itemsResponse.data);
    } catch (error) {
      console.error('Error', error.response?.data || error.message);
    }
  } catch (error) {
    console.error('Error login', error.response?.data || error.message);
  }
};

login();
