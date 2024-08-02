DO $$ BEGIN
 CREATE TYPE "public"."Role" AS ENUM('USER', 'ADMIN');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."TestStatus" AS ENUM('SCHEDULED', 'PUBLISHED');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."exam_type" AS ENUM('UPSC', 'SSC', 'JEE', 'NEET', 'GATE', 'IBPS', 'CET', 'CAT', 'RAS', 'BPSC', 'UPPSC', 'MPPSC', 'HSC');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "account" (
	"userId" text NOT NULL,
	"type" text NOT NULL,
	"provider" text NOT NULL,
	"providerAccountId" text NOT NULL,
	"refresh_token" text,
	"access_token" text,
	"expires_at" integer,
	"token_type" text,
	"scope" text,
	"id_token" text,
	"session_state" text,
	CONSTRAINT "account_provider_providerAccountId_pk" PRIMARY KEY("provider","providerAccountId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "module_tests" (
	"id" serial NOT NULL,
	"moduleId" uuid NOT NULL,
	"testId" uuid NOT NULL,
	CONSTRAINT "module_tests_moduleId_testId_pk" PRIMARY KEY("moduleId","testId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "modules" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"examType" "exam_type" NOT NULL,
	"testType" text,
	"coaching" text,
	"moduleNo" integer NOT NULL,
	"isPublished" boolean DEFAULT false NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "modules_moduleNo_unique" UNIQUE("moduleNo")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "omr" (
	"id" uuid DEFAULT gen_random_uuid() NOT NULL,
	"userId" text NOT NULL,
	"testId" uuid NOT NULL,
	"user_answers" varchar[],
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "omr_userId_testId_pk" PRIMARY KEY("userId","testId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "results" (
	"id" uuid DEFAULT gen_random_uuid() NOT NULL,
	"userId" text NOT NULL,
	"testId" uuid NOT NULL,
	"correct" integer NOT NULL,
	"incorrect" integer NOT NULL,
	"unanswered" integer NOT NULL,
	"total_questions" integer NOT NULL,
	"marks" real NOT NULL,
	"subject_correct" integer[],
	"subject_incorrect" integer[],
	"subject_unanswered" integer[],
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "results_userId_testId_pk" PRIMARY KEY("userId","testId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "session" (
	"sessionToken" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"expires" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tests" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"userId" text NOT NULL,
	"testId" uuid DEFAULT gen_random_uuid() NOT NULL,
	"testNumber" integer NOT NULL,
	"testTitle" text NOT NULL,
	"coaching" text,
	"examType" "exam_type" NOT NULL,
	"testType" text NOT NULL,
	"answers" varchar[],
	"subject" varchar[],
	"testStatus" "TestStatus" DEFAULT 'PUBLISHED',
	"publishTime" timestamp with time zone DEFAULT now(),
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "tests_testId_unique" UNIQUE("testId"),
	CONSTRAINT "tests_testNumber_unique" UNIQUE("testNumber")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_info" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"userId" text NOT NULL,
	"exam" "exam_type",
	"year" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_subscribe_modules" (
	"userId" text NOT NULL,
	"moduleId" uuid NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
	"expiryDate" timestamp with time zone DEFAULT now() NOT NULL,
	"isExpired" boolean DEFAULT false NOT NULL,
	CONSTRAINT "user_subscribe_modules_userId_moduleId_pk" PRIMARY KEY("userId","moduleId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text,
	"email" text NOT NULL,
	"emailVerified" timestamp,
	"image" text,
	"role" "Role" DEFAULT 'USER'
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "verificationToken" (
	"identifier" text NOT NULL,
	"token" text NOT NULL,
	"expires" timestamp NOT NULL,
	CONSTRAINT "verificationToken_identifier_token_pk" PRIMARY KEY("identifier","token")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "account" ADD CONSTRAINT "account_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "module_tests" ADD CONSTRAINT "module_tests_moduleId_modules_id_fk" FOREIGN KEY ("moduleId") REFERENCES "public"."modules"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "module_tests" ADD CONSTRAINT "module_tests_testId_tests_id_fk" FOREIGN KEY ("testId") REFERENCES "public"."tests"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "omr" ADD CONSTRAINT "omr_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "omr" ADD CONSTRAINT "omr_testId_tests_id_fk" FOREIGN KEY ("testId") REFERENCES "public"."tests"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "results" ADD CONSTRAINT "results_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "results" ADD CONSTRAINT "results_testId_tests_id_fk" FOREIGN KEY ("testId") REFERENCES "public"."tests"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "session" ADD CONSTRAINT "session_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tests" ADD CONSTRAINT "tests_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_info" ADD CONSTRAINT "user_info_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_subscribe_modules" ADD CONSTRAINT "user_subscribe_modules_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_subscribe_modules" ADD CONSTRAINT "user_subscribe_modules_moduleId_modules_id_fk" FOREIGN KEY ("moduleId") REFERENCES "public"."modules"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
