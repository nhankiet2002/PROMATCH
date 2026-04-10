package tlu.project.matcher.controller.auth;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import tlu.project.matcher.controller.auth.request.LoginRequest;
import tlu.project.matcher.controller.auth.request.RegisterRequest;
import tlu.project.matcher.controller.auth.response.LoginResponse;
import tlu.project.matcher.domain.User;
import tlu.project.matcher.service.UserService;
import tlu.project.matcher.utils.*;

@RestController
@RequestMapping("/api/auth")
@AllArgsConstructor
@Log4j2
public class AuthController {
    private UserService userService;
    private AuthenticationManager authenticationManager;
    private JwtUtils jwtUtils;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        BaseResponse response = new BaseResponse();
        try {
            response = userService.register(request);
            return ResponseEntity.ok(response);
        } catch (BadCredentialsException ex) {
            response.setFailed();
            return ResponseEntity.ok()
                    .body(response);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        log.info("login {} | {}", request.getUsername(), request.getPassword());
        CustomResponse response = new CustomResponse();
        try {
            Authentication authenticate = authenticationManager
                    .authenticate(
                            new UsernamePasswordAuthenticationToken(
                                    request.getUsername(),
                                    request.getPassword()
                            )
                    );

            User user = (User) authenticate.getPrincipal();
            long currentTime = System.currentTimeMillis();
            if (user.getRefreshToken() == null || user.getRefreshTokenExpiredTime() < currentTime) {
                user.setRefreshToken(StringUtils.generateRandomStringNumberCharacter(32));
                user.setRefreshTokenExpiredTime(currentTime + AppUtils._30_DAYS_IN_MILLISECONDS);
            }
            user.setPassword(null);
            String token = jwtUtils.generateToken(user);

            LoginResponse loginResponse = userService.generateLoginResponse(user);
            loginResponse.setToken(token);
            response.setSuccess(loginResponse);

            return ResponseEntity.ok()
                    .header(
                            HttpHeaders.AUTHORIZATION,
                            token
                    )
                    .body(response);
        } catch (BadCredentialsException ex) {
            response.setFailed();
            return ResponseEntity.ok()
                    .body(response);
        }
    }
}
