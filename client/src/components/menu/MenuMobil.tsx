import Link from "next/link";
import { LinkType } from "../common/type";

export type MenuMobilProps = {
  linkList: LinkType[];
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
};
export default function MenuMobil({ ...props }: MenuMobilProps) {
  return (
    <div
      className={`fixed top-0 right-0 w-64 h-full bg-white shadow-lg flex flex-col p-5 z-40 transition-transform duration-300 ${
        props.isOpen ? "translate-x-0" : "translate-x-full"
      } md:hidden`}
    >
      <button
        onClick={() => props.setIsOpen(false)}
        className="self-end p-2 text-gray-800"
      >
        ✖
      </button>

      <ul className="flex flex-col space-y-4 mt-5">
        {props.linkList.map((link) => (
          <li key={link.name}>
            <Link
              href={link.href}
              className="block text-xl font-medium hover:text-blue-500 transition duration-300"
              onClick={() => props.setIsOpen(false)}
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
