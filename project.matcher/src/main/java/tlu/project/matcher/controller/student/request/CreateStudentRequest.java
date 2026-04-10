package tlu.project.matcher.controller.student.request;

import lombok.Data;

@Data
public class CreateStudentRequest {
    private String username;
    private String password;
    private String name;
}
