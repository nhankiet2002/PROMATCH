import { useMutation, useQuery } from "@tanstack/react-query";
import { client, Endpoint } from "@api/index";
import { toast } from "react-toastify";

/**
 * Hook for creating a new project
 * @param {Object} options - Mutation options
 * @param {Function} options.onSuccess - Callback on success
 * @param {Function} options.onError - Callback on error
 * @returns {Object} - React Query mutation object
 */
export const useCreateProjectMutation = (options = {}) => {
  return useMutation({
    mutationFn: async (projectData) => {
      if (!projectData?.name || !projectData?.projectType) {
        throw new Error("Project name and type are required");
      }

      const response = await client.post(Endpoint.CREATE_PROJECT, {
        description: projectData.description || "",
        name: projectData.name,
        projectType: projectData.projectType,
        quota: projectData.quota || [],
      });

      return response;
    },
    onSuccess: (data) => {
      toast.success("Project created successfully");
      options.onSuccess?.(data);
    },
    onError: (error) => {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to create project";
      toast.error(message);
      options.onError?.(error);
    },
    ...options,
  });
};

/**
 * Hook for fetching user's own project list
 * @param {Object} options - Query options
 * @param {boolean} options.enabled - Whether the query should run (default: true)
 * @returns {Object} - React Query query object with data, isLoading, isError, etc.
 */
export const useGetOwnProjectList = (options = {}) => {
  return useQuery({
    queryKey: ["ownProjectList"],
    queryFn: async () => {
      const response = await client.get(Endpoint.GET_OWN_PROJECT_LIST);
      return response;
    },
    enabled: options.enabled !== false,
    ...options,
  });
};

/**
 * Hook for fetching potential candidates
 * @param {Object} params - Query parameters
 * @param {number|string} params.projectId - The project ID to find candidates for
 * @param {number|string} params.threshold - The threshold value for candidate matching
 * @param {Object} options - Query options
 * @param {boolean} options.enabled - Whether the query should run (default: true)
 * @returns {Object} - React Query query object with data, isLoading, isError, etc.
 */
export const useFindPotentialCandidates = (params = {}, options = {}) => {
  const { projectId, threshold, ...queryOptions } = params;

  return useQuery({
    queryKey: ["potentialCandidates", projectId, threshold],
    queryFn: async () => {
      const queryParams = new URLSearchParams();
      if (projectId !== undefined) queryParams.append("projectId", projectId);
      if (threshold !== undefined) queryParams.append("threshold", threshold);

      const url = `${
        Endpoint.FIND_POTENTIAL_CANDIDATE
      }?${queryParams.toString()}`;
      const response = await client.get(url);
      return response;
    },
    enabled:
      options.enabled !== false &&
      projectId !== undefined &&
      threshold !== undefined,
    ...queryOptions,
  });
};
