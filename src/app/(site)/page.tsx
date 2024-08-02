import { Button } from "@tremor/react";
import { Check, X } from "lucide-react";
import Link from "next/link";
import React from "react";

const HomePage = () => {
  return (
    <main className="flex flex-col min-h-screen space-y-[6rem]">
      <div
        className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-neutral-950 
      bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] 
     dark:bg-[linear-gradient(to_right,#1b1b1c_0px,transparent_0px),linear-gradient(to_bottom,#1b1b1c_0px,transparent_0px)] 
     
      bg-[size:6rem_4rem]"
      ></div>
      <section className="mt-[6rem]">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="border-[1px] rounded-3xl p-2 px-4 dark:border-stone-50 border-neutral-300 hover:dark:bg-stone-50 hover:dark:text-stone-900 shadow-sm shadow-purple-300">
            <h1 className="text-xs text-center"> ✨ Personlised with AI</h1>
          </div>
          <div className="max-w-xl text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text">
            <h1 className="text-5xl font-semibold leading-snug tracking-wide text-center">
              Get Analysis of Your Offline Mock-Tests
            </h1>
          </div>
          <div className="max-w-lg mx-auto flex flex-col items-center justify-center space-y-2 *:text-center backdrop-blur-xl">
            <h1>
              <Check className="inline w-5 h-5 text-green-600" /> Solve Mock
              Test at comfort of your home.
            </h1>
            <h1>
              <Check className="inline w-5 h-5 text-green-600" />
              Get Online Analysis of mocks with Ranking and Percentile.
            </h1>
            <h1>
              <Check className="inline w-5 h-5 text-green-600" /> Know Your
              relative position in the competition.
            </h1>
          </div>
          <div>
            <Link href="/sign-in">
              <Button size="lg"> Get Started</Button>
            </Link>
          </div>
        </div>
      </section>
      <section className="space-y-[1rem] max-w-5xl mx-auto">
        <div>
          <h1 className="text-3xl font-semibold text-center">
            Tired of Calculating your marks on A4 sheets ?
          </h1>
        </div>
        <div className="flex flex-col md:flex-row gap-[1rem] w-full">
          <div className="flex flex-col p-4 m-4 space-y-2 text-red-700 bg-red-100 rounded-lg min-h-60 max-w-[400px]">
            <h1 className="font-semibold text-center">Analysis without eOMR</h1>
            <div className="flex flex-col items-start justify-center space-y-2">
              <h1>
                <X className="inline w-5 h-5 text-red-700" />
                Manually calculating scores
              </h1>
              <h1>
                <X className="inline w-5 h-5 text-red-700" />
                Need to maintain sheet for past test analysis
              </h1>
              <h1>
                <X className="inline w-5 h-5 text-red-700" />
                Lacking analytical aspects
              </h1>
              <h1>
                <X className="inline w-5 h-5 text-red-700" />
                All India ranking, percentile and other details cannot be known.
              </h1>
            </div>
          </div>

          <div className="flex flex-col  p-4 m-4 space-y-2 text-green-700 bg-green-100 rounded-lg min-h-60 max-w-[500px]">
            <h1 className="font-semibold text-center">Analysis with eOMR</h1>
            <div className="flex flex-col items-start justify-center space-y-2">
              <h1>
                <Check className="inline w-5 h-5 text-green-600" />
                Just Submit your OMR and eOMR Will calculate the scores.
              </h1>
              <h1>
                <Check className="inline w-5 h-5 text-green-600" />
                No need to maintain any sheets, all your past test analysis will
                be available in dashboard.
              </h1>
              <h1>
                <Check className="inline w-5 h-5 text-green-600" /> Details
                Analysis with Graphical Representations
              </h1>
              <h1>
                <Check className="inline w-5 h-5 text-green-600" /> Know Your
                Relative Ranking, Percentile in Each Test.
              </h1>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
