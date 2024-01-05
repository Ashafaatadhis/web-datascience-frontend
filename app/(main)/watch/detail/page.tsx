"use client";
import Container from "@/components/Container";
import axios from "axios";
import { useEffect, useLayoutEffect, useState } from "react";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { Poppins } from "next/font/google";
import { useSearchParams } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

const poppins = Poppins({ subsets: ["latin"], weight: ["300", "400", "500"] });

export default function WatchDetail() {
  const searchParams = useSearchParams();
  const [data, setData] = useState<string[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingStream, setIsLoadingStream] = useState<boolean>(false);
  const [stream, setStream] = useState<string>();
  const [play, setPlay] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const get = await axios.get(
          `http://localhost:5000/api/anime/detail?s=${searchParams?.get("s")}`
        );
        const anime = get.data;
        setData(anime.data);
        console.log("WOIII", anime);
      } catch (e) {
        console.log(e);
      }
      setIsLoading(false);
    };

    fetchData();
    console.log(data);
  }, [searchParams]);

  const handlerEps = async (e: React.MouseEvent<HTMLDivElement>) => {
    const link = e.currentTarget.dataset.link;
    console.log(link);
    setPlay(true);
    setIsLoadingStream(true);
    try {
      const data = await axios.get(
        `http://localhost:5000/api/anime/stream?s=${link}`
      );
      setStream(data.data.data);
    } catch (err) {
      console.log(err);
    }
    setIsLoadingStream(false);
  };

  return (
    <Container className={`${poppins.className} mx-auto mt-[30px] px-4`}>
      {play &&
        (isLoadingStream ? (
          <Skeleton className="w-full mb-6 pt-[56.25%]" />
        ) : (
          <div className="relative pt-[56.25%] w-full overflow-hidden mb-6">
            <iframe
              src={stream}
              loading="lazy"
              className=" absolute inset-0 "
              allowFullScreen
              width={"100%"}
              height={"100%"}
            ></iframe>
          </div>
        ))}

      {isLoading ? (
        <Skeleton className="w-full h-72" />
      ) : (
        <ScrollArea className="h-72   rounded-md border">
          <div className="p-4">
            <h4 className="mb-4 text-sm font-medium leading-none">Episodes</h4>
            {data &&
              data.map((value, index) => (
                <div key={index}>
                  <div
                    onClick={handlerEps}
                    data-link={value}
                    className="text-sm cursor-pointer"
                  >
                    Episode {index + 1}
                  </div>
                  <Separator className="my-2" />
                </div>
              ))}
          </div>
        </ScrollArea>
      )}
    </Container>
  );
}
