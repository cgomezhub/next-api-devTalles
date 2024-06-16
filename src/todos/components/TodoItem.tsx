'use client';

import {startTransition, useOptimistic} from "react";

import { Todo } from "@prisma/client";

import styles from "./TodoItem.module.css";
import { IoCheckboxOutline, IoSquareOutline } from "react-icons/io5";


interface Props {
  todo: Todo;
    updateTodo:(id: string, complete: boolean) => Promise<Todo|void>;

}

export const TodoItem = ({ todo, updateTodo }: Props) => {
  const [optimisticTodo, setOptimisticTodo] = useOptimistic(todo, (state, newCompleteValue: boolean) => ({...state, complete: newCompleteValue})
  );

  const onToggleTodo = async () => {
  
    try {

      startTransition(() => 

      setOptimisticTodo(!optimisticTodo.complete));      
      await updateTodo(optimisticTodo.id, !optimisticTodo.complete);
      

    } catch (error) {
      startTransition(() => setOptimisticTodo(!optimisticTodo.complete));
    }

  }


  return (
    <div className={optimisticTodo.complete ? styles.todoDone : styles.todoPending}>
      <div className="flex flex-col sm:flex-row justify-start items-center gap-4">
        <div
          // onClick={ () => updateTodo(optimisticTodo.id, !optimisticTodo.complete)}
          onClick={ onToggleTodo }
          className={`flex p-2 rounded-md cursor-pointer
          hover:bg-opacity-60 bg-blue-100 ${todo.complete ? "bg-blue-100" : "bg-red-100"}`}
        >
          { optimisticTodo.complete ?  <IoCheckboxOutline size={30}/> : <IoSquareOutline />}
        </div>
        <div className="text-center sm:text-left">{optimisticTodo.description}</div>
      </div>
    </div>
  );
};
