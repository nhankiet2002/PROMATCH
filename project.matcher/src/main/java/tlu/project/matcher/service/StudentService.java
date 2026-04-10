package tlu.project.matcher.service;

import tlu.project.matcher.controller.student.request.AddSkillsRequest;
import tlu.project.matcher.controller.student.request.CreateStudentRequest;
import tlu.project.matcher.controller.student.request.UpdateProfileRequest;
import tlu.project.matcher.utils.BaseResponse;

public interface StudentService {
    BaseResponse createStudent(CreateStudentRequest request);
    BaseResponse getProfile(Long id);
    BaseResponse updateProfile(UpdateProfileRequest request);
    BaseResponse addSkills(AddSkillsRequest request);
}
