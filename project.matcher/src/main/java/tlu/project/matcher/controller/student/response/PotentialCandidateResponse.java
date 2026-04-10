package tlu.project.matcher.controller.student.response;

import lombok.Data;

import java.util.List;

@Data
public class PotentialCandidateResponse {
    private List<StudentProfileResponse> students;
    private double threshold;
}
