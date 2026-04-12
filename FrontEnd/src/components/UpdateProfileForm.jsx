// components
import Spring from "@components/Spring";
import { toast } from "react-toastify";

// hooks
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { authState, loadUserInfo } from "@store/slices/auth.slice";
import { useGetSkillSet, useAddSkillsMutation } from "@hooks/useSkills";

// utils
import classNames from "classnames";
import { client, Endpoint } from "@api/index";

const UpdateProfileForm = () => {
  const dispatch = useAppDispatch();
  const { authData } = useAppSelector(authState);
  const [submitting, setSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [selectedSkills, setSelectedSkills] = useState([{ id: "", score: "" }]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: authData?.name || "",
      email: authData?.email || "",
      phoneNumber: authData?.phoneNumber || "",
      birthday: authData?.birthday || "",
      studentCode: authData?.studentCode || "",
    },
  });

  const {
    data: skillData,
    isLoading: skillLoading,
    isError: skillError,
  } = useGetSkillSet();

  const addSkillsMutation = useAddSkillsMutation({
    onSuccess: () => {
      setSelectedSkills([{ id: "", score: "" }]);
    },
  });

  const handleAddSkillRow = () => {
    setSelectedSkills([...selectedSkills, { id: "", score: "" }]);
  };

  const handleRemoveSkillRow = (index) => {
    setSelectedSkills(selectedSkills.filter((_, i) => i !== index));
  };

  const handleChangeSkillRow = (index, field, value) => {
    setSelectedSkills((current) =>
      current.map((skill, i) =>
        i === index ? { ...skill, [field]: value } : skill
      )
    );
  };

  const handleSkillsSubmit = () => {
    if (!authData?.id) {
      toast.error("Unauthorized. Please log in again.");
      return;
    }

    const validSkills = selectedSkills.filter((skill) => skill.id !== "");

    if (validSkills.length === 0) {
      toast.error("Please add at least one skill.");
      return;
    }

    const payloadSkills = validSkills.map((skill) => ({
      id: Number(skill.id),
      score: Number(skill.score) || 0,
    }));

    if (payloadSkills.some((skill) => isNaN(skill.id))) {
      toast.error("Please select a valid skill for each row.");
      return;
    }

    addSkillsMutation.mutate({
      studentId: authData.id,
      skills: payloadSkills,
    });
  };

  const onSubmit = async (data) => {
    if (!authData?.id) {
      toast.error("Unauthorized. Please log in again.");
      return;
    }
    setSubmitting(true);
    try {
      const response = await client.put(Endpoint.UPDATE_PROFILE, {
        ...data,
        id: authData.id,
      });
      if (response && response.data) {
        const updatedData = { ...authData, ...response.data };
        dispatch(loadUserInfo(updatedData));
        reset({
          name: updatedData.name || "",
          email: updatedData.email || "",
          phoneNumber: updatedData.phoneNumber || "",
          birthday: updatedData.birthday || "",
          studentCode: updatedData.studentCode || "",
        });
        toast.success("Update successful!");
      }
    } catch (err) {
      console.error("Update profile failed:", err);
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Update failed. Please try again.";
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Spring className="card flex flex-col gap-5 md:gap-8">
      <h5>Cập nhật hồ sơ</h5>

      <div className="flex gap-2 rounded-xl border border-gray-200 bg-gray-100 p-1">
        <button
          type="button"
          className={classNames(
            "rounded-lg px-4 py-2 text-sm font-semibold transition",
            {
              "bg-white text-gray-900 shadow-sm": activeTab === "profile",
              "text-gray-600 hover:text-gray-900": activeTab !== "profile",
            }
          )}
          onClick={() => setActiveTab("profile")}
        >
          Hồ sơ
        </button>
        <button
          type="button"
          className={classNames(
            "rounded-lg px-4 py-2 text-sm font-semibold transition",
            {
              "bg-white text-gray-900 shadow-sm": activeTab === "skills",
              "text-gray-600 hover:text-gray-900": activeTab !== "skills",
            }
          )}
          onClick={() => setActiveTab("skills")}
        >
          Kĩ năng
        </button>
      </div>

      {activeTab === "profile" ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 md:grid-cols-2 md:gap-5">
            <div className="field-wrapper">
              <label className="field-label" htmlFor="name">
                Tên
              </label>
              <input
                className={classNames("field-input", {
                  "field-input--error": errors.name,
                })}
                type="text"
                id="name"
                placeholder="Enter your name"
                {...register("name", { required: true })}
              />
            </div>
            <div className="field-wrapper">
              <label className="field-label" htmlFor="email">
                Email
              </label>
              <input
                className={classNames("field-input", {
                  "field-input--error": errors.email,
                })}
                type="email"
                id="email"
                placeholder="Enter your email"
                {...register("email", {
                  required: true,
                  pattern: /^\S+@\S+$/i,
                })}
              />
            </div>
            <div className="field-wrapper">
              <label className="field-label" htmlFor="phoneNumber">
                Số điện thoại
              </label>
              <input
                className={classNames("field-input", {
                  "field-input--error": errors.phoneNumber,
                })}
                type="text"
                id="phoneNumber"
                placeholder="Enter phone number"
                {...register("phoneNumber")}
              />
            </div>
            <div className="field-wrapper">
              <label className="field-label" htmlFor="birthday">
                Ngày sinh
              </label>
              <input
                className={classNames("field-input", {
                  "field-input--error": errors.birthday,
                })}
                type="date"
                id="birthday"
                {...register("birthday")}
              />
            </div>
            <div className="field-wrapper">
              <label className="field-label" htmlFor="studentCode">
                Mã sinh viên
              </label>
              <input
                className={classNames("field-input", {
                  "field-input--error": errors.studentCode,
                })}
                type="text"
                id="studentCode"
                placeholder="Enter student code"
                {...register("studentCode")}
              />
            </div>
          </div>
          <button
            className="btn btn--primary w-full mt-5 md:w-fit md:px-[70px]"
            type="submit"
            disabled={submitting}
          >
            {submitting ? "Updating..." : "Update Profile"}
          </button>
        </form>
      ) : (
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h6 className="text-base font-medium">Kĩ năng sinh viên</h6>
              <p className="text-sm text-gray-500">
                Thêm hoặc cập nhật kĩ năng của bạn để hệ thống có thể gợi ý dự
                án phù hợp
              </p>
            </div>
            <button
              type="button"
              className="btn btn--secondary"
              onClick={handleAddSkillRow}
            >
              Thêm kĩ năng
            </button>
          </div>

          {skillError && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              Unable to load available skills.
            </div>
          )}

          {skillLoading ? (
            <div className="rounded-lg border border-dashed border-gray-300 p-6 text-center text-gray-500">
              Loading skills...
            </div>
          ) : selectedSkills.length === 0 ? (
            <div className="rounded-lg border border-dashed border-gray-300 p-6 text-center text-gray-500">
              No skills added yet.
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {selectedSkills.map((skill, index) => (
                <div
                  key={index}
                  className="grid gap-3 md:grid-cols-[2fr_1fr_auto] items-end"
                >
                  <div className="field-wrapper">
                    <label className="field-label" htmlFor={`skill-${index}`}>
                      Kĩ năng
                    </label>
                    <select
                      id={`skill-${index}`}
                      value={skill.id}
                      onChange={(event) =>
                        handleChangeSkillRow(index, "id", event.target.value)
                      }
                      className="field-input"
                    >
                      <option value="">Chọn kĩ năng</option>
                      {skillData?.data?.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="field-wrapper">
                    <label className="field-label" htmlFor={`score-${index}`}>
                      Điểm
                    </label>
                    <input
                      id={`score-${index}`}
                      type="number"
                      min="0"
                      max="100"
                      value={skill.score}
                      onChange={(event) =>
                        handleChangeSkillRow(index, "score", event.target.value)
                      }
                      className="field-input"
                      placeholder="0"
                    />
                  </div>

                  <button
                    type="button"
                    className="btn btn--secondary mt-6 h-10 w-full md:w-auto"
                    onClick={() => handleRemoveSkillRow(index)}
                  >
                    Xóa
                  </button>
                </div>
              ))}
            </div>
          )}

          <button
            type="button"
            className="btn btn--primary w-full mt-5 md:w-fit md:px-[70px]"
            onClick={handleSkillsSubmit}
            disabled={addSkillsMutation.isPending}
          >
            {addSkillsMutation.isPending ? "Đang lưu..." : "Cập nhật kĩ năng"}
          </button>
        </div>
      )}
    </Spring>
  );
};

export default UpdateProfileForm;
