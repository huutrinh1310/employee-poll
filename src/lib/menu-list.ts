import { HomeIcon, LucideIcon, PlusIcon, SquarePen } from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active: boolean;
};

type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: LucideIcon;
  submenus: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/",
          label: "Home",
          active: pathname === "/",
          icon: HomeIcon,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "Contents",
      menus: [
        {
          href: "/leaderboard",
          label: "LeaderBoard",
          active: pathname === "/leaderboard",
          icon: SquarePen,
          submenus: [],
        },
        {
          href: "/add",
          label: "New Poll",
          active: pathname === "/add",
          icon: PlusIcon,
          submenus: [],
        },
      ],
    },
  ];
}
