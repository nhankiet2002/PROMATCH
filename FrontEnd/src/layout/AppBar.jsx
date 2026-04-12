// components
import Search from "@ui/Search";
import Headroom from "react-headroom";
import NotificationsPanel from "@components/NotificationsPanel";
import MessagesPanel from "@components/MessagesPanel";
import ModalBase from "@ui/ModalBase";

// hooks
import { useTheme } from "@contexts/themeContext";
import { useSidebar } from "@contexts/sidebarContext";
import { useWindowSize } from "react-use";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@store/hooks";
import { requestLogout } from "@store/slices/auth.slice";

const AppBar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [notificationsPanelOpen, setNotificationsPanelOpen] = useState(false);
  const [messagesPanelOpen, setMessagesPanelOpen] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const accountMenuRef = useRef(null);
  const { width } = useWindowSize();
  const { theme, toggleTheme } = useTheme();
  const { setOpen } = useSidebar();

  useEffect(() => {
    setSearchModalOpen(false);
  }, [width]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        accountMenuRef.current &&
        !accountMenuRef.current.contains(event.target)
      ) {
        setAccountMenuOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setAccountMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleNavigateUpdateProfile = () => {
    setAccountMenuOpen(false);
    navigate("/update-profile");
  };

  const handleLogout = () => {
    dispatch(requestLogout());
    setAccountMenuOpen(false);
    navigate("/login");
  };

  return (
    <>
      <Headroom style={{ zIndex: 999 }}>
        <div className="flex items-center justify-between">
          {width < 1920 && (
            <button
              className="icon text-2xl leading-none"
              aria-label="Open sidebar"
              onClick={() => setOpen(true)}
            >
              <i className="icon-bars-solid" />
            </button>
          )}
          {width >= 768 && (
            <Search wrapperClass="flex-1 max-w-[1054px] ml-5 mr-auto 4xl:ml-0" />
          )}
          <div className="flex items-center gap-5 md:ml-5 xl:gap-[26px]">
            {width < 768 && (
              <button
                className="text-[20px] leading-none text-gray dark:text-gray-red xl:text-2xl"
                aria-label="Open search"
                onClick={() => setSearchModalOpen(true)}
              >
                <i className="icon-magnifying-glass-solid" />
              </button>
            )}
            <button
              className="text-2xl leading-none text-gray dark:text-gray-red"
              aria-label="Change theme"
              onClick={toggleTheme}
            >
              <i
                className={`icon-${
                  theme === "light" ? "sun-bright" : "moon"
                }-regular`}
              />
            </button>
            {/* <CustomTooltip title={<LocaleMenu active={locale} setActive={setLocale}/>}>
                            <button className="w-6 h-6 rounded-full overflow-hidden xl:w-8 xl:h-8"
                                    aria-label="Change language">
                                <img src={activeLocale.icon} alt={activeLocale.label}/>
                            </button>
                        </CustomTooltip> */}

            {/* <div className="relative h-fit mt-1.5 xl:self-end xl:mt-0 xl:mr-1.5">
              <button
                className="text-lg leading-none text-gray dark:text-gray-red xl:text-[20px]"
                onClick={() => setMessagesPanelOpen(true)}
                aria-label="Messages"
              >
                <i className="icon-message-solid" />
              </button>
              <span
                className="absolute w-3 h-3 rounded-full bg-green -top-1.5 -right-1.5 border-[2px] border-body
                                  xl:w-6 xl:h-6 xl:-top-5 xl:-right-4 xl:flex xl:items-center xl:justify-center"
              >
                <span className="hidden text-xs font-bold text-white dark:text-[#00193B] xl:block">
                  2
                </span>
              </span>
            </div> */}
            <div className="relative" ref={accountMenuRef}>
              <button
                className="h-8 w-8 rounded-full bg-accent text-widget text-sm flex items-center
                                    justify-center relative xl:w-11 xl:h-11 xl:text-lg"
                onClick={() => setAccountMenuOpen((prevState) => !prevState)}
                aria-label="Account menu"
                aria-haspopup="true"
                aria-expanded={accountMenuOpen}
              >
                <i className="icon-user-solid" />
              </button>
              <span className="badge-online" />
              {accountMenuOpen && (
                <div
                  className="absolute right-0 top-full mt-2 min-w-[180px] rounded-2xl border border-border bg-widget shadow-card overflow-hidden z-10"
                  role="menu"
                >
                  <button
                    className="w-full text-left px-4 py-2.5 text-sm hover:bg-body focus-visible:bg-body focus:outline-none transition"
                    onClick={handleNavigateUpdateProfile}
                    role="menuitem"
                  >
                    Update profile
                  </button>
                  <button
                    className="w-full text-left px-4 py-2.5 text-sm text-red hover:bg-body focus-visible:bg-body focus:outline-none transition"
                    onClick={handleLogout}
                    role="menuitem"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </Headroom>
      {width < 768 && (
        <ModalBase
          open={searchModalOpen}
          onClose={() => setSearchModalOpen(false)}
        >
          <div className="card max-w-[360px] w-full">
            <h3 className="mb-3">Search</h3>
            <Search placeholder="What are you looking for?" />
          </div>
        </ModalBase>
      )}
      <NotificationsPanel
        open={notificationsPanelOpen}
        onOpen={() => setNotificationsPanelOpen(true)}
        onClose={() => setNotificationsPanelOpen(false)}
      />
      <MessagesPanel
        open={messagesPanelOpen}
        onOpen={() => setMessagesPanelOpen(true)}
        onClose={() => setMessagesPanelOpen(false)}
      />
    </>
  );
};

export default AppBar;
