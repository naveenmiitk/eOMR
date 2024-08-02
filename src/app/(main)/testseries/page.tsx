import TestCardComponent from "@/components/TestSeries/TestCardComponent";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/trpc/api";
import Link from "next/link";
import React from "react";
import { unstable_noStore as noStore } from "next/cache";
import { compareCoaching } from "@/lib/utils";
import TableModuleForUser from "@/components/TestSeries/TableModuleForUser";
import { redirect } from "next/navigation";
import ModuleToTest from "@/components/TestSeries/ModuleToTest";

const TestSeriesPage = async () => {
  noStore();
  const allModule = await api.users.getAllModuleSubscribedByUserTrpc.query();

  if (allModule.length === 0) {
    return <div>You haven&apos;t subscribed to any test series.</div>;
  }

  return (
    <main>
      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Test Series</h1>
        </div>
        <div className="mt-[2rem] lg:mb-[4rem] border-b-2 border-neutral-300 border-dotted">
          <TableModuleForUser data={allModule} />
        </div>
        <div>
          {allModule.map((item, index) => (
            <div key={index} className="p-4 space-y-4  ">
              <h1 className="text-2xl font-semibold">{item.name}</h1>
              <ModuleToTest moduleId={item.id} />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default TestSeriesPage;
