"use client";
import { Input } from "@/components/ui/input";
import { Poppins } from "next/font/google";
import Container from "./Container";
import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";
import Link from "next/link";
import { LoadingContext } from "@/context/loading";
import { usePathname } from "next/navigation";
import { IoClose } from "react-icons/io5";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Button } from "./ui/button";
const poppins = Poppins({ subsets: ["latin"], weight: ["300", "400", "500"] });

export default function Navbar() {
  const [search, setSearch] = useState<string>("");
  const path = usePathname();
  // const [isLoading, setIsLoading] = useState<boolean>(false);
  const { isLoading } = useContext(LoadingContext);
  const router = useRouter();
  const handlerSearch = (e: React.FormEvent<HTMLInputElement>) => {
    setSearch(e.currentTarget.value);
  };

  const handlerSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      router.push(`/recommend?s=${search}`);
    }
  };

  return (
    <nav className={`${poppins.className} w-full border shadow  py-4  `}>
      <Container className="flex items-center  gap-[80px] mx-auto px-4">
        <h1 className="font-medium text-xl text-[#352F44]">
          <Link href={"/"}>ANIMEH</Link>
        </h1>
        <div className="sm:hidden flex w-full justify-end">
          <div className="w-fit">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline">
                  <IoClose />
                </Button>
              </SheetTrigger>
              <SheetContent side={"left"}>
                <SheetHeader>
                  <SheetTitle>
                    <Link href={"/"}>ANIMEH</Link>
                  </SheetTitle>
                </SheetHeader>
                <ul className="text-[#352F44] mt-4 w-full items-center flex flex-col gap-4">
                  <li>
                    <Link
                      href={"/"}
                      className={`${path === "/" && "font-semibold"}`}
                    >
                      Anime
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={"/watch"}
                      className={`${path === "/watch" && "font-semibold"}`}
                    >
                      Watch
                    </Link>
                  </li>
                </ul>
              </SheetContent>
            </Sheet>
          </div>
        </div>
        <div className={`hidden sm:flex items-center gap-[80px] w-full`}>
          <ul className="flex gap-8 text-[#352F44]">
            <li>
              <Link href={"/"} className={`${path === "/" && "font-semibold"}`}>
                Anime
              </Link>
            </li>
            <li>
              <Link
                href={"/watch"}
                className={`${path === "/watch" && "font-semibold"}`}
              >
                Watch
              </Link>
            </li>
          </ul>
          <Input
            onChange={handlerSearch}
            onKeyDown={handlerSubmit}
            disabled={isLoading ? true : false}
            placeholder="search..."
          />
        </div>
      </Container>
    </nav>
  );
}
