import { Space, Button, Popconfirm } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import StyledSkillTable from "@widgets/SkillManagementTable/styles";
import { useModifySkillsMutation } from "@hooks/useSkills";

const SkillTable = ({ data = [], loading = false, onRefresh, onEdit }) => {
  const mutation = useModifySkillsMutation({
    onSuccess: () => {
      onRefresh?.();
    },
  });

  const handleDelete = (id) => {
    const filteredSkills = data.filter((skill) => skill.id !== id);
    mutation.mutate(filteredSkills);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 80,
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Tên kĩ năng",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Hành động",
      key: "actions",
      width: 180,
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            icon={<EditOutlined />}
            title="Edit coming soon"
            onClick={() => onEdit(record)}
          />
          <Popconfirm
            title="Xóa Kĩ Năng"
            description={`Bạn có chắc chắn muốn xóa "${record.name}"?`}
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
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
      loading={loading || mutation.isPending}
      rowKey="id"
      locale={{
        emptyText: "No skills found",
      }}
      pagination={false}
    />
  );
};

export default SkillTable;
