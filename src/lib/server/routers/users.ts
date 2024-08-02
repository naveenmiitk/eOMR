import { checkTestAttemptStatus, createNewModule, createNewTest, createResult, getAllModule, getAllModuleSubscribedByUser, getAllPublishedModule, getAllTestGivenByUser, getAllTestofUPSC, getAllTestsOfAModule, getAnswerOfTestById, getOMRDataById, getOMRIdByUserIdAndTestId, getRankingInTest, getTestById, getUserInfo, getUserRole, submitResponsetoOMR, subscribeUserToModule } from "@/lib/db/queries/queries";
import { Test } from "@/lib/db/schema/auth";
import { protectedProcedure, publicProcedure, router } from "@/lib/server/trpc";
import test from "node:test";
import { z } from "zod";

export const usersRouter = router({
  getUserData: protectedProcedure.query(async ({ ctx }) => {
    const response = await getUserInfo(ctx.session.user.id);
    return response;
  }),

  getAllTestofUPSCTrpc: publicProcedure.query(async () => {
    const response = await getAllTestofUPSC();
    return response;
  }),

  getAllModuleSubscribedByUserTrpc: protectedProcedure.query(
    async ({ ctx }) => {
      const response = await getAllModuleSubscribedByUser(ctx.session.user.id);
      return response;
    }
  ),

  getAllTestsOfAModuleTrpc: protectedProcedure
    .input(z.string().uuid({ message: "Invalid Module-ID" }))
    .query(async ({ ctx, input }) => {
      const response = await getAllTestsOfAModule(input);
      return response;
    }),

  getTestByIdTrpc: protectedProcedure
    .input(z.string().uuid({ message: "Invalid Test-ID" }))
    .query(async ({ ctx, input }) => {
      const response = await getTestById(input);
      return response;
    }),

  getAnswerOfTestByIdTrpc: protectedProcedure
    .input(z.string().uuid({ message: "Invalid Test-ID" }))
    .query(async ({ ctx, input }) => {
      const response = await getAnswerOfTestById(input);
      return response;
    }),

  getAttemptedTestOMRIdTrpc: protectedProcedure
    .input(z.string().uuid({ message: "Invalid Test-ID" }))
    .query(async ({ ctx, input }) => {
      const response = await checkTestAttemptStatus(ctx.session.user.id, input);
      return response;
    }),

  getOMRDataByIdTrpc: protectedProcedure
    .input(z.string().uuid({ message: "Invalid OMR-ID" }))
    .query(async ({ ctx, input }) => {
      const response = await getOMRDataById(input);
      return response;
    }),

  getOMRIdByUserIdAndTestIdTrpc: protectedProcedure
    .input(z.string().uuid({ message: "Invalid Test-ID" }))
    .query(async ({ ctx, input }) => {
      const response = await getOMRIdByUserIdAndTestId(
        ctx.session.user.id,
        input
      );
      return response;
    }),

  getRankingInTestTrpc: protectedProcedure
    .input(z.string().uuid({ message: "Invalid Test-ID" }))
    .query(async ({ ctx, input }) => {
      const response = await getRankingInTest(ctx.session.user.id, input);
      return response;
    }),

  getAllTestGivenByUserTrpc: protectedProcedure.query(async ({ ctx }) => {
    const response = await getAllTestGivenByUser(ctx.session.user.id);
    return response;
  }),

  getAllModuleForUserTrpc: protectedProcedure.query(async () => {
    const response = await getAllPublishedModule();
    return response;
  }),

  createNewTestTrpc: protectedProcedure
    .input(
      z.object({
        // userId : z.string(),
        testTitle: z.string().min(1, {
          message: "Test title is required",
        }),
        coaching: z.string().min(1, {
          message: "coaching is required",
        }),
        testNumber: z.number().min(1, {
          message: "test number is required",
        }),
        testStatus: z.enum(["PUBLISHED", "SCHEDULED"]),
        publishTime: z.date({ required_error: "publish time is required" }),
        examType: z.enum(["UPSC"]),
        testType: z.string().min(1, {
          message: "test type is required",
        }),
        answers: z
          .array(
            z.enum(["A", "B", "C", "D"], {
              required_error: "You need to select an option.",
            })
          )
          .refine((val) => val.length == 80 || val.length == 100, {
            message: "Answer length should be 80 or 100",
          }),
        subject: z
          .array(
            z.enum(
              [
                "P",
                "E",
                "AI",
                "MI",
                "MD",
                "AC",
                "ST",
                "EN",
                "G",
                "M",
                "IR",
                "CA",
                "CP",
                "QU",
                "R",
              ],
              {
                required_error: "You need to select an option.",
              }
            )
          )
          .refine((val) => val.length == 80 || val.length == 100, {
            message: "Answer Subject length should be 80 or 100",
          }),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // console.log('input:', input)
      const { id } = ctx.session.user;
      const data = {
        userId: id,
        ...input,
      };
      const response = await createNewTest(data);
      return response;
    }),

  submitOMRResponseTrpc: protectedProcedure
    .input(
      z.object({
        user_answers: z
          .array(
            z.string().min(1, {
              message: "answers are required",
            })
          )
          .refine((val) => val.length == 80 || val.length == 100, {
            message: "Answer length should be 80 or 100",
          }),
        testId: z.string().min(1, {
          message: "test id is required",
        }),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // console.log('input:', input)
      const { id } = ctx.session.user;
      const data = {
        userId: id,
        ...input,
      };
      const response = await submitResponsetoOMR(data);
      return response;
    }),

  createResultTrpc: protectedProcedure
    .input(
      z.object({
        testId: z.string().min(1, {
          message: "test id is required",
        }),
        correct: z.number().min(0, {
          message: "No. of correct question is required",
        }),
        incorrect: z.number().min(0, {
          message: "No. of incorrect question is required",
        }),
        unanswered: z.number().min(0, {
          message: "No. of unanswered question is required",
        }),
        totalQuestions: z.number().min(80, {
          message: "total questions is required",
        }),
        subjectCorrect: z
          .array(
            z.number().min(0, {
              message: "subject correct is required",
            })
          )
          .length(15, {
            message: "subject correct length mismatched",
          }),
        subjectIncorrect: z
          .array(
            z.number().min(0, {
              message: "subject incorrect is required",
            })
          )
          .length(15, {
            message: "subject incorrect length mismatched",
          }),
        subjectUnanswered: z
          .array(
            z.number().min(0, {
              message: "subject unanswered is required",
            })
          )
          .length(15, {
            message: "subject unanswered length mismatched",
          }),
        marks: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // console.log('input:', input)
      const { id } = ctx.session.user;
      const data = {
        userId: id,
        ...input,
      };
      const response = await createResult(data);
      return response;
    }),

  createNewModuleTrpc: protectedProcedure
    .input(
      z.object({
        name: z.string().min(2).max(50),
        moduleNo: z.string().min(2).max(8),
        coaching: z.string().min(1, {
          message: "coaching is required",
        }),
        examType: z.enum(["UPSC"]),
        testType: z.string().min(1, {
          message: "test type is required",
        }),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id } = ctx.session.user;
      const role = await getUserRole(id);

      if (role[0].role !== "ADMIN") {
        throw new Error("Only Admins can create new modules");
        return;
      }

      const data = {
        ...input,
      };
      const response = await createNewModule(data);
      return response;
    }),

  subscribeUserToModuleTrpc: protectedProcedure
    .input(
      z.object({
        userId: z.string().uuid({ message: "Invalid User-ID" }),
        moduleId: z.string().uuid({ message: "Invalid Module-ID" }),
        expiryDate: z.date(),
        isExpired: z.boolean(),
      })
    )
    .mutation(async ({ input }) => {
      const response = await subscribeUserToModule(input);
      return response;
    }),
});