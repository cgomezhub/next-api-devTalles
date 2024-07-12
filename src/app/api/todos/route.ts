import prisma from "@/lib/prisma";
import { NextResponse} from "next/server";
import * as yup from "yup"; // authentication package
import { auth } from "../../../../auth";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const take = Number(searchParams.get("take") ?? "10");
  const skip = Number(searchParams.get("skip") ?? "0");

  if (isNaN(take)) {
    return NextResponse.json(
      { error: "take has to be a number" },
      { status: 400 }
    );
  }
  if (isNaN(skip)) {
    return NextResponse.json(
      { error: "skip has to be a number" },
      { status: 400 }
    );
  }

  const todos = await prisma.todo.findMany({
    take: take,
    skip: skip,
  });

  return NextResponse.json(todos);
}

const postSchema = yup.object({
  description: yup.string().required(),
  complete: yup.boolean().optional().default(false),
});

export async function POST(request: Request) { 

  const session = await auth();
  const user = session?.user

  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const  {complete, description}  = await postSchema.validate( await request.json() );

    const todo = await prisma.todo.create({ data:  {complete, description, userId: user.id}  })
  
    
    return NextResponse.json(todo);
    
  } catch (error) {
    return NextResponse.json( error, { status: 400 } );
  }

}

export async function DELETE() {

  const session = await auth();
  const user = session?.user

  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    
    await prisma.todo.deleteMany({
      where: { complete: true, userId: user.id},
    });

    return NextResponse.json({ message: "Deleted completed todos" });

  } catch (error: any) {

    return NextResponse.json({ message: error.message, name: error.name }, { status: 400 });
  }

}
