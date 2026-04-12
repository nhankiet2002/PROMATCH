import { Drawer, Button, Space, Input, Select, Tag } from "antd";
import { useFormik } from "formik";
import * as yup from "yup";
import { useState } from "react";
import { useCreateProjectMutation } from "@hooks/useProject";
import { useGetSkillSet } from "@hooks/useSkills";
import { useTheme } from "@contexts/themeContext";
import { CloseOutlined, PlusOutlined, DeleteOutlined } from "@ant-design/icons";

const validationSchema = yup.object({
  name: yup.string().required("Project name is required"),
  description: yup.string(),
  projectType: yup.string().required("Project type is required"),
  quota: yup.array().of(yup.string()),
  skillSet: yup.array().of(yup.number()),
});

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

const CreateProjectDrawer = ({ open, onClose, onSuccess }) => {
  const { theme } = useTheme();
  const { data: skillData, isLoading: skillLoading } = useGetSkillSet();
  const [quotaList, setQuotaList] = useState([]);
  const [selectedQuotaRole, setSelectedQuotaRole] = useState("PM");
  const mutation = useCreateProjectMutation({
    onSuccess: () => {
      onSuccess?.();
      formik.resetForm();
      setQuotaList([]);
      setSelectedQuotaRole("PM");
      onClose();
    },
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      projectType: "THESIS",
      quota: [],
      skillSet: [],
    },
    validationSchema,
    onSubmit: (values) => {
      mutation.mutate({
        ...values,
        quota: quotaList,
      });
    },
  });

  const handleOpenChange = (newOpen) => {
    if (!newOpen) {
      formik.resetForm();
      setQuotaList([]);
      setSelectedQuotaRole("PM");
      onClose();
    }
  };

  const handleAddQuota = () => {
    setQuotaList([...quotaList, selectedQuotaRole]);
  };

  const handleRemoveQuota = (index) => {
    setQuotaList(quotaList.filter((_, i) => i !== index));
  };

  return (
    <Drawer
      title="Tạo dự án mới"
      style={{
        background: theme === "light" ? "var(--linear-sky)" : "var(--widget)",
        color: theme === "light" ? "var(--text)" : "white",
      }}
      placement="right"
      closeIcon={
        <CloseOutlined style={{ color: theme === "light" ? "#000" : "#fff" }} />
      }
      onClose={() => handleOpenChange(false)}
      open={open}
      width={500}
      footer={
        <Space className="w-full justify-end">
          <Button onClick={() => handleOpenChange(false)}>Hủy</Button>
          <Button
            type="primary"
            onClick={formik.handleSubmit}
            loading={mutation.isPending}
            disabled={!formik.isValid}
            className={`${
              theme === "light"
                ? "disabled:text-gray-500"
                : "disabled:text-white"
            }`}
          >
            Tạo
          </Button>
        </Space>
      }
    >
      <div className="flex flex-col gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Tên dự án</label>
          <Input
            placeholder="Nhập tên dự án"
            value={formik.values.name}
            onChange={(e) => formik.setFieldValue("name", e.target.value)}
            onBlur={() => formik.setFieldTouched("name", true)}
            status={formik.touched.name && formik.errors.name ? "error" : ""}
          />
          {formik.touched.name && formik.errors.name && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.name}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Mô tả</label>
          <Input.TextArea
            placeholder="Nhập mô tả dự án"
            value={formik.values.description}
            onChange={(e) =>
              formik.setFieldValue("description", e.target.value)
            }
            onBlur={() => formik.setFieldTouched("description", true)}
            rows={3}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Loại dự án</label>
          <Select
            placeholder="Chọn loại dự án"
            value={formik.values.projectType}
            onChange={(value) => formik.setFieldValue("projectType", value)}
            options={projectTypeOptions}
            status={
              formik.touched.projectType && formik.errors.projectType
                ? "error"
                : ""
            }
            className="w-1/2"
          />
          {formik.touched.projectType && formik.errors.projectType && (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.projectType}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Kĩ năng</label>
          <Select
            mode="multiple"
            placeholder="Chọn kĩ năng"
            value={formik.values.skillSet}
            onChange={(value) => formik.setFieldValue("skillSet", value)}
            options={
              skillData?.data?.map((skill) => ({
                value: skill.id,
                label: skill.name,
              })) || []
            }
            loading={skillLoading}
            className="w-1/2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Vai trò</label>
          <div className="flex gap-2 mb-3">
            <Select
              placeholder="Chọn vai trò"
              value={selectedQuotaRole}
              onChange={setSelectedQuotaRole}
              options={quotaOptions}
              className="flex-1"
            />
            <Button
              icon={<PlusOutlined />}
              onClick={handleAddQuota}
              type="primary"
            >
              Add
            </Button>
          </div>

          {quotaList.length === 0 ? (
            <div className="p-4 text-center text-gray-500 border border-dashed rounded">
              Chưa có vai trò
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {quotaList.map((quota, index) => (
                <Tag
                  key={index}
                  closable
                  onClose={() => handleRemoveQuota(index)}
                >
                  {quota}
                </Tag>
              ))}
            </div>
          )}
        </div>
      </div>
    </Drawer>
  );
};

export default CreateProjectDrawer;
