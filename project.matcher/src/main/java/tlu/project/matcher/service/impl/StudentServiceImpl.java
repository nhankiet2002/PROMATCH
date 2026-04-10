package tlu.project.matcher.service.impl;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;
import tlu.project.matcher.controller.student.request.AddSkillsRequest;
import tlu.project.matcher.controller.student.request.CreateStudentRequest;
import tlu.project.matcher.controller.student.request.SkillRequest;
import tlu.project.matcher.controller.student.request.UpdateProfileRequest;
import tlu.project.matcher.controller.student.response.SkillResponse;
import tlu.project.matcher.controller.student.response.StudentProfileResponse;
import tlu.project.matcher.domain.*;
import tlu.project.matcher.domain.enums.Role;
import tlu.project.matcher.repository.jpa.AuthorityRepository;
import tlu.project.matcher.repository.jpa.SkillRepository;
import tlu.project.matcher.repository.jpa.StudentRepository;
import tlu.project.matcher.repository.jpa.UserRepository;
import tlu.project.matcher.service.StudentService;
import tlu.project.matcher.utils.BaseResponse;
import tlu.project.matcher.utils.CustomPasswordEncoder;
import tlu.project.matcher.utils.CustomResponse;

import java.util.*;

@Service
@Log4j2
@AllArgsConstructor
public class StudentServiceImpl implements StudentService {
    private StudentRepository studentRepository;
    private SkillRepository skillRepository;
    private AuthorityRepository authorityRepository;
    private CustomPasswordEncoder passwordEncoder;
    private UserRepository userRepository;

    @Override
    public BaseResponse createStudent(CreateStudentRequest request) {
        CustomResponse response = new CustomResponse();
        User user = new User();
        user.setUsername(request.getUsername());
        user.setPassword(passwordEncoder.getPasswordEncoder().encode(request.getPassword()));
        user.setName(request.getName());
        Authority authority = authorityRepository.findByAuthority(Role.ROLE_USER.name());
        authority.getUsers().add(user);
        user.setAuthorities(new HashSet<>(Collections.singletonList(authority)));

        Student student = new Student();
        student.setName(request.getName());
        student.setUser(user);
        studentRepository.save(student);

        authorityRepository.save(authority);
        response.setSuccess();
        return response;
    }

    @Override
    public BaseResponse getProfile(Long id) {
        CustomResponse response = new CustomResponse();
        Student student = studentRepository.findById(id).orElse(null);
        if (student == null) {
            response.setFailed();
            return response;
        }
        StudentProfileResponse profile = new StudentProfileResponse();
        profile.setName(student.getName());
        profile.setBirthday(student.getBirthday());
        profile.setPhoneNumber(student.getPhoneNumber());
        profile.setEmail(student.getEmail());
        profile.setStudentCode(student.getStudentCode());
        List<SkillResponse> skills = new ArrayList<>();
        for (StudentSkill ss : student.getStudentSkills()) {
            SkillResponse sr = new SkillResponse();
            sr.setId(ss.getSkill().getId());
            sr.setName(ss.getSkill().getName());
            sr.setScore(ss.getScore());
            skills.add(sr);
        }
        profile.setSkills(skills);
        response.setSuccess(profile);
        return response;
    }

    @Override
    public BaseResponse updateProfile(UpdateProfileRequest request) {
        CustomResponse response = new CustomResponse();
        Map<Long, Integer> scoreMap = new HashMap<>();
        for (SkillRequest sr : request.getSkills()) {
            scoreMap.put(sr.getId(), sr.getScore());
        }
        List<Skill> skills = skillRepository.findAllById(scoreMap.keySet());
        Student student = studentRepository.findById(request.getId()).orElse(null);
        if (student == null) {
            response.setFailed();
            return response;
        }
        student.setName(request.getName());
        student.setBirthday(request.getBirthday());
        student.setPhoneNumber(request.getPhoneNumber());
        student.setEmail(request.getEmail());
        student.setStudentCode(request.getStudentCode());

        Set<StudentSkill> studentSkills = student.getStudentSkills();

        for (Map.Entry<Long, Integer> entry : scoreMap.entrySet()) {
            Optional<StudentSkill> existedItem = studentSkills.stream().filter(ss -> ss.getSkill().getId().equals(entry.getKey())).findAny();
            if (existedItem.isPresent()) {
                existedItem.get().setScore(entry.getValue());
            } else {
                Skill skill = skills.stream().filter(s -> s.getId().equals(entry.getKey())).findAny().get();
                student.addSkill(skill, scoreMap.get(skill.getId()));
            }
        }

        studentSkills.removeIf(ss -> !scoreMap.containsKey(ss.getSkill().getId()));
        studentRepository.save(student);
        response.setSuccess();
        return response;
    }

    @Override
    public BaseResponse addSkills(AddSkillsRequest request) {
        CustomResponse response = new CustomResponse();
        Map<Long, Integer> scoreMap = new HashMap<>();
        for (SkillRequest sr : request.getSkills()) {
            scoreMap.put(sr.getId(), sr.getScore());
        }
        List<Skill> skills = skillRepository.findAllById(scoreMap.keySet());
        Student student = studentRepository.findById(request.getStudentId()).orElse(null);
        if (student == null) {
            response.setFailed();
            return response;
        }
        for (Skill skill : skills) {
            student.addSkill(skill, scoreMap.get(skill.getId()));
        }
        studentRepository.save(student);
        response.setSuccess();
        return response;
    }
}
