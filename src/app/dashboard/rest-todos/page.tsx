export const dynamic = "force-dynamic";
export const revalidate = 0;

import { auth } from "../../../../auth";
import prisma from "@/lib/prisma";
import { NewTodo, TodoGrid } from "@/todos";
import { redirect } from "next/navigation";
import { User } from "next-auth";

export const metadata = {
  title: "List of Todos",
  description: "SEO Title",
};

export default async function RestTodosPage() {
  const session = await auth();

  const user = session?.user ?? "no user";

  if (!user) {
    console.log("redirecting");
    redirect("/api/auth/signin");
  }

  const todos = await prisma.todo.findMany({
    where: { userId: (user as User)?.id },
    orderBy: { description: "asc" },
  });

  return (
    <div>
      <span className="text-3xl mb-10">Rest TODOS</span>

      <div className="w-full px-5 mx-5 mb-5">
        <NewTodo />
      </div>

      <TodoGrid todos={todos} />
    </div>
  );
}
