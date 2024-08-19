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
          href: "/leader-board",
          label: "LeaderBoard",
          active: pathname === "/leader-board",
          icon: SquarePen,
          submenus: [],
        },
        {
          href: "/new",
          label: "New",
          active: pathname === "/new",
          icon: PlusIcon,
          submenus: [],
        },
      ],
    },
  ];
}
