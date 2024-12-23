import getEventById from "@/utils/supabase/fetchEvent";

export default async function Register({
  params,
}: {
  params: {
    eventId: string;
  };
}) {
  const { eventId } = await params;
  const event = await getEventById(eventId);

  return <div>{event.name}</div>;
}
