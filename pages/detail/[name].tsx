import Container from "@/components/Container";
import axios from "axios";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { Poppins } from "next/font/google";

const poppins = Poppins({ subsets: ["latin"], weight: ["300", "400", "500"] });

export default function Detail({
  data,
}: {
  data: { data: any; success: boolean };
}) {
  return (
    <Container className={`${poppins.className} mx-auto mt-[30px] px-4`}>
      <div>
        <img className="mx-auto" src={data.data["Image URL"]} alt="" />
        <h3 className="text-center mt-4 text-xl">{data.data["Name"]}</h3>
      </div>
      <div className="grid grid-cols-2 mt-4 gap-3">
        <h3 className="bg-sky-100 p-1 font-light">
          <span className="font-medium">Japanese:</span>{" "}
          {data.data["Other name"]}
        </h3>
        <h3 className="bg-sky-100 p-1 font-light">
          <span className="font-medium">Aired:</span> {data.data["Aired"]}
        </h3>
        <h3 className="bg-sky-100 p-1 font-light">
          <span className="font-medium">Duration:</span> {data.data["Duration"]}
        </h3>
        <h3 className="bg-sky-100 p-1 font-light">
          <span className="font-medium">English:</span>{" "}
          {data.data["English name"]}
        </h3>
        <h3 className="bg-sky-100 p-1 font-light">
          <span className="font-medium">Favorites:</span>{" "}
          {data.data["Favorites"]}
        </h3>
        <h3 className="bg-sky-100 p-1 font-light">
          <span className="font-medium">Genres:</span> {data.data["Genres"]}
        </h3>
        <h3 className="bg-sky-100 p-1 font-light">
          <span className="font-medium">Licensors:</span>{" "}
          {data.data["Licensors"]}
        </h3>
        <h3 className="bg-sky-100 p-1 font-light">
          <span className="font-medium">Members:</span> {data.data["Members"]}
        </h3>
        <h3 className="bg-sky-100 p-1 font-light">
          <span className="font-medium">Popularity:</span>{" "}
          {data.data["Popularity"]}
        </h3>
        <h3 className="bg-sky-100 p-1 font-light">
          <span className="font-medium">Premiered:</span>{" "}
          {data.data["Premiered"]}
        </h3>
        <h3 className="bg-sky-100 p-1 font-light">
          <span className="font-medium">Producers:</span>{" "}
          {data.data["Producers"]}
        </h3>
        <h3 className="bg-sky-100 p-1 font-light">
          <span className="font-medium">Rank:</span> {data.data["Rank"]}
        </h3>
        <h3 className="bg-sky-100 p-1 font-light">
          <span className="font-medium">Rating:</span> {data.data["Rating"]}
        </h3>
        <h3 className="bg-sky-100 p-1 font-light">
          <span className="font-medium">Score:</span> {data.data["Score"]}
        </h3>
        <h3 className="bg-sky-100 p-1 font-light">
          <span className="font-medium">Scored By:</span>{" "}
          {data.data["Scored By"]}
        </h3>
        <h3 className="bg-sky-100 p-1 font-light">
          <span className="font-medium">Source:</span> {data.data["Source"]}
        </h3>
        <h3 className="bg-sky-100 p-1 font-light">
          <span className="font-medium">Status:</span> {data.data["Status"]}
        </h3>
        <h3 className="bg-sky-100 p-1 font-light">
          <span className="font-medium">Studios:</span> {data.data["Studios"]}
        </h3>
        <h3 className="bg-sky-100 p-1 font-light">
          <span className="font-medium">Type:</span> {data.data["Type"]}
        </h3>
      </div>
      <div className="mt-4">
        <p className="font-light">
          <span className="font-semibold">{data.data["Name"]}</span>{" "}
          {data.data["Synopsis"]}
        </p>
      </div>
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps<object> = async (
  context
) => {
  // Fetch data from external API
  const data = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND}/api/get/${context.query.name}`
  );

  // Pass data to the page via props
  return { props: { data: data.data } };
};
