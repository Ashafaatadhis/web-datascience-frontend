import Container from "@/components/Container";
import axios from "axios";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Detail() {
  const router = useRouter();

  useEffect(() => {
    if (!router.query.name) {
      return;
    }
    const fetchData = async () => {
      try {
        console.log(decodeURIComponent(router.query.name as string));

        const get = await axios.get(
          `http://localhost:5000/api/anime?s=${router.query.name}`
        );
        const anime = get.data;
        console.log(anime);
        //   setData((prev) => [...prev, ...anime.data]);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, [router.query.name]);
  return (
    <Container className="mx-auto mt-[60px] block md:flex px-4">
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veniam eaque
      aliquid error itaque voluptate, laboriosam, in amet architecto voluptates,
      quo maxime a debitis? Fugiat necessitatibus dolore quis quod enim neque.
    </Container>
  );
}
