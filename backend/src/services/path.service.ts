import prisma from "../prisma/prisma";
import type { PathLevel } from "../generated/prisma/enums";
import type { UpdatePathInput } from "../types/input.types";


export const createPathService = async (input:{
    creatorId: string;
    title: string;
    description: string;
    category: string;
    level: PathLevel;
    estMinutes?: number | null;
})=>{
    return prisma.learningPath.create({
         data: {
            creatorId: input.creatorId,
            title: input.title,
            description: input.description,
            category: input.category,
            level: input.level,
            estMinutes: input.estMinutes ?? null,
            isPublished: false,
            },
    });
}


export const updatePathService = async (pathId: string, userId: string, input: UpdatePathInput) =>{
    if (Object.keys(input).length === 0) {
        throw new Error("NO_FIELDS_TO_UPDATE");
    }
   const path = await prisma.learningPath.findUnique({
        where: { id: pathId },
   });
    if (!path) {
        throw new Error("PATH_NOT_FOUND");
    }
    if (path.creatorId !== userId) {
        throw new Error("UNAUTHORIZED");
    }
    return prisma.learningPath.update({
        where: { id: pathId },
        data: input,
    });
}

export const deletePathService = async (pathId: string, userId: string) =>{
    const path = await prisma.learningPath.findUnique({
         where: { id: pathId },
    });
    if (!path) {
        throw new Error("PATH_NOT_FOUND");
    }
    if (path.creatorId !== userId) {
         throw new Error("UNAUTHORIZED");
    }
   await prisma.learningPath.delete({ where: { id: pathId } });
   return { message: "PATH_DELETED_SUCCESSFULLY" };
}

export const publishPathService = async (pathId: string, userId: string,publish:boolean) =>{
    const path = await prisma.learningPath.findUnique({
         where: { id: pathId },
    });
    if (!path) {
        throw new Error("PATH_NOT_FOUND");
    }
    if (path.creatorId !== userId) {
         throw new Error("UNAUTHORIZED");
    }
    return prisma.learningPath.update({
        where: { id: pathId },
        data: { isPublished: publish },
    });
}

export const getPathByIdService = async (pathId: string) =>{
    return prisma.learningPath.findUnique({ where: { id: pathId },
        include: { creator: { select: { profile: true, email: true } } },
     });
}

export const getPathTreeService = (pathId: string) => {
  return prisma.learningPath.findUnique({
    where: { id: pathId },
    include: {
      modules: {
        orderBy: { position: "asc" },
        include: {
          lessons: { orderBy: { position: "asc" } },
        },
      },
    },
  });
};