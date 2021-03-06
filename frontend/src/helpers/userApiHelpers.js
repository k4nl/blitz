import userApi from '../services/userServices';

const setSessionInfo = (token, email) => {
  sessionStorage.token = token;
  sessionStorage.email = email;
};

const clearSessionInfo = () => {
  sessionStorage.removeItem('email');
  sessionStorage.removeItem('token');
};

export const createUser = async (userInfo) => {
  try {
    const response = await userApi.post('/sign', userInfo);
    return response;
  } catch (error) {
    const { data } = await error.response;
    return { message: data.message,  status: data.status };
  }
}

export const login = async (userInfo) => {
  try {
    const response = await userApi.post('/', userInfo);
    const { token } = response.data;

    setSessionInfo(token, userInfo.email);

    return { status: response.status };
  } catch (error) {
    const { data } = await error.response;
    return { message: data.message,  status: data.status };
  }
};

export const userLogout = () => {
  clearSessionInfo();
};
