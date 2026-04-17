/*import { useDispatch } from "react-redux";
import { logout } from "../../store/features/auth/authSlice";
import { Button } from "antd";

export default function Dashboard() {
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Dashboard</h1>
      <Button onClick={() => dispatch(logout())}>
        Logout
      </Button>
    </div>
  );
}*/

import { useDispatch } from "react-redux";
import Layout from '/src/ui/components/layout/Layout'
import ContactForm from '/src/ui/components/form/ContactForm'
import { logout } from "../../store/features/auth/authSlice";
import { Button } from "antd";

export default function Dashboard() {

  const dispatch = useDispatch();

  return (
    <Layout>
      <ContactForm />
      <div>
        <Button onClick={() => dispatch(logout())}>
        Logout
      </Button>
      </div>
    </Layout>
    
  )
}

//export default Dashboard