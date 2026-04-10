package tlu.project.matcher.service;

import tlu.project.matcher.controller.auth.request.RegisterRequest;
import tlu.project.matcher.controller.auth.response.LoginResponse;
import tlu.project.matcher.domain.User;
import tlu.project.matcher.utils.BaseResponse;

public interface UserService {
    BaseResponse register(RegisterRequest request);
    BaseResponse getInfo(String username);
    LoginResponse generateLoginResponse(User user);
}
