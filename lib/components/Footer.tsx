import Image from "next/image";
import { useThemeStore } from "@/lib/store/themeStore";
import { fbLogo, githubLogo, sdslabsLogo, sdslabsLogoDark, twitterLogo } from "../constants/images";

const Footer = () => {
  const isDarkTheme = useThemeStore((state) => state.isDarkTheme);

  return (
<footer className="flex justify-between items-center px-[20%] h-[12.75rem] bg-gray-100 dark:bg-gray-900 relative w-full">
{/* Left Section */}
      <div className="flex flex-col justify-center">
        <p className="text-black dark:text-white font-extrabold text-2xl mb-0">
          playCTF
        </p>
        <div className="flex items-center">
          <p className="font-semibold text-sm leading-8 text-gray-700 dark:text-gray-300">
            Wondering how to host a CTF using playCTF?
          </p>
          <a
            href="https://chat.sdslabs.co/"
            className="font-bold text-lg text-purple-600 ml-2"
          >
            Reach us
          </a>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex flex-col justify-center">
        <a href="https://sdslabs.co">
          <Image
            src={isDarkTheme ?  sdslabsLogo: sdslabsLogoDark}
            alt="SDSLabs Logo"
            width={100}
            height={50}
          />
        </a>
        <div className="flex justify-between mt-4">
          <a href="https://www.facebook.com/SDSLabs">
            <Image src={fbLogo} alt="Facebook" width={30} height={30} />
          </a>
          <a href="https://twitter.com/sdslabs">
            <Image src={twitterLogo} alt="Twitter" width={30} height={30} />
          </a>
          <a href="https://github.com/sdslabs/">
            <Image src={githubLogo} alt="GitHub" width={30} height={30} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
