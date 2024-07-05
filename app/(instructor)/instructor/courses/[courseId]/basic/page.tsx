import React from "react";
import EditCourseForm from "../../EditCourseForm";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";

const CourseBasics = async ({ params }: { params: { courseId: string } }) => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/sign-in");
  }
  const course = await db.course.findUnique({
    where: { id: params.courseId, instructorId: userId },
  });
  if (!course) {
    return redirect("/instructor/courses");
  }
  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
    include: {
      subCategories: true,
    },
  });
  const levels = await db.level.findMany();
  return (
    <div className="px-10 mb-4">
      <EditCourseForm
        course={course}
        categories={categories.map((category) => ({
          label: category.name,
          value: category.id,
          subCategories: category.subCategories.map((subCategory) => ({
            label: subCategory.name,
            value: subCategory.id,
          })),
        }))}
        levels={levels.map(Level=>({label:Level.name,value:Level.id}))}
      />
    </div>
  );
};

export default CourseBasics;
