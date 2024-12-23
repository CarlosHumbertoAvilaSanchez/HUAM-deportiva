import getEventById from "@/utils/supabase/fetchEvent";

export default async function EventDetail({
  params,
}: {
  params: {
    eventId: string;
  };
}) {
  const { eventId } = await params;
  const event = await getEventById(eventId);
}
