import { useState, useEffect } from "react";
import { useWindowSize } from "react-use";
import { useGetOwnProjectList } from "@hooks/useProject";
import usePagination from "@hooks/usePagination";
import ProjectTable from "@components/ProjectTable";
import CreateProjectDrawer from "@components/CreateProjectDrawer";
import Pagination from "@ui/Pagination";

const OwnProject = () => {
  const { width } = useWindowSize();
  const { data, isLoading, isError, error, refetch } = useGetOwnProjectList();
  const [activeCollapse, setActiveCollapse] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const projects = data?.data || [];
  const pagination = usePagination(projects, 8);

  // reset active collapse when page or window width changes
  useEffect(() => {
    setActiveCollapse("");
  }, [pagination.currentPage, width]);

  return (
    <div className="flex flex-col flex-1">
      <div className="flex flex-col gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-2">Dự án của tôi</h1>
          <p className="text-gray-500">Xem và quản lý các dự án</p>
        </div>

        {isError && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800">
              Error loading projects: {error?.message}
            </p>
          </div>
        )}

        <div className="flex flex-col-reverse gap-4 md:flex-row md:justify-between md:items-center md:mb-2">
          <p className="text-gray-600">
            Dự án:{" "}
            <span className="font-semibold">{pagination.showingOf()}</span>
          </p>
          <div className="flex gap-3">
            <button
              className="btn btn--primary"
              onClick={() => setDrawerOpen(true)}
            >
              Tạo dự án
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-[22px]">
        {width >= 768 ? (
          <>
            <ProjectTable
              data={pagination.currentItems()}
              loading={isLoading}
            />
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">
              Vui lòng xem dự án trên máy tính để bàn
            </p>
          </div>
        )}

        {pagination.maxPage > 1 && <Pagination pagination={pagination} />}

        {projects.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <p className="text-gray-500">Không tìm thấy dự án nào</p>
          </div>
        )}
      </div>

      <CreateProjectDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onSuccess={refetch}
      />
    </div>
  );
};

export default OwnProject;
