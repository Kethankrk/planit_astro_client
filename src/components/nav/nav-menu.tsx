import * as React from "react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { ProfileDropDown } from "./profile";
import { ModeToggle } from "../ModeToggle";
import { NavLink } from "./nav-link";
import { Menu, X } from "lucide-react";

interface Props {
  currentPath: string;
}

export function NavMenu({ currentPath }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="px-6 py-4 flex items-center justify-between border-b fixed w-full top-0 bg-background/30 backdrop-blur-lg z-20">
      {/* Logo / Brand */}
      <div className="text-lg font-bold">PlanIt</div>

      {/* Desktop Menu */}
      <div className="hidden md:flex gap-6">
        <NavigationMenu>
          <NavigationMenuList>
            {NavLink.map((navItem) =>
              navItem.isDropdown ? (
                <NavigationMenuItem key={navItem.title}>
                  <NavigationMenuTrigger>{navItem.title}</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {navItem.children.map((item) => (
                        <ListItem
                          key={item.title}
                          title={item.title}
                          href={item.link}
                        >
                          {item.description}
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ) : (
                <NavigationMenuItem key={navItem.title}>
                  <a href={navItem.link}>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                      active={navItem.link == currentPath}
                    >
                      {navItem.title}
                    </NavigationMenuLink>
                  </a>
                </NavigationMenuItem>
              )
            )}
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      {/* Right-side icons */}
      <div className="hidden md:flex gap-4 items-center">
        <ModeToggle />
        <ProfileDropDown />
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full h-screen flex flex-col items-center bg-background shadow-md md:hidden">
          <ul className="flex flex-col gap-2 p-4 items-center flex-1">
            {NavLink.map((navItem) =>
              navItem.isDropdown ? (
                <li key={navItem.title} className="group">
                  <span className="font-medium cursor-pointer">
                    {navItem.title}
                  </span>
                  <ul className="hidden group-hover:block mt-2 space-y-2">
                    {navItem.children.map((item) => (
                      <li key={item.title}>
                        <a
                          href={item.link}
                          className="block px-4 py-2 rounded hover:bg-accent"
                        >
                          {item.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
              ) : (
                <li key={navItem.title}>
                  <a
                    href={navItem.link}
                    className="block px-4 py-2 rounded hover:bg-accent"
                  >
                    {navItem.title}
                  </a>
                </li>
              )
            )}
            <li className="flex gap-4 items-end mb-[90px] justify-between w-full mt-4 flex-1">
              <ModeToggle />
              <ProfileDropDown />
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
