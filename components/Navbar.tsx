"use client";
import { Input } from "@/components/ui/input";
import { Poppins } from "next/font/google";
import Container from "./Container";
import { useRouter } from "next/navigation";
import React, { ReactEventHandler, useState } from "react";
import axios from "axios";
const poppins = Poppins({ subsets: ["latin"], weight: ["300", "400", "500"] });

export default function Navbar() {
  const [search, setSearch] = useState<string>("");
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
        <h1 className="font-medium text-xl text-[#352F44]">ANIMEH</h1>
        <ul className="flex gap-8 text-[#352F44]">
          <li>News</li>
          <li>Anime</li>
          <li>Reviews</li>
        </ul>
        <Input
          onChange={handlerSearch}
          onKeyDown={handlerSubmit}
          placeholder="search..."
        />
      </Container>
    </nav>
  );
}
