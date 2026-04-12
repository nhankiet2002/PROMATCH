import StyledSkillTable from "@widgets/SkillManagementTable/styles";

const CandidateTable = ({ data = [], loading = false }) => {
  const columns = [
    {
      title: "Tên ứng viên",
      dataIndex: "fullName",
      key: "fullName",
      sorter: (a, b) => a.fullName?.localeCompare(b.fullName || ""),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Kĩ năng",
      dataIndex: "skills",
      key: "skills",
      render: (skills) => (
        <div className="flex flex-wrap gap-1">
          {Array.isArray(skills) && skills.length > 0 ? (
            skills.slice(0, 3).map((skill, idx) => (
              <span
                key={idx}
                className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs"
              >
                {skill}
              </span>
            ))
          ) : (
            <span className="text-gray-400">No skills</span>
          )}
          {Array.isArray(skills) && skills.length > 3 && (
            <span className="text-gray-500 text-xs">
              +{skills.length - 3} more
            </span>
          )}
        </div>
      ),
    },
    {
      title: "Điểm phù hợp",
      dataIndex: "matchScore",
      key: "matchScore",
      width: 120,
      render: (score) => {
        const percentage = (score * 100).toFixed(0);
        const color = score >= 0.8 ? "green" : score >= 0.6 ? "blue" : "orange";
        return (
          <span className={`text-${color}-600 font-semibold`}>
            {percentage}%
          </span>
        );
      },
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      width: 100,
      render: (status) => {
        const statusColor =
          status === "available"
            ? "green"
            : status === "pending"
            ? "blue"
            : "gray";
        return (
          <span className={`text-${statusColor}-600 capitalize`}>
            {status || "N/A"}
          </span>
        );
      },
    },
  ];

  return (
    <StyledSkillTable
      columns={columns}
      dataSource={data}
      loading={loading}
      rowKey="id"
      locale={{
        emptyText: "No candidates found",
      }}
      pagination={false}
    />
  );
};

export default CandidateTable;
