import { Button, Space, Popconfirm } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  // ChevronDownOutlined,
} from "@ant-design/icons";
import styled from "styled-components/macro";
import { useModifySkillsMutation } from "@hooks/useSkills";

const CollapseItemWrapper = styled.div`
  border: 1px solid var(--border);
  border-radius: 8px;
  background: var(--widget);
  overflow: hidden;
`;

const CollapseHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  cursor: pointer;
  user-select: none;

  &:hover {
    background: var(--hover);
  }
`;

const CollapseContent = styled.div`
  padding: 16px;
  border-top: 1px solid var(--border);
  background: var(--widget-secondary);
`;

const SkillCollapseItem = ({ skill, isActive, onToggle, onRefresh }) => {
  const mutation = useModifySkillsMutation({
    onSuccess: () => {
      onRefresh?.();
    },
  });

  const handleDelete = (id) => {
    // In a real scenario, you'd get all skills and filter this one
    mutation.mutate([]);
  };

  return (
    <CollapseItemWrapper>
      <CollapseHeader onClick={() => onToggle(skill.id)}>
        <div>
          <p className="font-semibold">{skill.name}</p>
          <p className="text-sm text-gray-500">ID: {skill.id}</p>
        </div>
        {/* <ChevronDownOutlined
          style={{
            transform: isActive ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.3s ease",
          }}
        /> */}
      </CollapseHeader>
      {isActive && (
        <CollapseContent>
          <Space className="w-full justify-end">
            <Button
              type="primary"
              icon={<EditOutlined />}
              disabled
              title="Edit coming soon"
            >
              Edit
            </Button>
            <Popconfirm
              title="Delete Skill"
              description={`Are you sure you want to delete "${skill.name}"?`}
              onConfirm={() => handleDelete(skill.id)}
              okText="Yes"
              cancelText="No"
            >
              <Button danger icon={<DeleteOutlined />}>
                Delete
              </Button>
            </Popconfirm>
          </Space>
        </CollapseContent>
      )}
    </CollapseItemWrapper>
  );
};

export default SkillCollapseItem;
