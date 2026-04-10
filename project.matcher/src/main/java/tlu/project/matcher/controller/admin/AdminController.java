package tlu.project.matcher.controller.admin;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.annotation.*;
import tlu.project.matcher.controller.admin.request.ModifySkillSetRequest;
import tlu.project.matcher.service.SkillService;
import tlu.project.matcher.utils.BaseResponse;

@RestController
@RequestMapping("/api/admin")
@AllArgsConstructor
@Log4j2
public class AdminController {
    private SkillService skillService;

    @PostMapping("/modify-skills")
    public BaseResponse modifySkills(
            @RequestBody ModifySkillSetRequest request
    ) {
        return skillService.modifySkillSet(request);
    }

    @GetMapping("/get-skill-set")
    public BaseResponse getSkillSet(
            @RequestParam("searchKey") String searchKey
    ) {
        return skillService.getSkillSet(searchKey);
    }
}
