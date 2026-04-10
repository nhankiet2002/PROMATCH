package tlu.project.matcher.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "student")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Student {
    @Id
    private Long id;

    @MapsId
    @OneToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "id")
    @JsonIgnore
    private User user;

    private String name;
    private String birthday;
    private Integer gender;
    private String phoneNumber;
    private String email;
    private String studentCode;
    private String clazz;
    private Long majorId;
    private Long facultyId;
    private Long intakeId;
    private Long classId;
    private Integer state;
    private String note;

    @OneToMany(mappedBy = "student", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<StudentSkill> studentSkills = new HashSet<>();

    public void addSkill(Skill skill, int score) {
        StudentSkill ss = new StudentSkill(this, skill, score);
        studentSkills.add(ss);
        skill.getStudentSkills().add(ss);
    }

    @OneToMany(mappedBy = "student", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<StudentSubject> studentSubjects = new HashSet<>();

    public void addSubject(Subject subject, int score) {
        StudentSubject ss = new StudentSubject(this, subject, score);
        studentSubjects.add(ss);
        subject.getStudentSubjects().add(ss);
    }

    @OneToMany(mappedBy = "student", cascade = CascadeType.ALL)
    private List<ProjectStudent> projectStudents = new ArrayList<>();

    @OneToMany(mappedBy = "owner", cascade = CascadeType.ALL)
    private Set<Project> ownProjects = new HashSet<>();
}