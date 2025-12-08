import { apiClient } from '../api/apiClient';

export const loginUser = async ( user ) => {
  const response = await apiClient.post('/login', user,
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });
    if (response.data == null ) {
      
      // Maneja los errores de la API, por ejemplo, credenciales incorrectas
      return 0;
    }  else return response;
};