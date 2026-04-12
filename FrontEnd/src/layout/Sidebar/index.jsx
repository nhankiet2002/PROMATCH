// styled components
import Drawer from "./styles";

// components
import Logo from "@components/Logo";
import { NavLink } from "react-router-dom";
import Collapse from "@mui/material/Collapse";
import { Fragment } from "react";

// hooks
import { useSidebar } from "@contexts/sidebarContext";
import { useState, useEffect } from "react";
import { useWindowSize } from "react-use";

// constants
import ROUTES from "@constants/routes";
import { useAppSelector } from "@store/hooks";
import { authState } from "@store/slices/auth.slice";

const Sidebar = () => {
  const { width } = useWindowSize();
  const { open, setOpen } = useSidebar();
  const [active, setActive] = useState("Dashboard");
  const { authData } = useAppSelector(authState);
  const isPermanent = width >= 1920;

  useEffect(() => {
    const handleResize = () => setActive("");
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isAdmin = authData?.role?.includes("ROLE_ADMIN");

  return (
    <Drawer
      id="appMenu"
      anchor="left"
      transitionDuration={350}
      open={open}
      variant={isPermanent ? "permanent" : "temporary"}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
    >
      <Logo />
      <nav className="menu">
        {ROUTES.map((route, index) => {
          // Skip the "Skills" route if the user is not an admin
          if (route.isAdmin && !route.isUser && !isAdmin) {
            return null;
          }
          if (route.isUser && !route.isAdmin && isAdmin) {
            return null;
          }

          return (
            <Fragment key={route.name}>
              {route.links && (
                <>
                  <div>
                    <div
                      className={`menu_item ${
                        active === route.name ? "active" : ""
                      }`}
                      onClick={() =>
                        setActive(active === route.name ? "" : route.name)
                      }
                    >
                      <div className="flex items-center gap-2.5">
                        <i className={`icon icon-${route.icon}`} />
                        <span className="text">{route.name}</span>
                      </div>
                      <button
                        className="xl:hidden 4xl:block"
                        aria-label="Toggle submenu"
                      >
                        <i className="icon icon-caret-right-solid" />
                      </button>
                    </div>
                    <Collapse
                      in={active === route.name}
                      timeout="auto"
                      unmountOnExit
                    >
                      <div className="submenu flex flex-col gap-2.5">
                        {route.links.map((link) => {
                          return (
                            <NavLink
                              className="submenu_item menu_item"
                              to={link.path}
                              key={link.name}
                            >
                              <span className="flex items-center gap-2.5">
                                <i className="icon icon-circle-solid" />
                                <span>{link.name}</span>
                              </span>
                            </NavLink>
                          );
                        })}
                      </div>
                    </Collapse>
                  </div>
                  {index === ROUTES.length - 2 && (
                    <span className="menu_divider" />
                  )}
                </>
              )}
              {!route.links && (
                <>
                  <NavLink className="menu_item" to={route.path}>
                    <div className="flex items-center gap-2.5">
                      <i className={`icon icon-${route.icon}`} />
                      <span className="text">{route.name}</span>
                    </div>
                    {route.qty && (
                      <span className="badge rounded bg-green xl:hidden">
                        {route.qty}
                      </span>
                    )}
                  </NavLink>
                  {index === ROUTES.length - 2 && (
                    <span className="menu_divider" />
                  )}
                </>
              )}
            </Fragment>
          );
        })}
      </nav>
    </Drawer>
  );
};

export default Sidebar;
