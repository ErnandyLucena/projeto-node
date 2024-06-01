import axios from 'axios';

const register = async () => {
  const url = 'http://localhost:3000/auth/register';
  const data = {
    username: 'new_user20',
    password: 'new_password20'
  };

  try {
    const response = await axios.post(url, data);
    console.log('Registrado com sucesso', response.data);
  } catch (error) {
    console.error('Erro ao registrar', error.response?.data || error.message);
  }
};

register();
