import * as React from "react";

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

interface Props {
  currentPath: string;
}

export function NavMenu({ currentPath }: Props) {
  return (
    <nav className="px-10 py-4 flex justify-center border-b fixed w-full top-0 bg-background/30 backdrop-blur-lg z-20">
      <NavigationMenu>
        <NavigationMenuList>
          {NavLink.map((navItem) =>
            navItem.isDropdown ? (
              <NavigationMenuItem>
                <NavigationMenuTrigger>{navItem.title}</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                    {navItem.children.map((item) => (
                      <ListItem title={item.title} href={item.link}>
                        {item.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            ) : (
              <NavigationMenuItem>
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
      <div className="absolute right-20 flex gap-4 items-center">
        <ModeToggle />
        <ProfileDropDown />
      </div>
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
