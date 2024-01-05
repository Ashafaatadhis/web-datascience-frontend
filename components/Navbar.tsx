"use client";
import { Input } from "@/components/ui/input";
import { Poppins } from "next/font/google";
import Container from "./Container";
import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";

import axios from "axios";
import Link from "next/link";
import { LoadingContext } from "@/context/loading";
const poppins = Poppins({ subsets: ["latin"], weight: ["300", "400", "500"] });

export default function Navbar() {
  const [search, setSearch] = useState<string>("");
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
        <ul className="flex gap-8 text-[#352F44]">
          <li>
            <Link href={"/"}>Anime</Link>
          </li>
          <li>
            <Link href={"/watch"}>Watch</Link>
          </li>
        </ul>
        <Input
          onChange={handlerSearch}
          onKeyDown={handlerSubmit}
          disabled={isLoading ? true : false}
          placeholder="search..."
        />
      </Container>
    </nav>
  );
}
