import { Button } from "antd";
import PHForm from "../components/form/PHForm";
import PHInput from "../components/form/PHInput";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useChangePasswordMutation } from "../redux/features/admin/userManagement.api";
import { toast } from "sonner";
import { TResponse } from "../types/global";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../redux/hooks";
import { logOut } from "../redux/features/auth/authSlice";
import "../assets/style/style.css";
import university from "../assets/images/bg.jpg";

const ChangePassword = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [changePassword] = useChangePasswordMutation();
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
    const res = (await changePassword(data)) as TResponse<any>;
    console.log(res);

    if (res?.data?.success) {
      dispatch(logOut());
      toast.success(res?.data?.message);
      return navigate("/login");
    }
  };
  return (
    <section className="h-screen w-full flex relative">
      <div className="imgBx">
        <img src={university} alt="" />
      </div>
      <div className="contentBx">
        <div className="formBx">
          <h2>Change Password</h2>
          <PHForm onSubmit={onSubmit}>
            <div className="inputBx">
              <PHInput type="text" name="oldPassword" label="Old Password" />
            </div>
            <div className="inputBx">
              <PHInput type="text" name="newPassword" label="New Password" />
            </div>
            <div className="inputBx">
              <Button htmlType="submit" className="">
                Change Password
              </Button>
            </div>
          </PHForm>
        </div>
      </div>
    </section>
  );
};

export default ChangePassword;
