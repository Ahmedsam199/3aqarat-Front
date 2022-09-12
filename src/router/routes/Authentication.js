// ** React Imports
import { lazy } from 'react'

const Login = lazy(() => import('../../views/Pages/authentication/Login'))
const Register = lazy(() => import('../../views/Pages/authentication/Register'))

const AuthenticationRoutes = [
  {
    path: "/login",
    element: <Login />,
    meta: {
      layout: "blank",
      publicRoute: true,
      restricted: true,
    },
  },
  {
    path: "/register",
    element: <Register />,
    meta: {
      layout: "blank",
      publicRoute: true,
      restricted: true,
    },
  },

];

export default AuthenticationRoutes
