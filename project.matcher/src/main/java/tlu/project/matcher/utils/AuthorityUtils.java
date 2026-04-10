package tlu.project.matcher.utils;

import tlu.project.matcher.domain.User;

public class AuthorityUtils {
    public static Boolean hasRole(String role, User user) {
        return user.getAuthorities()
                .stream().anyMatch(auth -> auth.getAuthority().equals(role));
    }
}
