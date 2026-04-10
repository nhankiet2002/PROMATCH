package tlu.project.matcher.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "student_skill")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class StudentSkill {
    @EmbeddedId
    private StudentSkillId id;

    @ManyToOne
    @MapsId("studentId")
    private Student student;

    @ManyToOne
    @MapsId("skillId")
    private Skill skill;

    private int score;

    public StudentSkill(Student student, Skill skill, int score) {
        this.student = student;
        this.skill = skill;
        this.score = score;
        this.id = new StudentSkillId(student.getId(), skill.getId());
    }
}
