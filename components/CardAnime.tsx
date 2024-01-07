import Link from "next/link";
import { MdFavorite } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { json } from "stream/consumers";
import { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";

export default function CardAnime({
  isLoading,
  data,
}: {
  isLoading: boolean;
  data: any[];
}) {
  const [likes, setLikes] = useState<string[]>([]);

  useEffect(() => {
    const l = localStorage.getItem("likes");

    if (l && l?.length > 0) {
      setLikes([...JSON.parse(l)]);
    }
  }, []);

  const handlerFav = (e: React.MouseEvent<HTMLButtonElement>) => {
    const title = e.currentTarget.dataset.title;

    if (title) {
      if (likes.indexOf(title) >= 0) {
        setLikes((prev) => [...prev.filter((e) => e != title)]);
        localStorage.setItem(
          "likes",
          JSON.stringify([...likes.filter((e) => e != title)])
        );
        return;
      }
      setLikes((prev) => [...prev, title]);
      localStorage.setItem("likes", JSON.stringify([...likes, title]));
    }
  };

  return isLoading ? (
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
            <div key={index} className="rounded relative">
              <button
                onClick={handlerFav}
                data-title={value["Name"]}
                className={`absolute ${
                  likes.indexOf(value["Name"]) >= 0
                    ? "text-pink-400"
                    : "text-white"
                }  right-2 top-2 bg-black p-2 text-xl rounded`}
              >
                <MdFavorite />
              </button>

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
                  <Link href={`/detail/${value["Name"]}`}>{value["Name"]}</Link>
                </h4>
              </div>
              <div className="flex gap-1 mt-1">
                <Button className="rounded-sm w-1/2 text-wrap leading-3">
                  {parseInt(value["Episodes"])} Episodes
                </Button>
                <Button className="rounded-sm w-1/2 text-wrap leading-3">
                  {value["Popularity"]} Popularity
                </Button>
              </div>
            </div>
          );
        })}
    </>
  );
}
