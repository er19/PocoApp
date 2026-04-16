CREATE TYPE "public"."status" AS ENUM('focused', 'paused', 'unfocused');--> statement-breakpoint
CREATE TYPE "public"."time_of_day" AS ENUM('morning', 'afternoon', 'evening', 'Midnight');--> statement-breakpoint
CREATE TABLE "overview_stats" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"total_focus_hours" integer DEFAULT 0,
	"total_sessions" integer DEFAULT 0,
	"current_streak" integer DEFAULT 0,
	"best_streak" integer DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE "activity" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"activity_name" text,
	"weekly_goal" integer,
	CONSTRAINT "activity_activity_name_unique" UNIQUE("activity_name")
);
--> statement-breakpoint
CREATE TABLE "activity_overview" (
	"activity_id" integer PRIMARY KEY NOT NULL,
	"weekly_goal_left" integer,
	"total_time_logged" integer DEFAULT 0,
	"average_focus_time" integer DEFAULT 0,
	"number_of_sessions" integer
);
--> statement-breakpoint
CREATE TABLE "focus_session" (
	"id" serial PRIMARY KEY NOT NULL,
	"activity_id" integer,
	"duration" integer NOT NULL,
	"started_at" timestamp DEFAULT now(),
	"finished_at" timestamp,
	"status" "status" DEFAULT 'focused',
	"timeOfDay" time_of_day
);
--> statement-breakpoint
CREATE TABLE "task" (
	"id" serial PRIMARY KEY NOT NULL,
	"task_id" integer,
	"task_description" text NOT NULL,
	"estimated_time" integer,
	"task_status" boolean DEFAULT false
);
--> statement-breakpoint
ALTER TABLE "overview_stats" ADD CONSTRAINT "overview_stats_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "activity" ADD CONSTRAINT "activity_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "activity_overview" ADD CONSTRAINT "activity_overview_activity_id_activity_id_fk" FOREIGN KEY ("activity_id") REFERENCES "public"."activity"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "focus_session" ADD CONSTRAINT "focus_session_activity_id_activity_id_fk" FOREIGN KEY ("activity_id") REFERENCES "public"."activity"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "task" ADD CONSTRAINT "task_task_id_activity_id_fk" FOREIGN KEY ("task_id") REFERENCES "public"."activity"("id") ON DELETE no action ON UPDATE no action;