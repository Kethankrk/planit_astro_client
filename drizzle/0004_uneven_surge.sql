CREATE TABLE "ticket-response" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"phone" text NOT NULL,
	"address" text NOT NULL,
	"ticket_id" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "ticket-response" ADD CONSTRAINT "ticket-response_ticket_id_ticket_id_fk" FOREIGN KEY ("ticket_id") REFERENCES "public"."ticket"("id") ON DELETE no action ON UPDATE no action;