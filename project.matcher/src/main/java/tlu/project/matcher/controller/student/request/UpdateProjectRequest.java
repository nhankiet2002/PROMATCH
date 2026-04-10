package tlu.project.matcher.controller.student.request;

import lombok.Data;
import tlu.project.matcher.domain.enums.ProjectRole;
import tlu.project.matcher.domain.enums.ProjectType;

import java.util.List;

@Data
public class UpdateProjectRequest {
    private Long id;
    private String name;
    private String description;
    private ProjectType projectType;
    private List<Long> skillSet;
    private List<ProjectRole> quota;
}
