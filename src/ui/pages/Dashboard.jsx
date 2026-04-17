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

import Layout from '../components/layout/Layout'
import ContactForm from '../components/form/ContactForm'

function Dashboard() {



  return (
    <Layout>
      <ContactForm />
    </Layout>
    
  )
}
export default Dashboard