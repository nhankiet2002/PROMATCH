package tlu.project.matcher.controller.student.response;

import lombok.Data;
import tlu.project.matcher.domain.enums.ProjectRole;
import tlu.project.matcher.domain.enums.ProjectType;

import java.util.List;

@Data
public class ProjectResponse {
    private Long id;
    private String name;
    private String state;
    private String description;
    private ProjectType projectType;
    private String link;
    private List<ProjectRole> quota;
    private List<SkillResponse> skills;
    private StudentProfileResponse owner;
    private List<StudentProfileResponse> members;
}
