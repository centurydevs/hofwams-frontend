import Image from "next/image";
import Link from "next/link";

export const Logo = () => {
  return (
    <Link href="/" className="flex items-center space-x-2">
      <Image
        src="/hofwams-logo.png"
        alt="Hofwams Logo"
        width={40}
        height={40}
      />
      <span className="text-green-700 dark:text-green-500 text-xl font-bold">
        Hofwams
      </span>
    </Link>
  );
};
