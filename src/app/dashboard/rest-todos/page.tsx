import prisma from "@/lib/prisma";
import { NewTodo, TodoGrid } from "@/todos";

export const metadata = {
  title: "List of Todos",
  description: "SEO Title",
};

export default async function RestTodosPage() {
  const todos = await prisma.todo.findMany({ orderBy: { description: "asc" } });
  return (
    <div>
      <div className="w-full px-5 mx-5 mb-5">
        <NewTodo />
      </div>

      <TodoGrid todos={todos} />
    </div>
  );
}
