"use server";

import { db } from "..";
import { eq , and, desc, sql, asc} from "drizzle-orm";
import { users, userInfo, tests, Test, omr, results, modules, moduleTests, userSubscribeModules } from "../schema/auth";
import test from "node:test";



export const getUserInfo = async(userId : string) => {
    // const response = await db.query.users.findFirst({
    //     with : {
    //         userInfo  : {
    //             columns : {
    //                 id : false,
    //                 userId : false,
    //             }
    //         }
    //     }, 
    //     where : (users, funcs) => funcs.eq(users.id, userId)
    // })

    const response = await db.select({
        id : users.id,
        name : users.name,
        email : users.email,
        emailVerified : users.emailVerified,
        image : users.image,
        exam : userInfo.exam,
        targetYear : userInfo.targetYear
    }).from(users).where(eq(users.id, userId)).leftJoin(userInfo, eq(userInfo.userId , users.id));
    

    return response;
}

export const getUserRole = async(userId : string) => {
    const response = await db.select({
        role : users.role
    }).from(users).where(eq(users.id, userId));
    return response;
}

export const getUserIdByEmail = async(email : string) => {
    const response = await db.select({
        id : users.id
    }).from(users).where(eq(users.email, email));
    const data = response[0].id;
    if(!data) return null;
    return data;
}

export const getAllModuleSubscribedByUser = async(userId : string) => {
    const response = await db.select({
        id : userSubscribeModules.moduleId,
        name : modules.name, 
        testType : modules.testType,
        coaching : modules.coaching,
        examType : modules.examType,
        moduleNo : modules.moduleNo,
        expiryDate : userSubscribeModules.expiryDate,
    }).from(userSubscribeModules).where(eq(userSubscribeModules.userId, userId)).leftJoin(modules, eq(modules.id, userSubscribeModules.moduleId));
    return response;
}

export const getAllTestsOfAModule = async(moduleId : string) => {
    const response = await db.select({
        id : moduleTests.testId,
        name : tests.testTitle!,
        testType : tests.testType!,
        coaching : tests.coaching!,
        createdAt : tests.createdAt!,
        testNumber : tests.testNumber!, 
    }).from(moduleTests).where(eq(moduleTests.moduleId, moduleId)).leftJoin(tests, eq(tests.id, moduleTests.testId)).orderBy(asc(tests.testNumber));

    // Data validation
    response.forEach((test) => {
        if (!test.name || !test.testType || !test.coaching || !test.createdAt) {
        throw new Error("Missing required test data");
        return;
        }
    });

    return response;
}

export const createNewTest = async(data : any ) => {
    const response = await db.insert(tests).values(data).returning();
    return response;
}

export const createNewModule = async(data : any ) => {
    const response = await db.insert(modules).values(data).returning();
    return response;
}

export const LinkTestToModule = async(data : any ) => {
    const response = await db.insert(moduleTests).values(data).returning();
    return response;
}

export const subscribeUserToModule = async(data : any ) => {
    const response = await db.insert(userSubscribeModules).values(data).returning();
    return response;
}

export const getAllTestofUPSC = async() => {
    const response = await db.select({
        id : tests.id,
        name : tests.testTitle,
        testType : tests.testType,
        coaching : tests.coaching,
        createdAt : tests.createdAt,
    }).from(tests).where(eq(tests.examType, 'UPSC'));
    return response;
}

export const getTestById = async(id : string) => {
    const response = await db.select({
        id : tests.id,
        name : tests.testTitle,
        examType : tests.examType,
        testType : tests.testType,
        coaching : tests.coaching,
        // answers : tests.answers,
        createdAt : tests.createdAt,
    }).from(tests).where(eq(tests.id, id));
    return response;
}

export const getAnswerOfTestById = async(id : string) => {
    const response = await db.select({
        id : tests.id,
        answers : tests.answers, 
    }).from(tests).where(eq(tests.id, id));
    return response;
}


export const submitResponsetoOMR = async(data : any) => {
    const response = await db.insert(omr).values(data).returning();
    return response;
}

export const checkTestAttemptStatus = async(userId : string, testId : string) => {
    const response = await db.select({
        id : omr.id, 
        testStatus : tests.testStatus, 
        publishTime : tests.publishTime,
    }).from(omr).where(
        and(
            eq(omr.userId, userId),
            eq(omr.testId, testId)
        )
    ).leftJoin(tests, eq(omr.testId, tests.id));
    return response;
}

export const getOMRIdByUserIdAndTestId = async(userId : string, testId : string) => {
    const response = await db.select({
        id : omr.id,
        answers : omr.user_answers,
        testId : omr.testId,
        createdAt : omr.createdAt,
        actual_answers : tests.answers,
        testType : tests.testType,
        subject : tests.subject,
    }).from(omr).where(
        and(
            eq(omr.userId, userId),
            eq(omr.testId, testId)
        )
    ).leftJoin(tests, eq(omr.testId, tests.id));
    return response;
}

export const getOMRDataById = async(id : string) => {
    const response = await db.select({
        id : omr.id,
        answers : omr.user_answers,
        testId : omr.testId,
        createdAt : omr.createdAt,
        actual_answers : tests.answers,
        testType : tests.testType, 
        subject : tests.subject,
    }).from(omr).where(eq(omr.id, id)).leftJoin(tests, eq(omr.testId, tests.id));
    return response;
}

export const createResult = async(data : any) => {
    const response = await db.insert(results).values(data).returning();
    return response;
}


export const getRankingInTest = async(userId: string, testId : string) => {
    const raw_response = await db.select({
        marks : results.marks, 
        user : results.userId,
    }).from(results).where(eq(results.testId, testId)).orderBy(desc(results.marks));

    const index = raw_response.findIndex((item) => item.user === userId);

    const response = {
        rank : index + 1, 
        total_students  : raw_response.length, 
        percentile : (((raw_response.length - index-1) / raw_response.length) * 100).toFixed(2),
    }

    return response;
}

export const getAllTestGivenByUser = async(userId : string) => {
    const response = await db.select({
        testId : tests.id,
        testTitle : tests.testTitle,
        coaching : tests.coaching,
        testType : tests.testType, 
        testStatus : tests.testStatus,
        attempted_at : omr.createdAt,
        marks : results.marks,
        subjectCorrect : results.subjectCorrect,
        subjectIncorrect : results.subjectIncorrect,
        subjectUnanswered : results.subjectUnanswered, 
    }).from(omr).where(and(eq(omr.userId, userId), eq(tests.testStatus, "PUBLISHED"))).leftJoin(tests, eq(tests.id, omr.testId)).rightJoin(results, and(eq(results.userId, userId), eq(results.testId, omr.testId))).orderBy(desc(omr.createdAt));

    return response;
}

export const getAllModule = async() => {
    const response = await db.select({
        id : modules.id,
        name : modules.name, 
        moduleNo : modules.moduleNo,
        examType : modules.examType,
        testType : modules.testType,
        coaching : modules.coaching,
        createdAt : modules.createdAt,
    }).from(modules).orderBy(desc(modules.createdAt));
    return response;
}

export const getAllPublishedModule = async () => {
  const response = await db
    .select({
      id: modules.id,
      name: modules.name,
      moduleNo: modules.moduleNo,
      examType: modules.examType,
      testType: modules.testType,
      coaching: modules.coaching,
      createdAt: modules.createdAt,
    })
    .from(modules).where(eq(modules.isPublished, true))
    .orderBy(desc(modules.createdAt));
  return response;
};