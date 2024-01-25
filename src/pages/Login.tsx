import { Button, Row } from "antd";
import { FieldValues } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hooks";
import { TUser, setUser } from "../redux/features/auth/authSlice";
import verifyToken from "../utils/verifyToken";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import PHForm from "../components/form/PHForm";
import PHInput from "../components/form/PHInput";

const Login = () => {
  const navigate = useNavigate();

  const [login] = useLoginMutation();
  const dispatch = useAppDispatch();

  const defaultValues = {
    id: "2024010001",
    password: "123456",
  };

  const onSubmit = async (info: FieldValues) => {
    const loadingToastId = toast.loading("Login in proccess! Please wait");
    try {
      const res = await login(info).unwrap();

      const userInfo = verifyToken(res.data.accessToken) as TUser;

      dispatch(setUser({ user: userInfo, token: res.data.accessToken }));
      toast.success("Loging successful", {
        id: loadingToastId,
        duration: 3000,
      });
      navigate(`/${userInfo.role! as string}/dashboard`);
    } catch (error) {
      toast.error("Something went wrong! Please try again", {
        id: loadingToastId,
      });
    }
  };
  return (
    <>
      <Row justify="center" align="middle" style={{ height: "100vh" }}>
        <PHForm onSubmit={onSubmit} defaultValues={defaultValues}>
          <PHInput type="text" name="id" label="ID:" />

          <PHInput type="text" name="password" label="Password:" />

          <Button htmlType="submit">Login</Button>
        </PHForm>
      </Row>
    </>
  );
};

export default Login;
