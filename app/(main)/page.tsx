"use client";

import Container from "@/components/Container";
import { Separator } from "@/components/ui/separator";
import { Button } from "flowbite-react";
import { Poppins } from "next/font/google";
import axios from "axios";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import TopAnime from "@/components/TopAnime";
const poppins = Poppins({ subsets: ["latin"], weight: ["300", "400", "500"] });

// type Anime = {
//   data: any[];
// };

export default function MainPage() {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // const [isLoadMore, setIsLoadMore] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);

  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const get = await axios.get(`http://127.0.0.1:5000/api?page=${page}`);
        const anime = get.data;
        setData((prev) => [...prev, ...anime.data]);
      } catch (e) {
        console.log(e);
      }
      setIsLoading(false);
    };

    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const get = await axios.get(`http://127.0.0.1:5000/api?page=${page}`);
        const anime = get.data;
        setData((prev) => [...prev, ...anime.data]);
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();
  }, [page]);

  useEffect(() => {
    if (inView) {
      setPage((page) => page + 1);
    }
  }, [inView]);

  const handlerLoadMore = () => {
    setPage((page) => page + 1);
  };

  return (
    <div className={`${poppins.className}`}>
      <section className="w-full">
        <img
          src="/assets/wp1965845-konosuba-wallpapers.png"
          className="w-full object-cover h-[400px]"
        />
      </section>
      {/* <div>
        <iframe src="https://animeku.org/player.php?id=eyJjdCI6ImZKT0xhXC9UVWdQXC8rMSt6d0RkdHBCbUJEWTZ2RGFmaThYNTBZYnpwK0RHZGVoQ3NNWEEzK1hTUUFaRUorV3RFWHMxRXU2d01MMU53bnNQc0lzZ2M2TFN3eE9BZWVqYWNzNVVGdkZGSDl1YU1uTDZ6QUxpakR5WUxnQnE0SzZqZ2dDQXF4RkpoSlpQM2xQXC8yeFpFWE0rYUU1cEI2YzMyWXdiMDRQcE52dk5WMHNmRXJkNnk3ZjZOU09XSWJRcmUzUkFyeUhPVnZCZkhmcXpEMVkxUE1VMXI0dnpDZHA3Q2I0Nk83NmtnVzBDNDlEaElucFBseWgrU1wvVzMwa2NWQlFpa1wvaGkwbnJMU3M0SldoU2R5eGp1RFdUdThQWWRiNVlBbXUyQ2lYb21kZHZSYllwTVVOWFlrNUkxaUNMdlNTZzdaY3VZRVlJTWdIVkc1bEFjQStcLzNvUT09IiwiaXYiOiJkZGQ5ZmY0NWRlMTE2ZWNkMmYzYjFmMDNmMTBkMTYxMCIsInMiOiIwMjk5ZDMxODI0OTY1NWU4In0="></iframe>
      </div> */}

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
                {data &&
                  data.map((value, index) => {
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
                          <h4 className="text-[#352F44]">
                            <Link href={`/detail/${value["Name"]}`}>
                              {value["Name"]}
                            </Link>
                          </h4>
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
            <div className="hidden md:block" ref={ref}>
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
          </div>
        </article>
        <div className="mt-5 justify-center   md:hidden flex w-full ">
          <Button
            onClick={handlerLoadMore}
            disabled={isLoading ? true : false}
            className="rounded-sm"
          >
            {isLoading ? "Loading..." : "Load More"}
          </Button>
        </div>
        <TopAnime />
      </Container>
    </div>
  );
}
