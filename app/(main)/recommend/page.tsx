"use client";

import Container from "@/components/Container";
import { Separator } from "@/components/ui/separator";
import { Button } from "flowbite-react";
import { Poppins } from "next/font/google";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useInView } from "react-intersection-observer";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import TopAnime from "@/components/TopAnime";
import { LoadingContext } from "@/context/loading";
import CardAnime from "@/components/CardAnime";
import ContentNav from "@/components/ContentNav";
const poppins = Poppins({ subsets: ["latin"], weight: ["300", "400", "500"] });

// type Anime = {
//   data: any[];
// };

export default function RecommendPage() {
  const [data, setData] = useState<any[]>([]);
  // const [isLoading, setIsLoading] = useState<boolean>(true);
  const { setIsLoading, isLoading } = useContext(LoadingContext);
  const searchParams = useSearchParams();

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const get = await axios.get(
          `${
            process.env.NEXT_PUBLIC_BACKEND
          }/api/recommend?s=${searchParams?.get("s")}`
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
          <ContentNav />

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4    gap-3 mt-10">
            <CardAnime isLoading={isLoading} data={data} />
          </div>
        </article>

        <TopAnime />
      </Container>
    </div>
  );
}
