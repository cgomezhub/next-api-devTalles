
export const dynamic = 'force-dynamic';
export const revalidate = 0;

import prisma from "@/lib/prisma";
import { NewTodo, TodoGrid } from "@/todos";

export const metadata = {
  title: "List of Todos",
  description: "SEO Title",
};

export default async function ServerActionsPage() {
  const todos = await prisma.todo.findMany({ orderBy: { description: "asc" } });

  console.log("procesado");
  return (
    <>
      <span className="Stext-3xl font-bold mb-20">Server Actions</span>

      <div className="w-full px-5 mx-5 mb-5">
        <NewTodo />
      </div>

      <TodoGrid todos={todos} />
    </>
  );
}
