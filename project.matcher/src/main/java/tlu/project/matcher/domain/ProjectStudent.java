package tlu.project.matcher.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import tlu.project.matcher.domain.enums.ProjectRole;

import javax.persistence.*;

@Entity
@Table(name = "project_student")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProjectStudent {
    @EmbeddedId
    private ProjectStudentId id;

    @ManyToOne
    @MapsId("projectId")
    private Project project;

    @ManyToOne
    @MapsId("studentId")
    private Student student;

    private int score;
    private String comment;

    @Enumerated(EnumType.STRING)
    private ProjectRole role;

    public ProjectStudent(Project project, Student student, ProjectRole role) {
        this.project = project;
        this.student = student;
        this.role = role;
        this.id = new ProjectStudentId(project.getId(), student.getId());
    }
}
