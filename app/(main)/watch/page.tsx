"use client";
import Container from "@/components/Container";
import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { Poppins } from "next/font/google";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { Separator } from "@radix-ui/react-separator";

const poppins = Poppins({ subsets: ["latin"], weight: ["300", "400", "500"] });

type Anime = {
  img: string;
  link: string;
  title: string;
};

export default function Detail() {
  const [search, setSearch] = useState<string>("");
  const [data, setData] = useState<Anime[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handlerSubmit = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setIsLoading(true);
      try {
        const data = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND}/api/anime?s=${search}`
        );
        setData(data.data.data);
      } catch (err) {
        console.log(err);
      }
      setIsLoading(false);
    }
  };
  const handlerSearch = async (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsLoading(true);
    try {
      const data = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND}/api/anime?s=${search}`
      );
      setData(data.data.data);
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };

  return (
    <Container className={`${poppins.className} mx-auto mt-[30px] px-4`}>
      <div className="flex w-full max-w-sm items-center space-x-2">
        <Input
          type="text"
          value={search}
          disabled={isLoading ? true : false}
          onKeyDown={handlerSubmit}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearch(e.target.value)
          }
          placeholder="search anime..."
        />
        {isLoading ? (
          <Button onClick={handlerSearch} disabled type="button">
            Loading...
          </Button>
        ) : (
          <Button onClick={handlerSearch} type="button">
            Search
          </Button>
        )}
      </div>

      <div className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-6    gap-3 mt-10">
        {isLoading ? (
          <div className="">
            <Skeleton className="w-full h-[208px]" />
            <div className="space-y-2 mt-2">
              <Skeleton className="h-4 w-full" />
            </div>
          </div>
        ) : (
          <>
            {data &&
              data.map(({ img, link, title }, index) => {
                return (
                  <div key={index} className="rounded">
                    <img src={img} className="rounded object-cover" alt="" />
                    <div className="mt-1">
                      <h4 className="text-[#352F44] md:text-base text-sm font-medium">
                        <Link href={`/watch/detail?s=${link}`}>
                          {title.length < 16
                            ? title
                            : title.substring(0, 16) + "..."}
                        </Link>
                      </h4>
                    </div>
                  </div>
                );
              })}
          </>
        )}
      </div>
    </Container>
  );
}
