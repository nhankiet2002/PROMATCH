package tlu.project.matcher.service.impl;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Service;
import tlu.project.matcher.controller.auth.request.RegisterRequest;
import tlu.project.matcher.controller.auth.response.LoginResponse;
import tlu.project.matcher.domain.Authority;
import tlu.project.matcher.domain.Student;
import tlu.project.matcher.domain.User;
import tlu.project.matcher.domain.enums.Role;
import tlu.project.matcher.repository.jpa.AuthorityRepository;
import tlu.project.matcher.repository.jpa.StudentRepository;
import tlu.project.matcher.repository.jpa.UserRepository;
import tlu.project.matcher.service.UserService;
import tlu.project.matcher.utils.BaseResponse;
import tlu.project.matcher.utils.CustomPasswordEncoder;
import tlu.project.matcher.utils.CustomResponse;
import tlu.project.matcher.utils.ErrorCodeDefs;

import javax.transaction.Transactional;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
@Log4j2
public class UserServiceImpl implements UserService {
    private AuthorityRepository authorityRepository;
    private CustomPasswordEncoder passwordEncoder;
    private UserRepository userRepository;
    private StudentRepository studentRepository;

    @Override
    @Transactional
    public BaseResponse register(RegisterRequest request) {
        CustomResponse response = new CustomResponse();
        User user = new User();
        if (userRepository.existsByUsername(request.getUsername())) {
            response.setFailed(ErrorCodeDefs.ERR_CODE_USERNAME_USED);
            return response;
        }
        user.setUsername(request.getUsername());
        user.setPassword(passwordEncoder.getPasswordEncoder().encode(request.getPassword()));
        user.setPhoneNumber(request.getPhoneNumber());
        user.setEmail(request.getEmail());
        user.setName(request.getName());
        Authority authority = authorityRepository.findByAuthority(Role.ROLE_USER.name());
        authority.getUsers().add(user);
        user.setAuthorities(new HashSet<>(Collections.singletonList(authority)));

        Student student = new Student();
        student.setName(request.getName());
        student.setEmail(request.getEmail());
        student.setPhoneNumber(request.getPhoneNumber());
        student.setStudentCode(request.getStudentCode());
        student.setMajorId(request.getMajorId());
        student.setFacultyId(request.getFacultyId());
        student.setUser(user);
        studentRepository.save(student);

        authorityRepository.save(authority);
        response.setSuccess(generateLoginResponse(user));
        return response;
    }

    @Override
    public BaseResponse getInfo(String username) {
        CustomResponse response = new CustomResponse();
        User user = userRepository.findByUsername(username).orElse(null);
        if (user == null) {
            response.setFailed("user not exist!!!");
            return response;
        }
        response.setSuccess(generateLoginResponse(user));
        return response;
    }

    @Override
    public LoginResponse generateLoginResponse(User user) {
        User savedUser = userRepository.getById(user.getId());
        savedUser.setRefreshToken(user.getRefreshToken());
        savedUser.setRefreshTokenExpiredTime(user.getRefreshTokenExpiredTime());
        userRepository.save(savedUser);

        LoginResponse loginResponse = new LoginResponse();
        loginResponse.setId(user.getId());
        loginResponse.setUsername(user.getUsername());
        loginResponse.setPhoneNumber(user.getPhoneNumber());
        loginResponse.setName(user.getName());

        loginResponse.setRefreshToken(user.getRefreshToken());
        Set<? extends GrantedAuthority> authorities = user.getAuthorities();
        Set<String> roleSet = authorities.stream().map(GrantedAuthority::getAuthority).collect(Collectors.toSet());
        loginResponse.setRole(roleSet);
        return loginResponse;
    }
}
