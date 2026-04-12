import StyledSkillTable from "@widgets/SkillManagementTable/styles";
import { Space, Button, Popconfirm } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const projectTypeOptions = [
  { value: "THESIS", label: "Khóa luận tốt nghiệp" },
  { value: "PERSONAL_PROJECT", label: "Dự án cá nhân" },
  { value: "SCIENTIFIC_RESEARCH", label: "Nghiên cứu khoa học" },
  { value: "COMPETITION", label: "Cuộc thi" },
];

const quotaOptions = [
  { value: "FULLSTACK", label: "Full-Stack Developer" },
  { value: "BE", label: "Backend Developer" },
  { value: "PM", label: "Project Manager" },
  { value: "DESIGN", label: "UX/UI/Designer" },
  { value: "FE", label: "Frontend Developer" },
];

const getLabel = (value, options) => {
  return options.find((opt) => opt.value === value)?.label || value;
};

const ProjectTable = ({
  data = [],
  loading = false,
  onEdit,
  onDelete,
  onFind,
}) => {
  const navigate = useNavigate();
  const columns = [
    {
      title: "Tên dự án",
      width: 300,
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Mô tả",
      width: 300,
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Loại dự án",
      dataIndex: "projectType",
      key: "projectType",
      width: 180,
      render: (projectType) => getLabel(projectType, projectTypeOptions),
    },
    {
      title: "Vai trò",
      dataIndex: "quota",
      key: "quota",
      width: 400,
      render: (quota) => {
        if (!Array.isArray(quota) || quota.length === 0) {
          return <span>N/A</span>;
        }

        const quotaCounts = quota.reduce((acc, q) => {
          acc[q] = (acc[q] || 0) + 1;
          return acc;
        }, {});

        const colors = {
          PM: "bg-purple-100 text-purple-800 border border-purple-300",
          FULLSTACK: "bg-blue-100 text-blue-800 border border-blue-300",
          BE: "bg-green-100 text-green-800 border border-green-300",
          FE: "bg-orange-100 text-orange-800 border border-orange-300",
          DESIGN: "bg-pink-100 text-pink-800 border border-pink-300",
        };

        return (
          <div className="flex flex-wrap gap-2">
            {Object.entries(quotaCounts).map(([role, count]) => (
              <div
                key={role}
                className={`px-3 py-2 rounded-lg font-medium text-sm flex items-center gap-2 ${
                  colors[role] ||
                  "bg-gray-100 text-gray-800 border border-gray-300"
                }`}
              >
                {count > 1 && (
                  <span className="font-bold text-base">{count}x</span>
                )}
                {getLabel(role, quotaOptions)}
              </div>
            ))}
          </div>
        );
      },
    },
    {
      title: "Hành động",
      key: "action",
      width: 180,
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            icon={<UserAddOutlined />}
            title="Tìm ứng viên"
            className="bg-purple-500"
            onClick={() => navigate(`/find-candidate/${record.id}`)}
          />

          <Button
            type="primary"
            icon={<EditOutlined />}
            title="Chỉnh sửa"
            onClick={() => onEdit(record)}
          />
          <Popconfirm
            title="Xóa dự án"
            description={`Bạn có muốn xóa dự án này`}
            onConfirm={() => {}}
            okText="Có"
            cancelText="Không"
          >
            <Button type="primary" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <StyledSkillTable
      columns={columns}
      dataSource={data}
      loading={loading}
      rowKey="id"
      locale={{
        emptyText: "Không tìm thấy dự án nào",
      }}
      pagination={false}
    />
  );
};

export default ProjectTable;
