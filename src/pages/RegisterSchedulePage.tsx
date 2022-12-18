import FormLayout from "../layout/FormLayout";
import ScheduleRegisterFom from "../form/ScheduleRegisterFom";

export default function RegisterSchedulePage() {
  return(
    <FormLayout title='여행 일정 등록' render={<ScheduleRegisterFom/>} />
  )
}