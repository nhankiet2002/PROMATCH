package tlu.project.matcher.controller.auth.response;

import lombok.Data;

import java.util.Set;

@Data
public class LoginResponse {
    private Long id;
    private String username;
    private String phoneNumber;
    private String name;
    private String birthday;
    private Integer gender;
    private String studentCode;
    private String clazz;
    private String email;
    private String token;
    private Long facultyId;
    private Long majorId;
    private String refreshToken;
    private Set<String> role;
}
