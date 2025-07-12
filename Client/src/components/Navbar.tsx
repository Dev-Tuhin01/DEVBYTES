import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuLink,
} from "@radix-ui/react-navigation-menu";
import { CircleUserIcon, SquareCode, MenuIcon, XIcon } from "lucide-react";
import { useState } from "react";

interface NavItem {
  title:
    | "Technology"
    | "Movies"
    | "Games"
    | "Book"
    | "Culture"
    | "Mythology"
    | "History"
    | "Home";
}

const navItems: NavItem[] = [
  { title: "Home" },
  { title: "Technology" },
  { title: "Movies" },
  { title: "Games" },
  { title: "Book" },
  { title: "Culture" },
  { title: "Mythology" },
  { title: "History" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative w-full bg-accent border-b border-black">
      {/* User Icon (top-right always) */}
      <div className="absolute top-4 right-4">
        <CircleUserIcon className="h-8 md:h-20 w-8 md:w-20 cursor-pointer" />
      </div>

      {/* Top Row: Hamburger + Title */}
      <div className="w-full flex ite ms-center justify-between px-4 py-4 md:justify-center">
        {/* Hamburger (left, mobile only) */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen((prev) => !prev)}>
            {isOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>

        {/* Title & Logo */}
        <div className="flex items-center gap-2 font-bold text-3xl justify-center w-full md:w-auto">
          DevBytes <SquareCode className="h-8 w-8 text-accent-foreground" />
        </div>

        {/* Spacer to balance hamburger/user icon gap */}
        <div className="w-6 md:hidden" />
      </div>

      {/* Navigation menu (animated for mobile, always shown on desktop) */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        } md:max-h-none md:opacity-100`}
      >
        <NavigationMenu>
          <NavigationMenuList className="flex flex-col md:flex-row items-center justify-center gap-4 py-2">
            {navItems.map((navItem, index) => (
              <NavigationMenuItem key={index}>
                <NavigationMenuLink
                  className="font-bold text-base md:text-lg cursor-pointer hover:text-muted-foreground transition-colors"
                  onClick={() => {
                    console.log("Navigate to:", navItem.title.toLowerCase());
                    setIsOpen(false); // close menu on mobile
                  }}
                >
                  {navItem.title}
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  );
};

export default Navbar;
