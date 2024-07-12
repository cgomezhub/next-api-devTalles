import { WidgetItem } from "@/components";
import { auth } from "../../../auth";
import { redirect } from "next/navigation";

export default async function DasboardPage() {
  const session = await auth();
  if (!session) {
    redirect("/api/auth/signin");
  }

  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2">
      <WidgetItem title="Usuario Conectado S-Side">
        <div className="flex flex-col">
          <span className="text-xl text-gray-600 "> {session.user?.name ?? "no name" }</span>
          <span className="text-xl text-gray-600 "> {session.user?.email ?? "no email"}</span>
          <span className="text-xl text-gray-600 "> {session.user?.image ?? "no image"}</span>
          <span className="text-xl text-gray-600 "> {session.user?.roles?.join(', ') ?? "no roles"}</span>
          <span className="text-xl text-gray-600 "> {session.user?.id ?? "no UUID"}</span>
        </div>

        
      </WidgetItem>
    </div>
  );
}
