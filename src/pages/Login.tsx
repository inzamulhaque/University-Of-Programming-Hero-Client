import { Button } from "antd";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hooks";
import { setUser } from "../redux/features/auth/authSlice";
import verifyToken from "../utils/verifyToken";

type TLoginInfo = {
  id: string;
  password: string;
};

const Login = () => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      id: "2024010001",
      password: "123456",
    },
  });
  const [login] = useLoginMutation();
  const dispatch = useAppDispatch();

  const onSubmit = async (info: TLoginInfo) => {
    const res = await login(info).unwrap();

    const userInfo = verifyToken(res.data.accessToken);

    dispatch(setUser({ user: userInfo, token: res.data.accessToken }));
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
