package tlu.project.matcher.controller.student.response;

import lombok.Data;

import java.util.List;

@Data
public class StudentProfileResponse {
    private List<SkillResponse> skills;
    private String name;
    private String birthday;
    private String phoneNumber;
    private String email;
    private String studentCode;
}
