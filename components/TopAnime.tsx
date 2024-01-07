import axios from "axios";
import { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";
import Link from "next/link";

export default function TopAnime() {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const get = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND}/api/top`
        );
        const anime = get.data;
        setData(anime.data);
        console.log(anime.data);
      } catch (e) {
        console.log(e);
      }
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return (
    <aside className="w-full mt-10 md:mt-0 md:w-1/4">
      <h2>Top Anime</h2>
      {isLoading ? (
        <div className="flex items-center gap-3 mt-10">
          <Skeleton className="rounded-sm h-7 w-7" />
          <div className="flex gap-3">
            <Skeleton className="rounded-sm w-[60px] h-[80px]" />
            <div className=" text-[#352F44]">
              <Skeleton className="w-[120px] h-6" />
              <Skeleton className="w-[120px] h-10 mt-1" />
            </div>
          </div>
        </div>
      ) : (
        <>
          {data &&
            data.map((values, index) => {
              return (
                <div key={index} className="flex items-center gap-3 mt-10">
                  <button className="rounded-sm px-3 py-1 flex items-center justify-center border w-fit h-fit text-sm">
                    {index + 1}
                  </button>
                  <div className="flex gap-3">
                    <img
                      src={values["Image URL"]}
                      className="rounded-sm w-[60px] h-[80px] object-cover"
                      alt=""
                    />
                    <div className="text-[13px] text-[#352F44]">
                      <h4 className="leading-4">
                        <Link href={`/detail/${values["Name"]}`}>
                          {values["Name"]}
                        </Link>
                      </h4>
                      <h5 className="leading-4 mt-1">
                        <span className="text-[#5C5470]">Genres:</span>{" "}
                        {values["Genres"]}
                      </h5>
                    </div>
                  </div>
                </div>
              );
            })}
        </>
      )}
    </aside>
  );
}
