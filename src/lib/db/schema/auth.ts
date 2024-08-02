import {
  timestamp,
  pgTable,
  text,
  primaryKey,
  integer,
  pgEnum,
  uuid,
  varchar,
  real,
  serial,
  boolean
} from "drizzle-orm/pg-core"
import type { AdapterAccount } from '@auth/core/adapters'
import { relations } from "drizzle-orm"

export const Role = pgEnum("Role", ["USER", "ADMIN"]);
export const TestStatus = pgEnum("TestStatus", ["SCHEDULED", "PUBLISHED"]);


export const users = pgTable("user", {
  id: text("id").notNull().primaryKey(),
  name: text("name"),
  email: text("email").notNull(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
  role: Role('role').default("USER"),
})

export const accounts = pgTable(
"account",
{
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  type: text("type").$type<AdapterAccount["type"]>().notNull(),
  provider: text("provider").notNull(),
  providerAccountId: text("providerAccountId").notNull(),
  refresh_token: text("refresh_token"),
  access_token: text("access_token"),
  expires_at: integer("expires_at"),
  token_type: text("token_type"),
  scope: text("scope"),
  id_token: text("id_token"),
  session_state: text("session_state"),
},
(account) => ({
  compoundKey: primaryKey({ columns: [account.provider, account.providerAccountId] }),
})
)

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").notNull().primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
})

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  })
)

export const examEnum = pgEnum('exam_type' , 
    [
    'UPSC', 
    'SSC',
    'JEE',
    'NEET',
    'GATE',
    'IBPS',
    'CET',
    'CAT',
    'RAS',
    'BPSC',
    'UPPSC',
    'MPPSC',
    'HSC',
    ]
)

export const userInfo = pgTable('user_info', {
  id: uuid('id').defaultRandom().notNull().primaryKey(),
  userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
  exam: examEnum('exam'),
  targetYear: integer('year').notNull(),
})


export const modules = pgTable('modules', {
  id: uuid('id').defaultRandom().notNull().primaryKey(),
  name: text('name').notNull(),
  examType : examEnum('examType').notNull(),
  testType : text('testType'),
  coaching : text('coaching'),
  moduleNo : integer('moduleNo').notNull().unique(),
  isPublished : boolean('isPublished').notNull().default(false),
  createdAt : timestamp('createdAt',  { withTimezone: true }).notNull().defaultNow(),
  updatedAt : timestamp('updatedAt',{ withTimezone: true }).notNull().defaultNow(),
})

export const moduleTests = pgTable("module_tests", {
  id: serial("id").notNull(),
  moduleId: uuid("moduleId").notNull().references(() => modules.id, { onDelete: "cascade" }),
  testId: uuid("testId").notNull().references(() => tests.id, { onDelete: "cascade" }),
}, 
(moduleTests) => ({
  compoundKey: primaryKey({ columns: [moduleTests.moduleId, moduleTests.testId] }),
})
);

export const userSubscribeModules = pgTable('user_subscribe_modules', {
  userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
  moduleId : uuid('moduleId').notNull().references(() => modules.id),
  createdAt : timestamp('createdAt',  { withTimezone: true }).notNull().defaultNow(),
  updatedAt : timestamp('updatedAt',{ withTimezone: true }).notNull().defaultNow(),
  expiryDate : timestamp('expiryDate',  { withTimezone: true }).notNull().defaultNow(),
  isExpired : boolean('isExpired').notNull().default(false),

}, 

(userSubscribeModules) => ({
  compoundKey: primaryKey({ columns: [userSubscribeModules.userId, userSubscribeModules.moduleId] }),
})
);

export const tests = pgTable("tests", {
  id: uuid("id").defaultRandom().notNull().primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  testId: uuid("testId").notNull().defaultRandom().unique(),
  testNumber: integer("testNumber").notNull().unique(),
  testTitle: text("testTitle").notNull(),
  coaching: text("coaching"),
  examType: examEnum("examType").notNull(),
  testType: text("testType").notNull(),
  answers: varchar("answers").notNull().array(),
  subject: varchar("subject").array(),
  testStatus : TestStatus("testStatus").default("PUBLISHED"),
  publishTime : timestamp("publishTime", { withTimezone: true }).defaultNow(),
  createdAt: timestamp("createdAt", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updatedAt", { withTimezone: true })
    .notNull()
    .defaultNow(),
});


export const omr = pgTable('omr', {
  id: uuid('id').defaultRandom().notNull(),
  userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
  testId : uuid('testId').notNull().references(() => tests.id),
  user_answers: varchar('user_answers').notNull().array(),
  createdAt : timestamp('createdAt', { withTimezone: true }).notNull().defaultNow(),
}, 
(omr) => ({
    compoundKey: primaryKey({ columns: [omr.userId, omr.testId] }),
  })
)

export const results = pgTable('results', {
  id: uuid('id').defaultRandom().notNull(),
  userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
  testId : uuid('testId').notNull().references(() => tests.id),
  correct : integer('correct').notNull(),
  incorrect : integer('incorrect').notNull(),
  unanswered : integer('unanswered').notNull(),
  totalQuestions : integer('total_questions').notNull(),
  marks : real('marks').notNull(),
  subjectCorrect : integer('subject_correct').notNull().array(),
  subjectIncorrect : integer('subject_incorrect').notNull().array(),
  subjectUnanswered : integer('subject_unanswered').notNull().array(),
  createdAt : timestamp('createdAt', { withTimezone: true }).notNull().defaultNow(),
}, 
(results) => ({
    compoundKey: primaryKey({ columns: [results.userId, results.testId] }),
  })
)



//Relations : 
export const UserTableRelations = relations(users, ({one, many}) => ({
  accounts: many(accounts),
  sessions: many(sessions),
  verificationTokens: many(verificationTokens),
  userInfo: one(userInfo, {
    fields: [users.id],
    references: [userInfo.userId],
  }),
  tests : many(tests),
  omr : many(omr),
  results : many(results),
  userSubscribeModules : many(userSubscribeModules),
}))

export const AccountTableRelations = relations(accounts, ({one, many}) => ({
  user: one(users, {
    fields: [accounts.userId],
    references: [users.id],
  }),
}))

export const SessionTableRelations = relations(sessions, ({one, many}) => ({
  user: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
}))

export const VerificationTokenTableRelations = relations(verificationTokens, ({one, many}) => ({
  user: one(users, {
    fields: [verificationTokens.identifier],
    references: [users.id],
  }),
}))


export const userInfoTableRelations = relations(userInfo, ({one, many}) => ({
  user: one(users, {
    fields: [userInfo.userId],
    references: [users.id],
  }),
}))

export const moduleTestTableRelations = relations(moduleTests, ({one, many}) => ({
  module: one(modules, {
    fields: [moduleTests.moduleId],
    references: [modules.id],
  }),
  test: one(tests, {
    fields: [moduleTests.testId],
    references: [tests.id],
  }),
}))

export const userSubscribeModuleTableRelations = relations(userSubscribeModules, ({one, many}) => ({
  user: one(users, {
    fields: [userSubscribeModules.userId],
    references: [users.id],
  }),
  module: one(modules, {
    fields: [userSubscribeModules.moduleId],
    references: [modules.id],
  }),
}))

export const testsTableRelations = relations(tests, ({one, many}) => ({
  user: one(users, {
    fields: [tests.userId],
    references: [users.id],
  }),
  omr : many(omr),
  results : many(results),
  moduleTests : many(moduleTests),
}))

export const omrTableRelations = relations(omr, ({one, many}) => ({
  user: one(users, {
    fields: [omr.userId],
    references: [users.id],
  }),
  test: one(tests, {
    fields: [omr.testId],
    references: [tests.id],
  }),
}))

export const resultsTableRelations = relations(results, ({one, many}) => ({
  user: one(users, {
    fields: [results.userId],
    references: [users.id],
  }),
  test: one(tests, {
    fields: [results.testId],
    references: [tests.id],
  }),
}))



//types 

export type Test = typeof tests.$inferInsert;
export type UserInfo = typeof userInfo.$inferInsert;
export type User = typeof users.$inferInsert;
export type examType = typeof examEnum.enumValues;
