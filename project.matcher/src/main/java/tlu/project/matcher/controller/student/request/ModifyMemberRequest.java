package tlu.project.matcher.controller.student.request;

import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class ModifyMemberRequest extends AddMemberRequest {
    private int score;
    private String comment;
}
