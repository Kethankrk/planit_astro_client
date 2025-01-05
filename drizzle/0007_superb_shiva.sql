CREATE TABLE "contributors-call-response" (
	"id" serial PRIMARY KEY NOT NULL,
	"bio" text NOT NULL,
	"user_id" text NOT NULL,
	"call_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "contributors-call" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"role" text NOT NULL,
	"event_id" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "contributors-call-response" ADD CONSTRAINT "contributors-call-response_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "contributors-call-response" ADD CONSTRAINT "contributors-call-response_call_id_contributors-call_id_fk" FOREIGN KEY ("call_id") REFERENCES "public"."contributors-call"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "contributors-call" ADD CONSTRAINT "contributors-call_event_id_event_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."event"("id") ON DELETE no action ON UPDATE no action;