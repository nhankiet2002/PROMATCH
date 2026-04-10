package tlu.project.matcher.controller.student.request;

import lombok.Data;
import tlu.project.matcher.domain.enums.ProjectRole;

@Data
public class AddMemberRequest {
    private Long studentId;
    private Long projectId;
    private ProjectRole role;
}
