const ROUTES = [
  {
    name: "Dashboard",
    icon: "rectangle-history-circle-user-regular",
    path: "/",
    isAdmin: true,
    isUser: true,
  },
  {
    name: "Skills",
    icon: "lightning-solid",
    path: "/skills",
    isAdmin: true,
    isUser: false,
  },
  {
    name: "Projects",
    icon: "folder-regular",
    path: "/own-project",
    isAdmin: false,
    isUser: true,
  },
];

export default ROUTES;
