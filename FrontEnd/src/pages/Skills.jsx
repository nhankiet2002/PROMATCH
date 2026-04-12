import { useState, useEffect } from "react";
import { useWindowSize } from "react-use";
import { useGetSkillSet } from "@hooks/useSkills";
import usePagination from "@hooks/usePagination";
import SkillTable from "@components/SkillTable";
import SkillCollapseItem from "@components/SkillCollapseItem";
import EditSkillsDrawer from "@components/EditSkillsDrawer";
import Pagination from "@ui/Pagination";

const Skills = () => {
  const { width } = useWindowSize();
  const { data, isLoading, isError, error, refetch } = useGetSkillSet();
  const [activeCollapse, setActiveCollapse] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editingSkills, setEditingSkills] = useState([]);

  const skills = data?.data || [];
  const pagination = usePagination(skills, 8);

  // reset active collapse when page or window width changes
  useEffect(() => {
    setActiveCollapse("");
  }, [pagination.currentPage, width]);

  const handleCollapse = (id) => {
    if (activeCollapse === id) {
      setActiveCollapse("");
    } else {
      setActiveCollapse(id);
    }
  };

  const handleDrawerSuccess = () => {
    refetch();
  };

  const handleAddSkills = () => {
    setEditingSkills([]);
    setDrawerOpen(true);
  };

  const handleEditSkills = (skill) => {
    setEditingSkills([skill]);
    setDrawerOpen(true);
  };

  return (
    <div className="flex flex-col flex-1">
      <div className="flex flex-col gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-2">Kĩ năng</h1>
          <p className="text-gray-500">
            Quản lý tập kĩ năng và trình độ chuyên môn của bạn
          </p>
        </div>

        {isError && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800">
              Lỗi khi tải kĩ năng: {error?.message}
            </p>
          </div>
        )}

        <div className="flex flex-col-reverse gap-4 md:flex-row md:justify-between md:items-center md:mb-2">
          <p className="text-gray-600">
            Danh sách kĩ năng:{" "}
            <span className="font-semibold">{pagination.showingOf()}</span>
          </p>
          <div className="flex gap-3">
            <button className="btn btn--primary" onClick={handleAddSkills}>
              Thêm kĩ năng
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-[22px]">
        {width >= 768 ? (
          <>
            <SkillTable
              data={pagination.currentItems()}
              loading={isLoading}
              onRefresh={refetch}
              onEdit={handleEditSkills}
            />
          </>
        ) : (
          <div className="flex flex-col gap-3">
            {pagination.currentItems().map((skill) => (
              <SkillCollapseItem
                key={`skill-${skill.id}`}
                skill={skill}
                isActive={activeCollapse === skill.id}
                onToggle={handleCollapse}
                onRefresh={refetch}
              />
            ))}
          </div>
        )}

        {pagination.maxPage > 1 && <Pagination pagination={pagination} />}

        {skills.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <p className="text-gray-500">No skills found</p>
          </div>
        )}
      </div>

      <EditSkillsDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        skills={editingSkills}
        onSuccess={handleDrawerSuccess}
      />
    </div>
  );
};

export default Skills;
