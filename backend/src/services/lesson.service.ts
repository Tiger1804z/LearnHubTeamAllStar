import prisma from "../prisma/prisma";

export const createLessonService = async(input:{
    moduleId: string;
    title: string;
    content: string;
    position: number;
    userId: string;
}) =>{
    const module = await prisma.module.findUnique({
        where: { id: input.moduleId },
        include: { path: true },
    });
    if (!module) {
        throw new Error("MODULE_NOT_FOUND");
    }
    if (module.path.creatorId !== input.userId) {
        throw new Error("UNAUTHORIZED");
    }
    return prisma.lesson.create({
        data: {
            moduleId : input.moduleId,
            title: input.title,
            content: input.content,
            position: input.position,
        },
    });
}

export const updateLessonService = async(lessonId:string, userId:string, data:Partial<{
    title?: string;
    content?: string;
    position?: number;
}>)=>{
    const lesson = await prisma.lesson.findUnique({
        where: { id: lessonId },
        include: { module: { include: { path: true } } },
    });
    if (!lesson) {
        throw new Error("LESSON_NOT_FOUND");
    }
    if (lesson.module.path.creatorId !== userId) {
        throw new Error("UNAUTHORIZED");
    }
    return prisma.lesson.update({
        where: { id: lessonId },
        data,
    });
}

export const deleteLessonService = async(lessonId:string, userId:string) =>{
    const lesson = await prisma.lesson.findUnique({
        where: { id: lessonId },
        include: { module: { include: { path: true } } },
    });
    if (!lesson) {
        throw new Error("LESSON_NOT_FOUND");
    }
    if (lesson.module.path.creatorId !== userId) {
        throw new Error("UNAUTHORIZED");
    }
    await prisma.lesson.delete({ where: { id: lessonId } });
    return { message: "LESSON_DELETED_SUCCESSFULLY" };
}