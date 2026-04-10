package tlu.project.matcher.controller.student;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import tlu.project.matcher.controller.student.request.*;
import tlu.project.matcher.domain.User;
import tlu.project.matcher.service.ProjectService;
import tlu.project.matcher.service.SkillService;
import tlu.project.matcher.service.StudentService;
import tlu.project.matcher.utils.BaseResponse;

@RestController
@RequestMapping("/api/student")
@AllArgsConstructor
@Log4j2
public class StudentController {
    private StudentService studentService;
    private ProjectService projectService;
    private SkillService skillService;

    @GetMapping("/get-skill-set")
    public BaseResponse getSkillSet(
            @RequestParam("searchKey") String searchKey
    ) {
        return skillService.getSkillSet(searchKey);
    }

    @PostMapping("/create-student")
    public BaseResponse createStudent(
            @RequestBody CreateStudentRequest request
    ) {
        return studentService.createStudent(request);
    }

    @PostMapping("/add-skills")
    public BaseResponse addSkills(
            @RequestBody AddSkillsRequest request
    ) {
        return studentService.addSkills(request);
    }

    @PostMapping("/update-profile")
    public BaseResponse updateProfile(
            @RequestBody UpdateProfileRequest request
    ) {
        return studentService.updateProfile(request);
    }

    @GetMapping("/get-profile")
    public BaseResponse getProfile(
            @RequestParam("id") Long id
    ) {
        return studentService.getProfile(id);
    }

    @PostMapping("/create-project")
    public BaseResponse createProject(
            @RequestBody CreateProjectRequest request,
            @AuthenticationPrincipal User user
    ) {
        return projectService.createProject(request, user);
    }

    @PostMapping("/update-project")
    public BaseResponse updateProject(
            @RequestBody UpdateProjectRequest request
    ) {
        return projectService.updateProject(request);
    }

    @GetMapping("/get-own-project-list")
    public BaseResponse getOwnProjectList(
            @AuthenticationPrincipal User user
    ) {
        return projectService.getOwnProjectList(user.getId());
    }

    @PostMapping("/add-member")
    public BaseResponse addMember(
            @RequestBody AddMemberRequest request
    ) {
        return projectService.addMember(request);
    }

    @PostMapping("/modify-member")
    public BaseResponse modifyMember(
            @RequestBody ModifyMemberRequest request
    ) {
        return projectService.modifyMember(request);
    }

    @PostMapping("/delete-member")
    public BaseResponse deleteMember(
            @RequestBody DeleteMemberRequest request
    ) {
        return projectService.deleteMember(request);
    }

    @GetMapping("/find-potential-candidate")
    public BaseResponse findPotentialCandidate(
            @RequestParam("projectId") Long projectId,
            @RequestParam("threshold") Double threshold
    ) {
        return projectService.findPotentialCandidate(projectId, threshold);
    }

    @GetMapping("/project-listing")
    public BaseResponse projectListing() {
        return projectService.projectListing();
    }

    @GetMapping("/suggest-topic")
    public BaseResponse suggestTopic(
            @RequestParam("type") String type,
            @RequestParam("topic") String topic) {
        return projectService.suggestTopic(type, topic);
    }
}
