import prisma from "../prisma/prisma";

export const createModuleService = async(input:{
    title: string;
    pathId: string;
    position: number;
    userId: string;
}) =>{
    const path = await prisma.learningPath.findUnique({
        where: { id: input.pathId },
    });
    if (!path) {
        throw new Error("PATH_NOT_FOUND");
    }
    if (path.creatorId !== input.userId) {
        throw new Error("UNAUTHORIZED");
    }
    return prisma.module.create({
        data: {
            pathId : input.pathId,
            title: input.title,
            position: input.position,
        },
    });
}

export const updateModuleService = async(moduleId:string, userId:string, data:Partial<{
    title?: string;
    position?: number;
}>)=>{
    const module = await prisma.module.findUnique({
        where: { id: moduleId },
        include: { path: true },
    });
    if (!module) {
        throw new Error("MODULE_NOT_FOUND");
    }
    if (module.path.creatorId !== userId) {
        throw new Error("UNAUTHORIZED");
    }
    return prisma.module.update({
        where: { id: moduleId },
        data,
    });
}

export const deleteModuleService = async(moduleId:string, userId:string) =>{
    const module = await prisma.module.findUnique({
        where: { id: moduleId },
        include: { path: true },
    });
    if (!module) {
        throw new Error("MODULE_NOT_FOUND");
    }
    if (module.path.creatorId !== userId) {
        throw new Error("UNAUTHORIZED");
    }
    await prisma.module.delete({ where: { id: moduleId } });
    return { message: "MODULE_DELETED_SUCCESSFULLY" };
}

export const getModuleByIdService = async(moduleId:string) =>{
    return prisma.module.findUnique({
        where: { id: moduleId },
        include: {
            lessons: {
                orderBy: { position: "asc" },
            },
        },
    });
}
