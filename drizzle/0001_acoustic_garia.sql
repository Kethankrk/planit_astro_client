CREATE TABLE "event" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"start_at" timestamp NOT NULL,
	"ending_at" timestamp NOT NULL,
	"banner" text NOT NULL,
	"location" text NOT NULL,
	"requirements" text[] DEFAULT '{}',
	"user_id" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "event" ADD CONSTRAINT "event_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;