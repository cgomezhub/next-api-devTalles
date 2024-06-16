'use server';
import prisma from "@/lib/prisma";
import { Todo } from "@prisma/client";
import { revalidatePath } from "next/cache";



export const sleep = (seconds: number = 0) => new Promise((resolve) => setTimeout(resolve, seconds * 1000));


export const  toggleTodo = async (id: string, complete:boolean):Promise<Todo> => {

    await sleep(3);

    const todo = await prisma.todo.findFirst({ where: { id } });

    if (!todo) {
    throw new Error(`Todo with ID ${id} not found`);
    }

    const updateTodo = await prisma.todo.update({
    where: { id },
    data: { complete },
    });

    revalidatePath("/dashboard/server-actions");

    return updateTodo;

};


export const addTodo = async (description: string) => {
    try {
            
        const todo = await prisma.todo.create({ data:  {description}  })
              
        revalidatePath("/dashboard/server-actions");
        return todo;
        
      } catch (error) {
        return ( {message: "error creating tod0"} );  
      }
}

export const deleteCompletedTodos = async () => {

    try {
    
        await prisma.todo.deleteMany({
          where: { complete: true},
        });

        revalidatePath("/dashboard/server-actions");
    
        return ({ message: "Deleted completed todos" });
    
      } catch (error: any) {
    
        return ({ message: "ERROR"});
      }

}
