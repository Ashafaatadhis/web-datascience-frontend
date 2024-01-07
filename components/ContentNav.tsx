"use client";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ContentNav() {
  const path = usePathname();
  useEffect(() => {
    console.log(path);
  }, []);
  return (
    <div className="text-[#5C5470]  flex h-5 items-center space-x-4">
      <div className="">
        <Link href={"/"} className={`${path === "/" && "font-semibold"}`}>
          All
        </Link>
      </div>
      <Separator orientation="vertical" className="" />
      <div>
        <Link
          href={"/foryou"}
          className={`${path === "/foryou" && "font-semibold"}`}
        >
          Recommendation
        </Link>
      </div>
      <div>
        <Link
          href={"/favorites"}
          className={`${path === "/favorites" && "font-semibold"}`}
        >
          Favorites
        </Link>
      </div>
    </div>
  );
}
