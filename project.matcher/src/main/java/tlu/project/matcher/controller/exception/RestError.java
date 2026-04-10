package tlu.project.matcher.controller.exception;

import lombok.Data;

@Data
public class RestError {
    String errorCode;
    String errorMessage;

    public RestError(String errorCode, String errorMessage) {
        super();
        this.errorCode = errorCode;
        this.errorMessage = errorMessage;
    }
}
