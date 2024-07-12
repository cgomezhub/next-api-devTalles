import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs';

export async function GET(request: Request) {
  await prisma.todo.deleteMany(); // delete all todos delete * from todos
  await prisma.user.deleteMany(); // delete all users delete * from users

  const user = await prisma.user.create({

    data: {
      email: "test1@gmail.com ",
      password: bcrypt.hashSync("test1", 10),
      roles: ['client', 'admin', 'super-user'],
      todos: {
        create: [
          {
            description: "Piedra del alma",
          },
          {
            description: "Piedra del Poder",
            complete: true,

          },
          {
            description: "Piedra del espacio",
          },
          {
            description: "Piedra de la realidad",
          },
          {
            description: "Piedra del tiempo",
          },
        ]
      }

    },

  }
  );
  return NextResponse.json({
    message: "seed executed",
  });

}
