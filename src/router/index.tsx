import { lazy, Suspense, useMemo } from "react";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import { RoutePaths } from "./routes-constants";
import MainLayout from "@/layouts/MainLayout";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const HomePage = lazy(() => import("@/pages/Home/Home"));
const DetailPage = lazy(() => import("@/pages/Detail/Detail"));
const SearchPage = lazy(() => import("@/pages/Search/Search"));
const NotFoundPage = lazy(() => import("@/pages/NotFound/NotFound"));

const AppRoutes = () => {
  const routes = useMemo(
    () =>
      createBrowserRouter(
        createRoutesFromElements(
          <>
            <Route element={<MainLayout />}>
              <Route index path={RoutePaths.HOME} element={<HomePage />} />
              <Route index path={RoutePaths.SEARCH} element={<SearchPage />} />
              <Route
                path={RoutePaths.MOVIE_DETAIL()}
                element={<DetailPage />}
              />

              {/* 404 */}
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </>
        )
      ),
    []
  );

  return (
    <Suspense
      fallback={
        <div>
          <header >
            <Skeleton width={150} height={40} />
            <Skeleton width={200} height={30} />
            <Skeleton width={100} height={30} />
          </header>
          <main >
            <Skeleton height={400} width="100%" />
            <div >
              {[...Array(6)].map((_, index) => (
                <Skeleton key={index} height={300} width={200} />
              ))}
            </div>
          </main>
          <footer >
            <Skeleton width={100} height={20} />
          </footer>
        </div>
      }
    >
      <RouterProvider router={routes} />
    </Suspense>
  );
};

export default AppRoutes;
export { RoutePaths };
