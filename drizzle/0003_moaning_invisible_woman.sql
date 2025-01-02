CREATE TABLE "ticket" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"price" numeric,
	"limit" integer,
	"perks" text,
	"event_id" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "ticket" ADD CONSTRAINT "ticket_event_id_event_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."event"("id") ON DELETE no action ON UPDATE no action;