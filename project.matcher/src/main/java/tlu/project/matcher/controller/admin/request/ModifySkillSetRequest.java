package tlu.project.matcher.controller.admin.request;

import lombok.Data;

import java.util.List;

@Data
public class ModifySkillSetRequest {
    private List<ModifySkillSetItem> skillList;
}

