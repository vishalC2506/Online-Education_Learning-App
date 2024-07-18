import EditSectionForm from "@/components/sections/EditSectionForm";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const SectionDetailsPage = async ({
  params,
}: {
  params: { courseId: string; sectionId: string };
}) => {
  const { userId } = auth();
  if (!userId) return redirect("/sign-in");
  const course = await db.course.findUnique({
    where: { id: params.courseId, instructorId: userId },
  });
  if (!course) return redirect("/instructor/courses");
  const section = await db.section.findUnique({
    where: {
      id: params.sectionId,
      courseId: params.courseId,
    },
    include: { resources: true, muxData: true },
  });
  if (!section)
    return redirect(`/instructor/courses/${params.courseId}/sections`);
  const isCompleted = false;
  return (
    <div className="px-10 mb-5">
      <EditSectionForm
        section={section}
        courseId={params.courseId}
        isCompleted={isCompleted}
      />
    </div>
  );
};

export default SectionDetailsPage;
