package tlu.project.matcher.utils;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class BaseResponse {
    protected int error;
    protected String message;

    public BaseResponse() {
        error = ErrorCodeDefs.UNKNOWN;
        message = "Unknown Error!";
    }

    public void setSuccess() {
        this.error = ErrorCodeDefs.ERR_CODE_OK;
        this.message = "Success!";
    }

    public void setFailed(String msg) {
        this.error = ErrorCodeDefs.ERR_CODE_FAILED;
        this.message = msg;
    }

    public void setFailed(int code, String msg) {
        this.error = code;
        this.message = msg;
    }

    public void setFailed(int code) {
        this.error = code;
        this.message = ErrorCodeDefs.getErrDesc(code);
    }

    public void setFailed() {
        this.setFailed("Failed!");
    }

    public void setParamsInvalid() {
        this.setFailed(ErrorCodeDefs.ERR_CODE_PARAMS_INVALID, "Invalid Params!");
    }

    public void setServerError() {
        this.setFailed(ErrorCodeDefs.ERR_CODE_SERVER_ERROR, "Internal Server Error!");
    }

}
