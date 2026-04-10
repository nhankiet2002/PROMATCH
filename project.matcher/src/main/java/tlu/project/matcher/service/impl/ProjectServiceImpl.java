package tlu.project.matcher.service.impl;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import tlu.project.matcher.controller.student.request.*;
import tlu.project.matcher.controller.student.response.PotentialCandidateResponse;
import tlu.project.matcher.controller.student.response.ProjectResponse;
import tlu.project.matcher.controller.student.response.SkillResponse;
import tlu.project.matcher.controller.student.response.StudentProfileResponse;
import tlu.project.matcher.domain.*;
import tlu.project.matcher.domain.enums.ProjectRole;
import tlu.project.matcher.repository.jpa.ProjectRepository;
import tlu.project.matcher.repository.jpa.SkillRepository;
import tlu.project.matcher.repository.jpa.StudentRepository;
import tlu.project.matcher.service.ProjectService;
import tlu.project.matcher.utils.BaseResponse;
import tlu.project.matcher.utils.CustomResponse;
import tlu.project.matcher.utils.MapUtils;

import java.util.*;
import java.util.stream.Collectors;

@Service
@Log4j2
@AllArgsConstructor
public class ProjectServiceImpl implements ProjectService {
    private ProjectRepository projectRepository;
    private StudentRepository studentRepository;
    private SkillRepository skillRepository;
    @Qualifier("AIClient")
    private RestTemplate restTemplate;

    @Override
    public BaseResponse createProject(CreateProjectRequest request, User user) {
        CustomResponse response = new CustomResponse();
        Project project = new Project();
        project.setName(request.getName());
        project.setDescription(request.getDescription());
        project.setProjectType(request.getProjectType());
        project.setQuota(request.getQuota());

        Student student = studentRepository.findById(user.getId()).orElse(null);
        project.setOwner(student);
        projectRepository.save(project);
        response.setSuccess();
        return response;
    }

    @Override
    public BaseResponse updateProject(UpdateProjectRequest request) {
        CustomResponse response = new CustomResponse();
        Project project = projectRepository.findById(request.getId()).orElse(null);
        if (project == null) {
            response.setFailed();
            return response;
        }
        project.setName(request.getName());
        project.setDescription(request.getDescription());
        project.setProjectType(request.getProjectType());
        project.setQuota(request.getQuota());

        Set<Skill> skills = new HashSet<>(skillRepository.findAllById(request.getSkillSet()));
        project.setSkillSet(skills);
        for (Skill skill : skills) {
            skill.getProjects().add(project);
        }
        skillRepository.saveAll(skills);

        projectRepository.save(project);
        response.setSuccess();
        return response;
    }

    @Override
    public BaseResponse getOwnProjectList(Long userId) {
        CustomResponse response = new CustomResponse();
        List<Project> ownProjects = projectRepository.findByOwner_Id(userId);
        return getProjectListResult(response, ownProjects);
    }

    private static BaseResponse getProjectListResult(CustomResponse response, List<Project> ownProjects) {
        List<ProjectResponse> result = new ArrayList<>();
        for (Project project : ownProjects) {
            if (project.getProjectStudents().size() < project.getQuota().size()) {
                List<ProjectRole> currentRoles = project.getProjectStudents().stream().map(ProjectStudent::getRole).collect(Collectors.toList());
                List<ProjectRole> quota = new ArrayList<>(project.getQuota());
                for (ProjectRole role : currentRoles) {
                    quota.remove(role);
                }

                ProjectResponse pr = new ProjectResponse();
                pr.setId(project.getId());
                pr.setName(project.getName());
                pr.setState(project.getState());
                pr.setDescription(project.getDescription());
                pr.setProjectType(project.getProjectType());
                pr.setLink(project.getLink());
                pr.setQuota(quota);
                List<SkillResponse> skills = new ArrayList<>();
                for (Skill skill : project.getSkillSet()) {
                    SkillResponse sr = new SkillResponse();
                    sr.setId(skill.getId());
                    sr.setName(skill.getName());
                    skills.add(sr);
                }
                pr.setSkills(skills);

                StudentProfileResponse owner = new StudentProfileResponse();
                owner.setName(project.getOwner().getName());
                owner.setBirthday(project.getOwner().getBirthday());
                owner.setPhoneNumber(project.getOwner().getPhoneNumber());
                owner.setEmail(project.getOwner().getEmail());
                owner.setStudentCode(project.getOwner().getStudentCode());
                pr.setOwner(owner);

                List<StudentProfileResponse> members = new ArrayList<>();
                for (ProjectStudent ps : project.getProjectStudents()) {
                    StudentProfileResponse member = new StudentProfileResponse();
                    Student student = ps.getStudent();
                    member.setName(student.getName());
                    member.setBirthday(student.getBirthday());
                    member.setPhoneNumber(student.getPhoneNumber());
                    member.setEmail(student.getEmail());
                    member.setStudentCode(student.getStudentCode());
                    List<SkillResponse> studentSkills = new ArrayList<>();
                    for (StudentSkill ss : student.getStudentSkills()) {
                        SkillResponse sr = new SkillResponse();
                        sr.setId(ss.getSkill().getId());
                        sr.setName(ss.getSkill().getName());
                        sr.setScore(ss.getScore());
                        studentSkills.add(sr);
                    }
                    member.setSkills(studentSkills);
                    members.add(member);
                }
                pr.setMembers(members);
                result.add(pr);
            }
        }
        response.setSuccess(result);
        return response;
    }

    @Override
    public BaseResponse addMember(AddMemberRequest request) {
        CustomResponse response = new CustomResponse();
        Student student = studentRepository.findById(request.getStudentId()).orElse(null);
        Project project = projectRepository.findById(request.getProjectId()).orElse(null);
        if (student == null || project == null) {
            response.setFailed();
            return response;
        }

        project.addStudent(student, request.getRole());
        projectRepository.save(project);
        response.setSuccess();
        return response;
    }

    @Override
    public BaseResponse modifyMember(ModifyMemberRequest request) {
        CustomResponse response = new CustomResponse();
        Student student = studentRepository.findById(request.getStudentId()).orElse(null);
        Project project = projectRepository.findById(request.getProjectId()).orElse(null);
        if (student == null || project == null) {
            response.setFailed();
            return response;
        }

        Optional<ProjectStudent> psOpt = project.getProjectStudents().stream().filter(ps -> ps.getStudent().getId().equals(request.getStudentId())).findAny();
        if (psOpt.isPresent()) {
            ProjectStudent projectStudent = psOpt.get();
            projectStudent.setScore(request.getScore());
            projectStudent.setComment(request.getComment());
            projectStudent.setRole(request.getRole());
        }
        projectRepository.save(project);
        response.setSuccess();
        return response;
    }

    @Override
    public BaseResponse deleteMember(DeleteMemberRequest request) {
        CustomResponse response = new CustomResponse();
        Student student = studentRepository.findById(request.getStudentId()).orElse(null);
        Project project = projectRepository.findById(request.getProjectId()).orElse(null);
        if (student == null || project == null) {
            response.setFailed();
            return response;
        }

        project.getProjectStudents().removeIf(ps -> ps.getStudent().getId().equals(request.getStudentId()));
        projectRepository.save(project);
        response.setSuccess();
        return response;
    }

    @Override
    public BaseResponse findPotentialCandidate(Long projectId, double threshold) {
        CustomResponse response = new CustomResponse();
        Project project = projectRepository.findById(projectId).orElse(null);
        if (project == null) {
            response.setFailed();
            return response;
        }

        Set<Long> requiredSkills = project.getSkillSet().stream().map(Skill::getId).collect(Collectors.toSet());
        List<Student> allStudent = studentRepository.findAll();
        Map<Student, Double> studentScore = new HashMap<>();
        for (Student student : allStudent) {
            double score = calculateSimilarity(student.getStudentSkills(), requiredSkills);
            if (score >= threshold) {
                studentScore.put(student, score);
            }
        }
        MapUtils.sortByValueDesc(studentScore);

        List<StudentProfileResponse> students = new ArrayList<>();
        for (Map.Entry<Student, Double> entry : studentScore.entrySet()) {
            Student student = entry.getKey();
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
            students.add(profile);
        }

        PotentialCandidateResponse result = new PotentialCandidateResponse();
        result.setStudents(students);
        result.setThreshold(threshold);

        response.setSuccess(result);
        return response;
    }

    @Override
    public BaseResponse projectListing() {
        CustomResponse response = new CustomResponse();
        List<Project> allProjects = projectRepository.findAll();
        return getProjectListResult(response, allProjects);
    }

    @Override
    public BaseResponse suggestTopic(String type, String topic) {
        CustomResponse response = new CustomResponse();
        String url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyBO8I9Rjfc4mbKYJaNTkF_Yv3R0VWBdQ3U";

        String question = String.format("Bạn là một chuyên gia nghiên cứu khoa học.\n" +
                "Hãy đề xuất 10 tên đề tài nghiên cứu dựa trên chủ đề sau:\n" +
                "\"%s\"\n" +
                "\n" +
                "Yêu cầu:\n" +
                "- Viết bằng tiếng Việt\n" +
                "- Ngắn gọn, rõ ràng\n" +
                "- Chỉ trả về danh sách, mỗi dòng 1 đề tài", topic);

        Map<String, String> part = new HashMap<>();
        part.put("text", question);

        List<Map<String, String>> parts = new ArrayList<>();
        parts.add(part);

        Map<String, Object> content = new HashMap<>();
        content.put("parts", parts);

        List<Map<String, Object>> contents = new ArrayList<>();
        contents.add(content);

        Map<String, Object> body = new HashMap<>();
        body.put("contents", contents);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Map<String, Object>> request = new HttpEntity<>(body, headers);

        ResponseEntity<String> apiResponse = restTemplate.postForEntity(url, request, String.class);

        List<String> result = Arrays.stream(apiResponse.getBody().split("\n"))
                .map(String::trim)
                .filter(s -> !s.isEmpty())
                .collect(Collectors.toList());
        response.setSuccess(result);
        return response;
    }

    public static double calculateSimilarity(Set<StudentSkill> studentSkills, Set<Long> requiredSkillIds) {

        if (studentSkills == null || studentSkills.isEmpty()) {
            return 0.0;
        }

        Set<Long> requiredSet = new HashSet<>(requiredSkillIds);

        double matchedScore = 0.0;
        double totalUserScore = 0.0;

        for (StudentSkill skill : studentSkills) {
            totalUserScore += skill.getScore();

            if (requiredSet.contains(skill.getSkill().getId())) {
                matchedScore += skill.getScore();
            }
        }

        if (totalUserScore == 0) return 0.0;

        return matchedScore / totalUserScore;
    }
}
