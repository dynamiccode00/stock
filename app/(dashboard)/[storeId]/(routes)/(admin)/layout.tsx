import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";

interface DashboardPageProps {
  params: {
    storeId: string;
  };
}

export default async function SetupLayout({
  params,
  children,
}: {
  children: React.ReactNode;
  params: { storeId: string };
}) {
  const { userId, user } = auth();

  if (userId == 'user_2ZFkhqgvmyN8kO9H7HyhS8FRYIN') {
    redirect(`/${params.storeId}/seller`);
  }

  return <>{children}</>;
}
