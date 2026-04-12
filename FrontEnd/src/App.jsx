// GA
import ReactGA from "react-ga4";

// utils
import { lazy, Suspense } from "react";

// styles
import "@styles/index.scss";
import "react-toastify/dist/ReactToastify.min.css";
import ThemeStyles from "@styles/theme";

// fonts
import "@fonts/icomoon/icomoon.woff";

// contexts
import { SidebarProvider } from "@contexts/sidebarContext";
import { ThemeProvider } from "styled-components";

// hooks
import { useTheme } from "@contexts/themeContext";
import { useEffect, useRef } from "react";
import { useWindowSize } from "react-use";

// components
import ScrollToTop from "@components/ScrollToTop";
import Loader from "@components/Loader";
import PrivateRoute from "@components/PrivateRoute";
import AdminRoute from "@components/AdminRoute";
import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Sidebar from "@layout/Sidebar";
import AppBar from "@layout/AppBar";

// pages
const Login = lazy(() => import("@pages/Login"));
const Register = lazy(() => import("@pages/Register"));
const Dashboard = lazy(() => import("@pages/Dashboard"));
const UpdateProfile = lazy(() => import("@pages/UpdateProfile"));
const Skills = lazy(() => import("@pages/Skills"));
const OwnProject = lazy(() => import("@pages/OwnProject"));
const FindCandidate = lazy(() => import("@pages/FindCandidate"));
const PageNotFound = lazy(() => import("@pages/PageNotFound"));

// Google Analytics init (once, outside component)
const gaKey = import.meta.env.VITE_GA;
if (gaKey) {
  ReactGA.initialize(gaKey);
}

const App = () => {
  const { width } = useWindowSize();
  const appRef = useRef(null);
  const { theme } = useTheme();
  const path = useLocation().pathname;
  const withSidebar =
    path !== "/login" && path !== "/register" && path !== "/404";

  useEffect(() => {
    appRef.current && appRef.current.scrollTo(0, 0);
  }, []);

  return (
    <SidebarProvider>
      <ThemeProvider theme={{ theme: theme }}>
        <ThemeStyles />
        <ToastContainer
          theme={theme}
          autoClose={2000}
          style={{ padding: "20px" }}
        />
        {width < 1280 && withSidebar && <AppBar />}
        <div className={`app ${!withSidebar ? "fluid" : ""}`} ref={appRef}>
          <ScrollToTop />
          {withSidebar && <Sidebar />}
          <div className="app_content">
            {width >= 1280 && withSidebar && <AppBar />}
            <Suspense fallback={<Loader />}>
              <div className="main">
                <Routes>
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route
                    path="/"
                    element={
                      <PrivateRoute>
                        <Dashboard />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/update-profile"
                    element={
                      <PrivateRoute>
                        <UpdateProfile />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/skills"
                    element={
                      <AdminRoute>
                        <Skills />
                      </AdminRoute>
                    }
                  />
                  <Route
                    path="/own-project"
                    element={
                      <PrivateRoute>
                        <OwnProject />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/find-candidate/:projectId"
                    element={
                      <PrivateRoute>
                        <FindCandidate />
                      </PrivateRoute>
                    }
                  />
                  <Route path="/404" element={<PageNotFound />} />
                  <Route path="*" element={<Navigate to="/404" />} />
                </Routes>
              </div>
              {/* {withSidebar && <Copyright />} */}
            </Suspense>
          </div>
        </div>
      </ThemeProvider>
    </SidebarProvider>
  );
};

export default App;
