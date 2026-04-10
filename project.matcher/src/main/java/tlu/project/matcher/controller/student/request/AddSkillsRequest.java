package tlu.project.matcher.controller.student.request;

import lombok.Data;

import java.util.List;

@Data
public class AddSkillsRequest {
    private List<SkillRequest> skills;
    private Long studentId;
}
