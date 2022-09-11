// ** Core JWT Import
import useJwt from "@src/@core/auth/jwt/useJwt";
/* Login Auth Api */
import Routes from '@Routes'
const { jwt } = useJwt({
  loginEndpoint: Routes.Auth.login,
});
export default jwt;