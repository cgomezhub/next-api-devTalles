import prisma from "@/lib/prisma";
import { Todo } from "@prisma/client";
import { NextResponse} from "next/server";
import * as yup from "yup";

interface Segmemts {
  params: {
    id: string;
  };
}


const getTodo = async( id: string ):Promise<Todo | null> => {

  const todo = await prisma.todo.findFirst({ where: { id } });

  return todo;
}

export async function GET(request: Request, { params }: Segmemts) {

  const todo = await getTodo(params.id);

  if (!todo) {
    return NextResponse.json({ error: "Todo not found" }, { status: 404 });
  }

  return NextResponse.json(todo);
}

const putSchema = yup.object({
  complete: yup.boolean().optional(),
  description: yup.string().optional(),
});

export async function PUT(request: Request, { params }: Segmemts) {

  const todo = await getTodo(params.id);

  if (!todo) {
    return NextResponse.json({ error: "Todo not found" }, { status: 404 });
  }

  try {
    const { complete, description, ...rest } = await putSchema.validate(
      await request.json()
    );

    const updatedTodo = await prisma.todo.update({
      where: { id: params.id},
      data: { complete, description },
    });

    return NextResponse.json(updatedTodo);

  } catch (error: any) {

    return NextResponse.json({ message: error.message, name: error.name }, { status: 400 });
  }

}

