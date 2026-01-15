import prisma from "../prisma/prisma";
import type { PathLevel } from "../generated/prisma/enums";

export const listPathService = async  (params:{
  search?: string;
  category?: string;
  level?: PathLevel;
  published?: boolean;
  page: number;
  pageSize: number;
  sort?: "newest" | "oldest";
}) =>{
   const {search, category, level, published, page, pageSize, sort} = params;
   const where :any = {};
   if (typeof published === "boolean") {
        where.isPublished = published;
    }
    if (category) {
        where.category = category;
    }
    if (level) {
        where.level = level;
    }
    if (search) {
         where.OR = [
            { title: { contains: search, mode: "insensitive" } },
            { description: { contains: search, mode: "insensitive" } },
            ];
    }
    const orderBy = { createdAt: sort === "oldest" ? "asc" : "desc" } as const;
    const [items,total] = await Promise.all([
        prisma.learningPath.findMany({
        where,
        orderBy,
        skip: (page - 1) * pageSize,
        take: pageSize,
        select: {
            id: true,
            title: true,
            description: true,
            category: true,
            level: true,
            estMinutes: true,
            isPublished: true,
            createdAt: true,
            creator: { select: { id: true, profile: { select: { displayName: true } } } },
      },
    }),
    prisma.learningPath.count({ where }),
  ]);
   return {
    items,
    page,
    pageSize,
    total,
    totalPages: Math.ceil(total / pageSize),
  };
}



