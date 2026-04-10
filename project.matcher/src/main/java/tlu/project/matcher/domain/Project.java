package tlu.project.matcher.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import tlu.project.matcher.domain.enums.ProjectRole;
import tlu.project.matcher.domain.enums.ProjectType;

import javax.persistence.*;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "project")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String state;
    @Lob
    private String description;
    private String link;
    private ProjectType projectType;

    @ElementCollection
    @Enumerated(EnumType.STRING)
    private List<ProjectRole> quota;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "owner_id")
    private Student owner;

    @ManyToMany(mappedBy = "projects", fetch = FetchType.LAZY)
    private Set<Skill> skillSet = new HashSet<>();

    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<ProjectStudent> projectStudents = new HashSet<>();

    public void addStudent(Student student, ProjectRole role) {
        ProjectStudent ps = new ProjectStudent(this, student, role);
        projectStudents.add(ps);
        student.getProjectStudents().add(ps);
    }
}
