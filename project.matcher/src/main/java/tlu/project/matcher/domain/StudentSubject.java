package tlu.project.matcher.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "student_subject")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class StudentSubject {
    @EmbeddedId
    private StudentSubjectId id;

    @ManyToOne
    @MapsId("studentId")
    private Student student;

    @ManyToOne
    @MapsId("subjectId")
    private Subject subject;

    private int score;

    public StudentSubject(Student student, Subject subject, int score) {
        this.student = student;
        this.subject = subject;
        this.score = score;
        this.id = new StudentSubjectId(student.getId(), subject.getId());
    }
}
