package tlu.project.matcher.repository.jpa;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import tlu.project.matcher.domain.Student;

import java.util.List;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {

    @Query(
            value = "SELECT s.* FROM student s\n" +
                    "WHERE \n" +
                    "AND (:facultyId IS NULL OR s.faculty_id = :facultyId)\n" +
                    "AND (:majorId IS NULL OR s.major_id = :majorId)",
            nativeQuery = true
    )
    List<Student> findStudentPage(@Param("facultyId") Long facultyId,
                                  @Param("majorId") Long majorId);

    List<Student> findByIntakeId(Long intakeId);

    List<Student> findByClassId(Long classId);

    List<Student> findByFacultyId(Long facultyId);

    List<Student> findByMajorId(Long majorId);

    List<Student> findByIntakeIdIn(List<Long> intakeIds);

    List<Student> findByClassIdIn(List<Long> classIds);

    List<Student> findByFacultyIdIn(List<Long> facultyIds);

    List<Student> findByMajorIdIn(List<Long> majorIds);
}
