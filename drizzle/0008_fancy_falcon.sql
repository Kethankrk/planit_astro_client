ALTER TABLE "contributors-call-response" DROP CONSTRAINT "contributors-call-response_call_id_contributors-call_id_fk";
--> statement-breakpoint
ALTER TABLE "contributors-call" DROP CONSTRAINT "contributors-call_event_id_event_id_fk";
--> statement-breakpoint
ALTER TABLE "ticket-response" DROP CONSTRAINT "ticket-response_ticket_id_ticket_id_fk";
--> statement-breakpoint
ALTER TABLE "ticket" DROP CONSTRAINT "ticket_event_id_event_id_fk";
--> statement-breakpoint
ALTER TABLE "ticket-response" ALTER COLUMN "ticket_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "contributors-call-response" ADD CONSTRAINT "contributors-call-response_call_id_contributors-call_id_fk" FOREIGN KEY ("call_id") REFERENCES "public"."contributors-call"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "contributors-call" ADD CONSTRAINT "contributors-call_event_id_event_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."event"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ticket-response" ADD CONSTRAINT "ticket-response_ticket_id_ticket_id_fk" FOREIGN KEY ("ticket_id") REFERENCES "public"."ticket"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ticket" ADD CONSTRAINT "ticket_event_id_event_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."event"("id") ON DELETE cascade ON UPDATE no action;