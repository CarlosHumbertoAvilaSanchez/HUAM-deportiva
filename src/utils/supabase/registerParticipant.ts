import { createClient } from "@/utils/supabase/client";
import type { RegisterFormData } from "@/utils/definitions";
export default async function registerParticipant(
  formData: RegisterFormData,
  eventId: string
) {
  const supabase = createClient();

  let { data, error } = await supabase.rpc("insert_participant_and_profile", {
    input_birth_day: formData.birthDay,
    input_category_id: formData.categoryId,
    input_email: formData.email,
    input_event_id: eventId,
    input_gender_id: formData.genderId,
    input_last_name: formData.lastName,
    input_name: formData.name,
    input_phone_number: formData.phoneNumber,
    input_team: formData.team,
    input_tshirt_size_id: formData.tshirtSizeId,
  });
  if (error) {
    console.error("Error registering:", error);
    throw error;
  }

  // if (formData.createAccount) {
  //   const { error } = await supabase.auth.signInWithOtp({
  //     email: formData.email,
  //     options: { shouldCreateUser: true },
  //   });
  // }
  return data;
}
