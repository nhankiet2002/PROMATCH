package tlu.project.matcher.controller.auth.request;

import lombok.Data;

@Data
public class RegisterRequest {
    private String username;
    private String password;
    private String email;
    private String phoneNumber;
    private String name;
    private String studentCode;
    private Long majorId;
    private Long facultyId;
}
