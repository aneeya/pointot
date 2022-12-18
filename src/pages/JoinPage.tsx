import FormLayout from "../layout/FormLayout";
import JoinForm from "../form/JoinForm";

export default function JoinPage() {
  return(
    <FormLayout title='회원가입' render={<JoinForm />} />
  )
}