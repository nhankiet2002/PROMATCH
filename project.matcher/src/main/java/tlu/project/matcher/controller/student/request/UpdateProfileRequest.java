package tlu.project.matcher.controller.student.request;

import lombok.Data;

import java.util.List;

@Data
public class UpdateProfileRequest {
    private List<SkillRequest> skills;
    private Long id;
    private String name;
    private String birthday;
    private String phoneNumber;
    private String email;
    private String studentCode;
}
