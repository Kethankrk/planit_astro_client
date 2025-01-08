type NaveLinkChild = {
  title: string;
  description: string;
  link: string;
};

type NavLinkItem =
  | {
      isDropdown: true;
      title: string;
      link?: undefined;
      children: NaveLinkChild[];
    }
  | {
      isDropdown: false;
      title: string;
      link: string;
      children?: undefined;
    };

export const NavLink: NavLinkItem[] = [
  {
    isDropdown: false,
    title: "Home",
    link: "/",
  },
  {
    isDropdown: true,
    title: "My Events",
    children: [
      {
        title: "Joined Events",
        description: "Event you have participated in.",
        link: "/event/joined",
      },
      {
        title: "Managed Events",
        description: "Event you have managed",
        link: "/event/managed",
      },
    ],
  },
  {
    isDropdown: false,
    title: "Create Events",
    link: "/event/create",
  },
  {
    isDropdown: false,
    title: "Contributor Calls",
    link: "/contributor-calls",
  },
];
