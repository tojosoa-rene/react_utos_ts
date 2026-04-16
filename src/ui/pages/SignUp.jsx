import { useDispatch } from "react-redux";
import { logout } from "../../store/features/auth/authSlice";
import { Button } from "antd";

export default function SignUp() {
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Sign Up</h1>
      <Button onClick={() => dispatch(logout())}>
        Logout
      </Button>
    </div>
  );
}