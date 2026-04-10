package tlu.project.matcher.controller.exception;

import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import tlu.project.matcher.utils.BaseResponse;

@ControllerAdvice
@Log4j2
public class GlobalExceptionHandler {
    @ExceptionHandler(Exception.class)
    public ResponseEntity<BaseResponse> handleException(Exception ex) {
        log.info("Exception: ", ex);
        BaseResponse response = new BaseResponse();
        response.setFailed("Error!!!");
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
}
