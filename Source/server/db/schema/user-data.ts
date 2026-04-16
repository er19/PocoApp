import { One, relations } from "drizzle-orm";
import { pgTable, text, timestamp, pgEnum, boolean, serial, integer} from "drizzle-orm/pg-core";
import { user } from "./auth-schema";

const timestamps = {
  started_at: timestamp().defaultNow(),
  finished_at: timestamp(),
}

export const statusEnum = pgEnum("status", ["focused", "paused", "unfocused"]);
export const timeOfDayEnum = pgEnum("time_of_day", ["morning", "afternoon", "evening", "Midnight"])

export const activity = pgTable("activity", {
    id : serial("id").primaryKey(),
    userId: text("user_id").references(() => user.id).notNull(),
    activityName: text("activity_name").unique(),
    weeklyGoal: integer("weekly_goal")
});

export const focusSession = pgTable("focus_session", {
    id : serial("id").primaryKey(),
    activtyId: integer("activity_id").references(()=> activity.id),
    duration: integer("duration").notNull(),
    ...timestamps,
    status: statusEnum().default("focused"),
    timeOfDay: timeOfDayEnum()
});

export const activityOverview = pgTable("activity_overview", {
    activityId: integer("activity_id").primaryKey().references(( )=> activity.id),
    weeklyGoalLeft: integer("weekly_goal_left"),
    totalTimeLogged: integer("total_time_logged").default(0),
    averageFocusTime: integer("average_focus_time").default(0),
    numberOfSessions: integer("number_of_sessions"),
})

export const OverviewStats = pgTable("overview_stats", {
    id: serial("id").primaryKey(),
    userId: text("user_id").references(() => user.id).notNull(),
    totalFocusHours: integer("total_focus_hours").default(0),
    totalSessions: integer("total_sessions").default(0),
    currentStreak: integer("current_streak").default(0),
    bestStreak: integer("best_streak").default(0)
})

export const task = pgTable("task", {
    id: serial("id").primaryKey(),
    activityId: integer("task_id").references(()=>activity.id),
    taskDescription: text("task_description").notNull(),
    estimatedTime: integer("estimated_time"),
    taskStatus: boolean("task_status").default(false)
})

export const activityRelations = relations(activity, ({ many, one }) => ({
    focusSessions: many(focusSession),
    tasks: many(task),
    stats: one(activityOverview)
}));

export const focusSessionRelations = relations(focusSession, ({ one }) => ({
    activity: one(activity, {
        fields: [focusSession.activtyId],
        references: [activity.id]
    })
}));

export const taskRelations = relations(task, ({ one }) => ({
    activity: one(activity, {
        fields: [task.activityId],
        references: [activity.id]
    })
}));