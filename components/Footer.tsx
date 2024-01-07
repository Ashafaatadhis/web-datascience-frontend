import { Poppins } from "next/font/google";

import { FaInstagram, FaFacebook, FaLinkedin } from "react-icons/fa";

const poppins = Poppins({ subsets: ["latin"], weight: ["300", "400", "500"] });

export default function Footer() {
  return (
    <footer
      className={`${[
        poppins.className,
      ]} flex py-8 mt-14 justify-center flex-col gap-4 border-t items-center`}
    >
      <div className="flex gap-5">
        <div className="rounded-full border p-2 text-lg">
          <a target="_blank" href={"https://www.instagram.com/ashafaatadhis/"}>
            <FaInstagram />
          </a>
        </div>
        <div className="rounded-full border p-2 text-lg">
          <a href="https://www.facebook.com/despacito.buruten" target="_blank">
            <FaFacebook />
          </a>
        </div>
        <div className="rounded-full border p-2 text-lg">
          <a
            target="_blank"
            href="https://www.linkedin.com/in/adhis-mauliyahsa-ashafaat-2446781bb/"
          >
            <FaLinkedin />
          </a>
        </div>
      </div>
      <div className="text-sm">
        Kurookami kun &copy; {new Date().getFullYear()}
      </div>
    </footer>
  );
}
