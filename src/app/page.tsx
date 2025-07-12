"use server"

import Image from "next/image";
import {vazirmatn} from "@/app/fonts";
import Link from "next/link";

export default async function Home() {
  return (
    <div className={`${vazirmatn.className} font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20`}>
      <main className="flex flex-col gap-[32px] bg-secondary/5 backdrop-blur-xl row-start-2 items-center p-5 border-2 border-black rounded-xl">
        <Image
          className="light:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <ol className="list-inside text-lg font-bold text-center">
          <li className="tracking-[-.01em]">
            برای ورود کلیک کنید
          </li>
        </ol>

        <div className="flex gap-4 items-center justify-center flex-col sm:flex-row">
          <Link
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-secondary text-background gap-2 font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
            href="/auth"
            rel="noopener noreferrer"
          >
            <p className={'text-background'}>ورود</p>
            <Image
              className={"light:invert"}
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
          </Link>
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          درباره ما
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          تماس با ما
        </a>
      </footer>
    </div>
  );
}
