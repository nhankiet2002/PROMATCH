package tlu.project.matcher.service;

import tlu.project.matcher.controller.admin.request.ModifySkillSetRequest;
import tlu.project.matcher.utils.BaseResponse;

public interface SkillService {
    BaseResponse modifySkillSet(ModifySkillSetRequest request);
    BaseResponse getSkillSet(String searchKey);
}
