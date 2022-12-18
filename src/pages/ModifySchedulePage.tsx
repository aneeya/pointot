import FormLayout from "../layout/FormLayout";
import ScheduleModifyForm from "../form/ScheduleModifyForm";

export default function ModifySchedulePage() {
  return(
    <FormLayout title='여행 일정 수정' render={<ScheduleModifyForm/>}/>
  )
}