package tlu.project.matcher.domain.enums;

import lombok.Getter;

@Getter
public enum ProjectType {
    THESIS("Khóa luận tốt nghiệp"),
    PERSONAL_PROJECT("Dự án cá nhân"),
    SCIENTIFIC_RESEARCH("Nghiên cứu khoa học"),
    COMPETITION("Cuộc thi");

    private final String displayName;

    ProjectType(String displayName) {
        this.displayName = displayName;
    }
}
