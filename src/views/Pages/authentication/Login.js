// ** React Imports
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

// ** Custom Hooks
import { useSkin } from "@hooks/useSkin";
import useJwt from "@src/auth/jwt/useJwt";

// ** Third Party Components
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

// ** Actions
import { handleLogin } from "@store/actions/auth";

// ** Context
import { AbilityContext } from "@src/utility/context/Can";

// ** Custom Components
import InputPasswordToggle from "@components/input-password-toggle";

// ** Utils
import { getHomeRouteForLoggedInUser } from "@utils";
const source2 = require(`@src/assets/images/logo/logo.svg`).default;
// ** Reactstrap Imports
import themeConfig from "@configs/themeConfig";
import { Button, CardTitle, Col, Form, Input, Label, Row } from "reactstrap";
// ** Styles
import "@styles/react/pages/page-authentication.scss";
// Login Toast Container
const ToastContent = ({ t, name, role }) => {
  return (
    <div>
      <div>
        <h4>Welcome to Al-Jazary Real Estate</h4>
      </div>
      <br></br>
      <div className="text-center">
        <img
          className="brand-logo"
          width={36}
          height={30}
          src={themeConfig.app.appLogoImage}
        ></img>
      </div>
    </div>
  );
};

const defaultValues = {
  UserName: "",
  Password: "",
};

const Login = () => {
  // ** Hooks

  const { skin } = useSkin();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ability = useContext(AbilityContext);
  const {
    control,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });
  const illustration = skin === "dark" ? "login-v2-dark.svg" : "login-v2.svg",
    source = require(`@src/assets/images/pages/aaqarat.svg`).default;

  const onSubmit = (data) => {
    if (Object.values(data).every((field) => field.length > 0)) {
      useJwt
        .login({ UserName: data.UserName, Password: data.Password })
        .then((res) => {
          console.log("HELLO", res.data.Permissions);
          const data = {
            ...res.data,
            ability: res.data.Permissions,

            accessToken: res.data.accessToken,
            role: "admin",
          };
          dispatch(handleLogin(data));
          ability.update(res.data.Permissions);
          navigate(getHomeRouteForLoggedInUser("admin"));
          toast((t) => (
            <ToastContent
              t={t}
              role={data.role || "admin"}
              name={data.fullName || data.username || "John Doe"}
            />
          ));
        })
        .catch((err) => {
          console.log(err);
          // toast.error(err.response.data.message);
        });
    } else {
      for (const key in data) {
        if (data[key].length === 0) {
          setError(key, {
            type: "manual",
          });
        }
      }
    }
  };

  return (
    <div className="auth-wrapper auth-cover">
      <Row className="auth-inner m-0">
        <Link className="brand-logo" to="/" onClick={(e) => e.preventDefault()}>
          <img src={source2} height="28" />
          <h2 className="brand-text text-primary ms-1">Real Estate</h2>
        </Link>
        <Col className="d-none d-lg-flex align-items-center p-5" lg="8" sm="12">
          <div className="w-100 d-lg-flex align-items-center justify-content-center ">
            <img className="img-fluid" src={source} alt="Login Cover" />
          </div>
        </Col>
        <Col className="d-flex align-items-center auth-bg " lg="4" sm="12">
          <Col className="px-xl-2 mx-auto" sm="8" md="6" lg="12">
            <CardTitle tag="h2" className="fw-bold mb-1">
              Welcome to Al-Jazary Real Estate 👋
            </CardTitle>
            <Form
              className="auth-login-form mt-2"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="mb-1">
                <Label className="form-label" for="login-email">
                  UserName
                </Label>
                <Controller
                  id="UserName"
                  name="UserName"
                  control={control}
                  render={({ field }) => (
                    <Input
                      autoFocus
                      placeholder="john@example.com"
                      invalid={errors.loginEmail && true}
                      {...field}
                    />
                  )}
                />
              </div>
              <div className="mb-1">
                <div className="d-flex justify-content-between">
                  <Label className="form-label" for="login-password">
                    Password
                  </Label>
                </div>
                <Controller
                  id="Password"
                  name="Password"
                  control={control}
                  render={({ field }) => (
                    <InputPasswordToggle
                      className="input-group-merge"
                      invalid={errors.password && true}
                      {...field}
                    />
                  )}
                />
              </div>
              <Button type="submit" color="primary" block>
                Sign in
              </Button>
            </Form>
            {/* <p className="text-center mt-2">
              <span className="me-25">New on our platform?</span>
              <Link to="/register">
                <span>Create an account</span>
              </Link>
            </p> */}
          </Col>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
