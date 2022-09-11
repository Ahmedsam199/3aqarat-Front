// ** Core JWT Import
import useJwt from "@src/@core/auth/jwt/useJwt";
/* Login Auth Api */
const Link = "http://192.168.1.24:8080/Users/login";

const { jwt } = useJwt({
  loginEndpoint: Link,
  registerEndpoint: Link,
  refreshEndpoint: Link,
  logoutEndpoint: Link,
});
export default jwt;