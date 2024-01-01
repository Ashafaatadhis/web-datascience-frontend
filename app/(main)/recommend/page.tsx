"use client";

import Container from "@/components/Container";
import { Separator } from "@/components/ui/separator";
import { Button } from "flowbite-react";
import { Poppins } from "next/font/google";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useInView } from "react-intersection-observer";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import TopAnime from "@/components/TopAnime";
const poppins = Poppins({ subsets: ["latin"], weight: ["300", "400", "500"] });

// type Anime = {
//   data: any[];
// };

export default function RecommendPage() {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const searchParams = useSearchParams();

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const get = await axios.get(
          `http://localhost:5000/api/recommend?s=${searchParams?.get("s")}`
        );
        const anime = get.data;
        setData(anime.data);
      } catch (e) {
        console.log(e);
      }

      setIsLoading(false);
    };

    fetchData();
    console.log(data);
  }, [searchParams]);

  return (
    <div className={`${poppins.className}`}>
      <section className="w-full">
        <img
          src="/assets/wp1965845-konosuba-wallpapers.png"
          className="w-full object-cover h-[400px]"
        />
      </section>

      <Container className="mx-auto gap-8 mt-[60px] block md:flex px-4">
        <article className="w-full md:w-3/4">
          <div className="text-[#5C5470]  flex h-5 items-center space-x-4">
            <div className="">
              <Link href={"/"}>All</Link>
            </div>
            <Separator orientation="vertical" className="" />
            <div>
              <Link href={"/recommend"}>Recommendation</Link>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4    gap-3 mt-10">
            {isLoading ? (
              <div className="">
                <Skeleton className="w-full h-[250px]" />
                <div className="space-y-2 mt-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                </div>
                <div className="flex gap-1 mt-1">
                  <Skeleton className="h-14 w-full" />
                  <Skeleton className="h-14 w-full" />
                </div>
              </div>
            ) : (
              <>
                {data.map((value, index) => {
                  return (
                    <div key={index} className="rounded">
                      <img
                        src={value["Image URL"]}
                        className="rounded w-full h-[250px] object-cover"
                        alt=""
                      />
                      <div className="mt-1">
                        <div>
                          <span className="text-[#5C5470]  text-sm">
                            {value["Genres"]}
                          </span>
                        </div>
                        <h4 className="text-[#352F44]">{value["Name"]}</h4>
                      </div>
                      <div className="flex gap-1 mt-1">
                        <Button className="rounded-sm w-1/2">
                          {parseInt(value["Episodes"])} Episodes
                        </Button>
                        <Button className="rounded-sm w-1/2">
                          {value["Popularity"]} Popularity
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </article>

        <TopAnime />
      </Container>
    </div>
  );
}
