import FormLayout from "../layout/FormLayout";
import LoginForm from "../form/LoginForm";

export default function LoginPage() {
  return(
    <FormLayout title='로그인' render={<LoginForm />} />
  )
}