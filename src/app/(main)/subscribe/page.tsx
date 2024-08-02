import ModuleSubscribe from "@/components/Subscribe/ModuleSubscribe";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/trpc/api";
import { unstable_noStore } from "next/cache";
import Link from "next/link";
import React from "react";

const SubscribePage = async () => {
  unstable_noStore();
  const allModules = await api.users.getAllModuleForUserTrpc.query();
  const subscribed = await api.users.getAllModuleSubscribedByUserTrpc.query();

  //show all those module which not subcribed by user and not expired
  // const notSubscribedmodules = allModules.filter((module) => !subscribed.includes(module.id) && !module.isExpired);
  // console.log(allModules, subscribed);

  const subscribedModuleIds = new Set(subscribed.map((module) => module.id));

  // Filter all modules where the ID is not found in subscribed modules
  const notSubscribedModules = allModules.filter(
    (module) => !subscribedModuleIds.has(module.id)
  );

  if (notSubscribedModules.length < 1) {
    return (
      <div className="space-y-4">
        <h1>No Modules to Subscribe. Shortly New Module will be available.</h1>
        <h1>
          Till Then, Please attempt tests from already subscribed mdoules.
        </h1>

        <Button asChild>
          <Link href="/testseries" className="my-4">
            Test Series{" "}
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h1>Subscribe to Below Test Series : </h1>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[2rem]">
        {notSubscribedModules.map((module) => (
          <div key={module.id}>
            <ModuleSubscribe module={module} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubscribePage;
