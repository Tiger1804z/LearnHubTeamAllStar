import prisma from "../prisma/prisma";

export const enrollToPathService = async(pathId:string, userId:string) =>{
    const path =  await prisma.learningPath.findUnique({
        where: { id: pathId },
    });
   
    if (!path) {
        throw new Error("PATH_NOT_FOUND");
    }
    const existingEnrollment = await prisma.enrollment.findUnique({
        where: {
            userId_pathId: {
                userId,
                pathId,
            },
       },
    });

    
    if (existingEnrollment) {
        throw new Error("ALREADY_ENROLLED");
    }
    return prisma.enrollment.create({
        data: {
            userId,
            pathId,
        },
    });
}