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
  return (
    <div>
      <EditCourseForm course={course} />
    </div>
  );
};

export default CourseBasics;
