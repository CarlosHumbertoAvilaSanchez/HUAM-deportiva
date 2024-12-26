import getEventById from "@/utils/supabase/fetchEvent";
import RegistrationForm from "@/components/RegistrationForm";

export default async function Register({
  params,
}: {
  params: {
    eventId: string;
  };
}) {
  const { eventId } = await params;
  const event = await getEventById(eventId);

  return <RegistrationForm eventId={eventId} />;
}
