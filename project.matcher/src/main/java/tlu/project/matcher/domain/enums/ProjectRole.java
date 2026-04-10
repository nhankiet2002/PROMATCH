package tlu.project.matcher.domain.enums;

import lombok.Getter;

@Getter
public enum ProjectRole {
    PM("Project Manager"),
    FULLSTACK("Full-Stack Developer"),
    BE("Backend Developer"),
    FE("Frontend Developer"),
    DESIGN("UX/UI/Designer");

    private final String displayName;

    ProjectRole(String displayName) {
        this.displayName = displayName;
    }

}
