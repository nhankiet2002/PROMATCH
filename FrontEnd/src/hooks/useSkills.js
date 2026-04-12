import { useMutation, useQuery } from "@tanstack/react-query";
import { client, Endpoint } from "@api/index";
import { toast } from "react-toastify";

/**
 * Hook for modifying user skills
 * @param {Object} options - Mutation options
 * @param {Function} options.onSuccess - Callback on success
 * @param {Function} options.onError - Callback on error
 * @returns {Object} - React Query mutation object
 */
export const useModifySkillsMutation = (options = {}) => {
  return useMutation({
    mutationFn: async (skillList) => {
      if (!Array.isArray(skillList) || skillList.length === 0) {
        throw new Error("Skill list must be a non-empty array");
      }

      const response = await client.post(Endpoint.MODIFY_SKILLS, {
        skillList,
      });

      return response;
    },
    onSuccess: (data) => {
      toast.success("Skills updated successfully");
      options.onSuccess?.(data);
    },
    onError: (error) => {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to update skills";
      toast.error(message);
      options.onError?.(error);
    },
    ...options,
  });
};

/**
 * Hook for adding skills for a student
 * @param {Object} options - Mutation options
 * @param {Function} options.onSuccess - Callback on success
 * @param {Function} options.onError - Callback on error
 * @returns {Object} - React Query mutation object
 */
export const useAddSkillsMutation = (options = {}) => {
  return useMutation({
    mutationFn: async (payload) => {
      const { studentId, skills } = payload || {};

      if (typeof studentId !== "number") {
        throw new Error("studentId must be a number");
      }

      if (!Array.isArray(skills) || skills.length === 0) {
        throw new Error("Skills must be a non-empty array");
      }

      const response = await client.post(Endpoint.ADD_SKILLS, {
        studentId,
        skills,
      });

      return response;
    },
    onSuccess: (data) => {
      toast.success("Skills added successfully");
      options.onSuccess?.(data);
    },
    onError: (error) => {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to add skills";
      toast.error(message);
      options.onError?.(error);
    },
    ...options,
  });
};

/**
 * Hook for fetching skill set
 * @param {Object} options - Query options
 * @param {boolean} options.enabled - Whether the query should run (default: true)
 * @returns {Object} - React Query query object with data, isLoading, isError, etc.
 */
export const useGetSkillSet = (options = {}) => {
  return useQuery({
    queryKey: ["skillSet"],
    queryFn: async () => {
      const response = await client.get(`${Endpoint.GET_SKILL_SET}?searchKey=`);
      return response;
    },
    enabled: options.enabled !== false,
    ...options,
  });
};
