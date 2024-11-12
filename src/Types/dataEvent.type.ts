export type Kind_Of_Event = "appointment" | "webinar" | "other";

export interface EventType {
  event_id: string;
  event_name: string;
  event_type: Kind_Of_Event;
  event_link?: string;
  event_start_time?: string;
  event_end_time?: string;
  description?: string;
  location?: string;
}
