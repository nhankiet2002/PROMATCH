import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useWindowSize } from "react-use";
// import { useFindPotentialCandidates } from "@hooks/useProject";
import { getMockCandidates } from "@mocks/candidates.mock";
import usePagination from "@hooks/usePagination";
import CandidateTable from "@components/CandidateTable";
import Pagination from "@ui/Pagination";

const FindCandidate = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { width } = useWindowSize();
  const [threshold, setThreshold] = useState(0.5);

  // TODO: Replace with API call when backend is ready
  // const { data, isLoading, isError, error } = useFindPotentialCandidates(
  //   {
  //     projectId: parseInt(projectId),
  //     threshold,
  //   },
  //   { enabled: !!projectId }
  // );

  // Mock data for development
  const isLoading = false;
  const isError = false;
  const error = null;
  const mockCandidates = getMockCandidates(25, {});
  const filteredCandidates = mockCandidates.filter(
    (candidate) => candidate.matchScore >= threshold
  );

  const candidates = filteredCandidates || [];
  const pagination = usePagination(candidates, 10);

  useEffect(() => {
    if (!projectId) {
      navigate("/own-project");
    }
  }, [projectId, navigate]);

  return (
    <div className="flex flex-col flex-1">
      <div className="flex flex-col gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-2">Tìm ứng viên</h1>
          <p className="text-gray-500">
            Tìm ứng viên cho dự án của bạn ({projectId})
          </p>
        </div>

        {isError && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800">
              Error loading candidates: {error?.message}
            </p>
          </div>
        )}

        <div className="flex flex-col-reverse gap-4 md:flex-row md:justify-between md:items-center md:mb-2">
          <p className="text-gray-600">
            Hiển thị ứng viên:{" "}
            <span className="font-semibold">{pagination.showingOf()}</span>
          </p>
          <div className="flex gap-3">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium">Ngưỡng:</label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={threshold}
                onChange={(e) => setThreshold(parseFloat(e.target.value))}
                className="w-32"
              />
              <span className="text-sm">{threshold.toFixed(1)}</span>
            </div>
            <button
              className="btn btn--secondary"
              onClick={() => navigate("/own-project")}
            >
              Quay lại dự án
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-[22px]">
        {width >= 768 ? (
          <CandidateTable
            data={pagination.currentItems()}
            loading={isLoading}
          />
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">
              Vui lòng xem ứng viên trên máy tính để bàn
            </p>
          </div>
        )}

        {pagination.maxPage > 1 && <Pagination pagination={pagination} />}

        {candidates.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <p className="text-gray-500">Không tìm thấy ứng viên nào</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FindCandidate;
