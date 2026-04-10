package tlu.project.matcher.service;

import tlu.project.matcher.controller.student.request.*;
import tlu.project.matcher.domain.User;
import tlu.project.matcher.utils.BaseResponse;

public interface ProjectService {
    BaseResponse createProject(CreateProjectRequest request, User user);
    BaseResponse updateProject(UpdateProjectRequest request);
    BaseResponse getOwnProjectList(Long userId);
    BaseResponse addMember(AddMemberRequest request);
    BaseResponse modifyMember(ModifyMemberRequest request);
    BaseResponse deleteMember(DeleteMemberRequest request);
    BaseResponse findPotentialCandidate(Long projectId, double threshold);
    BaseResponse projectListing();
    BaseResponse suggestTopic(String type, String topic);
}
