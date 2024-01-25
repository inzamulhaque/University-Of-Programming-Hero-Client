import { Button } from "antd";
import { FieldValues, useForm } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hooks";
import { TUser, setUser } from "../redux/features/auth/authSlice";
import verifyToken from "../utils/verifyToken";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Login = () => {
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm({
    defaultValues: {
      id: "2024010001",
      password: "123456",
    },
  });
  const [login] = useLoginMutation();
  const dispatch = useAppDispatch();

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
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="id">ID:</label>
          <input type="text" id="id" {...register("id")} />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="text" id="password" {...register("password")} />
        </div>
        <Button htmlType="submit">Login</Button>
      </form>
    </>
  );
};

export default Login;
