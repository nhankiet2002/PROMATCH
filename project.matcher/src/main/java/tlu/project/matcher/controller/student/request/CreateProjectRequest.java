package tlu.project.matcher.controller.student.request;

import lombok.Data;
import tlu.project.matcher.domain.enums.ProjectRole;
import tlu.project.matcher.domain.enums.ProjectType;

import java.util.List;

@Data
public class CreateProjectRequest {
    private String name;
    private String description;
    private ProjectType projectType;
    private List<ProjectRole> quota;
}
