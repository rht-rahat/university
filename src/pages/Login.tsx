import { Button } from "antd";
import { FieldValues } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hooks";
import { TUser, setUser } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import "../assets/style/style.css";
import PHForm from "../components/form/PHForm";
import PHInput from "../components/form/PHInput";
import university from "../assets/images/bg.jpg";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const defaultValues = {
    userId: "F-0001",
    password: "123456",
  };

  const [login] = useLoginMutation();
  // console.log(login);

  const onSubmit = async (data: FieldValues) => {
    // console.log(data);
    const toastId = toast.loading("Loading...");

    try {
      const userInfo = {
        id: data.userId,
        password: data.password,
      };

      const res = await login(userInfo).unwrap();
      const user = verifyToken(res.data.accessToken) as TUser;
     
      // console.log(res);
      dispatch(setUser({ user: user, token: res.data.accessToken }));
      toast.success(res.message, { id: toastId, duration: 2000 });

      if (res.data.needsPasswordChange) {
        navigate("/change-password");
      } else {
        navigate(`/${user?.role}/dashboard`);
      }
    } catch (error) {
      toast.error("Something is wrong", { id: toastId, duration: 2000 });
    }
  };
  return (
    <section className="h-screen w-full flex relative">
      <div className="imgBx">
        <img src={university} alt="" />
      </div>
      <div className="contentBx">
        <div className="formBx">
          <h2>Login</h2>
          <PHForm onSubmit={onSubmit} defaultValues={defaultValues}>
            <div className="inputBx">
              <PHInput
                type="text"
                name="userId"
                label="ID:"
                className="input"
              />
            </div>
            <div className="inputBx">
              <PHInput
                type="text"
                name="password"
                label="Password"
                className="input"
              />
            </div>
            <div className="inputBx">
              <Button htmlType="submit" className="">
                Login
              </Button>
            </div>
          </PHForm>
        </div>
      </div>
    </section>
  );
};

export default Login;
