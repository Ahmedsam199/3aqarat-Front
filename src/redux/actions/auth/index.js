// ** UseJWT import to get config
import Routes from '@Routes';
import useJwt from '@src/auth/jwt/useJwt';
import axios from 'axios';
const config = useJwt.jwtConfig;

// ** Handle User Login
export const handleLogin = (data) => {
  return (dispatch) => {
    dispatch({
      type: 'LOGIN',
      data,
      config,
      [config.storageTokenKeyName]: data[config.storageTokenKeyName],
      [config.storageRefreshTokenKeyName]:
        data[config.storageRefreshTokenKeyName],
    });

    // ** Add to user, accessToken & refreshToken to localStorage
    localStorage.setItem('userData', JSON.stringify(data));
    localStorage.setItem(
      config.storageTokenKeyName,
      JSON.stringify(data.accessToken)
    );
    localStorage.setItem(
      config.storageRefreshTokenKeyName,
      JSON.stringify(data.refreshToken)
    );
  };
};

// ** Handle User Logout
export const handleLogout = () => {
  return async (dispatch) => {
    await axios.get(Routes.Auth.logout);
    // ** Remove user, accessToken & refreshToken from localStorage
    await Promise.all([
      localStorage.removeItem('accessToken'),
      localStorage.removeItem('refreshToken '),
      localStorage.removeItem('userData'),
      localStorage.removeItem('userData'),
      localStorage.removeItem('channelName'),
      localStorage.removeItem('info'),
      localStorage.removeItem('imgBase64'),
      localStorage.removeItem('pusherTransportTLS'),
      localStorage.removeItem(config.storageTokenKeyName),
      localStorage.removeItem(config.storageRefreshTokenKeyName),
    ]);
    dispatch({
      type: 'LOGOUT',
      [config.storageTokenKeyName]: null,
      [config.storageRefreshTokenKeyName]: null,
    });
  };
};
