import { Drawer, Form, Button, Space, InputNumber, Input, Empty } from "antd";
import { CloseOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { useModifySkillsMutation } from "@hooks/useSkills";
import { useState, useEffect } from "react";
import { useTheme } from "@contexts/themeContext";

const EditSkillsDrawer = ({ open, onClose, skills = [], onSuccess }) => {
  const { theme } = useTheme();
  const [form] = Form.useForm();
  const [editingSkills, setEditingSkills] = useState(skills);
  const mutation = useModifySkillsMutation({
    onSuccess: () => {
      onSuccess?.();
      onClose();
    },
  });

  useEffect(() => {
    if (open) {
      setEditingSkills(skills);
    }
  }, [open, skills]);

  const handleAddSkill = () => {
    const newId =
      editingSkills.length > 0
        ? Math.max(...editingSkills.map((s) => s.id)) + 1
        : 1;
    setEditingSkills([...editingSkills, { name: "" }]);
  };

  const handleDeleteSkill = (id) => {
    setEditingSkills(editingSkills.filter((skill) => skill.id !== id));
  };

  const handleSkillChange = (id, field, value) => {
    setEditingSkills(
      editingSkills.map((skill) =>
        skill.id === id ? { ...skill, [field]: value } : skill
      )
    );
  };

  const handleSave = () => {
    const validSkills = editingSkills.filter((skill) => skill.name.trim());
    if (validSkills.length === 0) {
      return;
    }
    mutation.mutate(validSkills);
  };

  const handleOpenChange = (newOpen) => {
    if (!newOpen) {
      setEditingSkills([]);
      onClose();
    }
  };

  return (
    <Drawer
      style={{
        background: theme === "light" ? "var(--linear-sky)" : "var(--widget)",
        color: theme === "light" ? "var(--text)" : "white",
      }}
      title={skills.length === 0 ? "Thêm kĩ năng" : "Chỉnh sửa kĩ năng"}
      placement="right"
      onClose={() => handleOpenChange(false)}
      closeIcon={
        <CloseOutlined style={{ color: theme === "light" ? "#000" : "#fff" }} />
      }
      open={open}
      width={500}
      footer={
        <Space className="w-full justify-end">
          <Button onClick={() => handleOpenChange(false)}>Hủy</Button>
          <Button
            type="primary"
            onClick={handleSave}
            loading={mutation.isPending}
          >
            Lưu
          </Button>
        </Space>
      }
    >
      <div className="flex flex-col gap-4">
        {editingSkills.length === 0 ? (
          <div className="py-8">
            <Empty description="No skills" />
          </div>
        ) : (
          editingSkills.map((skill) => (
            <div key={skill.id} className="flex gap-2 items-end">
              <div className="flex-1 flex gap-2">
                {/* <InputNumber
                  value={skill.id}
                  // onChange={(value) => handleSkillChange(skill.id, "id", value)}
                  placeholder="ID"
                  disabled
                  className="w-16 text-white"
                /> */}
                <Input
                  value={skill.name}
                  onChange={(e) =>
                    handleSkillChange(skill.id, "name", e.target.value)
                  }
                  placeholder="Tên kĩ năng"
                  className="flex-1"
                />
              </div>
              <Button
                type="primary"
                danger
                icon={<DeleteOutlined />}
                onClick={() => handleDeleteSkill(skill.id)}
              />
            </div>
          ))
        )}

        {!editingSkills?.length && (
          <Button
            icon={<PlusOutlined />}
            onClick={handleAddSkill}
            className="w-full"
          >
            Thêm kĩ năng
          </Button>
        )}
      </div>
    </Drawer>
  );
};

export default EditSkillsDrawer;
