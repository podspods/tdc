import Link from "next/link";
import { LinkType } from "../common/type";

export type MenuDesktopProps = {
  linkList: LinkType[];
};
export default function MenuDesktop({ ...props }: MenuDesktopProps) {
  return (
    <ul className="hidden md:flex space-x-6 text-lg font-medium bg-red-900">
      {props.linkList.map((link) => (
        <li key={link.name}>
          <Link
            href={link.href}
            className="hover:text-blue-500 transition duration-300"
          >
            {link.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}
