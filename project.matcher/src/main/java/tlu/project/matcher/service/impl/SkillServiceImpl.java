package tlu.project.matcher.service.impl;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;
import tlu.project.matcher.controller.admin.request.ModifySkillSetItem;
import tlu.project.matcher.controller.admin.request.ModifySkillSetRequest;
import tlu.project.matcher.controller.student.response.SkillResponse;
import tlu.project.matcher.domain.Skill;
import tlu.project.matcher.repository.jpa.SkillRepository;
import tlu.project.matcher.service.SkillService;
import tlu.project.matcher.utils.BaseResponse;
import tlu.project.matcher.utils.CustomResponse;

import java.util.ArrayList;
import java.util.List;

@Service
@Log4j2
@AllArgsConstructor
public class SkillServiceImpl implements SkillService {
    private SkillRepository skillRepository;

    @Override
    public BaseResponse modifySkillSet(ModifySkillSetRequest request) {
        CustomResponse response = new CustomResponse();
        List<Skill> skills = skillRepository.findAll();
        List<Skill> requestSkills = new ArrayList<>();
        for (ModifySkillSetItem item : request.getSkillList()) {
            if (item.getId() != null) {
                skillRepository.findById(item.getId()).ifPresent(skill -> skill.setName(item.getName()));
                Skill skill = new Skill();
                skill.setId(item.getId());
                skill.setName(item.getName());
                requestSkills.add(skill);
            } else {
                Skill skill = new Skill();
                skill.setName(item.getName());
                skills.add(skill);
                requestSkills.add(skill);
            }
        }

        skills.removeIf(skill -> !requestSkills.contains(skill));
        skillRepository.saveAll(skills);
        response.setSuccess();
        return response;
    }

    @Override
    public BaseResponse getSkillSet(String searchKey) {
        CustomResponse response = new CustomResponse();
        List<Skill> skills;
        if (searchKey == null || searchKey.isEmpty()) {
            skills = skillRepository.findAll();
        } else {
            skills = skillRepository.findByNameContainsIgnoreCase(searchKey);
        }
        List<SkillResponse> result = new ArrayList<>();
        for (Skill skill : skills) {
            SkillResponse skillResponse = new SkillResponse();
            skillResponse.setId(skill.getId());
            skillResponse.setName(skill.getName());
            result.add(skillResponse);
        }

        response.setSuccess(result);
        return response;
    }
}
