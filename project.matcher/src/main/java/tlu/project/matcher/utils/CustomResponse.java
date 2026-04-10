package tlu.project.matcher.utils;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@ToString(callSuper = true)
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
public class CustomResponse extends BaseResponse {
    public void setSuccess(Object data) {
        super.setSuccess();
        this.data = data;
    }

    private Object data;
}
