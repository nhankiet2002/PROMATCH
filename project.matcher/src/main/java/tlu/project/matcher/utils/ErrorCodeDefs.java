package tlu.project.matcher.utils;

public class ErrorCodeDefs {

    private ErrorCodeDefs() {
        throw new IllegalStateException("ErrorCodeDefs class");
    }

    public static String getErrDesc(int errCode) {
        String str = "Lỗi chưa xác định";
        switch (errCode) {
            case UNKNOWN:
                break;

            case INVALID_JWT_SIGNATURE:
                str = "Signature Mã token không hợp lệ";
                break;

            case INVALID_JWT_TOKEN:
                str = "Mã token không hợp lệ";
                break;

            case UNSUPPORTED_JWT_TOKEN:
                str = "Mã token không hợp lệ (ko hỗ trợ)";
                break;

            case JWT_CLAIMS_EMPTY:
                str = "Mã token không hợp lệ (cle)";
                break;

            case UNAUTHORIZED:
                str = "Không có quyền truy cập";
                break;

            case ERR_CODE_OTHER:
                str = "Lỗi ngoại lệ hệ thống. Kiểm tra lại thông tin/báo cho người quản trị để có phương án xử lý.";
                break;

            case ERR_CODE_SERVER_ERROR:
                str = "Lỗi ngoại lệ hệ thống. Kiểm tra lại thông tin/báo cho người quản trị để có phương án xử lý.";
                break;

            case ERR_CODE_OK:
                str = "Thành công.";
                break;

            case ERR_CODE_FAILED:
                str = "Có lỗi xảy ra.";
                break;

            case ERR_CODE_ITEM_NOT_FOUND:
                str = "Không tìm thấy dữ liệu";
                break;

            case ERR_CODE_USER_NOT_FOUND:
                str = "Không tìm thấy tài khoản";
                break;

            case ERR_CODE_PARAMS_INVALID:
                str = "Tham số không hợp lệ";
                break;

            case ERR_CODE_OTP_TIME_OUT:
                str = "Mã OTP hết hạn";
                break;

            case ERR_CODE_PHONE_NUMBER_USED:
                str = "Số điện thoại đã được sử dụng bởi người khác. Kiểm tra lại số điện thoại.";
                break;

            case ERR_CODE_USERNAME_USED:
                str = "Username đã được sử dụng";
                break;

            case ERR_CODE_PASS_WRONG:
                str = "Sai mật khẩu";
                break;

            case ERR_CODE_PASS_LENGTH_INVALID:
                str = "Độ dài mật khẩu không hợp lệ";
                break;

            case ERR_CODE_USER_NOT_CONFIRMED:
                break;

            case ERR_CODE_TOKEN_TIME_OUT:
                str = "Token hết hạn";
                break;

            case ERR_CODE_USER_NOT_ADMIN:
                str = "Tài khoản không có quyền admin";
                break;

            case ERR_CODE_EMAIL_USED:
                str = "Địa chỉ email đã được sử dụng";
                break;

            case ERR_CODE_TRANSACTION_PROCESSING:
                str = "Đang xử lý";
                break;

            case ERR_CODE_PASSWORD_WRONG_THAN_MAX:
                str = "Mật khẩu quá dài";
                break;

            case ERR_CODE_PASSWORD_WRONG:
                str = "Mật khẩu không đúng";
                break;

            case ERR_CODE_PASSWORD_SIMILAR:
                str = "Mật khẩu trùng với mật khẩu cũ";
                break;

            case ERR_CODE_USER_ROLE_NOT_SETUP:
                str = "Tài khoản chưa được thiết lập quyền";
                break;
            case ERR_CODE_USER_UNAUTHORIZED:
                str = "Tài khoản không đủ quyền";
                break;
            case ERR_CODE_INVALID_IMPORT_FILE:
                str = "File import không hợp lệ";
                break;
            case ERR_CODE_SECRET_KEY_NOT_CORRECT:
                str = "Mã bảo mật không đúng";
                break;
            case ERR_CODE_FILE_DATA_NOT_FOUND:
                str = "File không có dữ liệu vui lòng kiểm tra lại";
                break;
            case ERR_CODE_INPUT_INVALID:
                str = "Thông tin không hợp lệ. Kiểm tra lại dữ liệu nhập/Báo người quản trị về thông tin lỗi.";
                break;
            case ERR_CODE_INVALID_FORMAT:
                str = "Định dạng dữ liệu không hợp lệ. Kiểm tra lại dữ liệu nhập/Báo người quản trị về thông tin lỗi.";
                break;
            default:
                break;
        }

        return str;
    }

    public static final int UNKNOWN = -10;
    public static final int INVALID_JWT_SIGNATURE = -100;
    public static final int INVALID_JWT_TOKEN = -101;
    public static final int UNSUPPORTED_JWT_TOKEN = -102;
    public static final int JWT_CLAIMS_EMPTY = -103;
    public static final int UNAUTHORIZED = -104;
    public static final int ERR_CODE_OTHER = -7;
    public static final int ERR_CODE_SERVER_ERROR = -1;
    public static final int ERR_CODE_OK = 0;
    public static final int ERR_CODE_FAILED = 1;
    public static final int ERR_CODE_ITEM_NOT_FOUND = 2;
    public static final int ERR_CODE_USER_NOT_FOUND = 3;
    public static final int ERR_CODE_PARAMS_INVALID = 5;
    public static final int ERR_CODE_OTP_TIME_OUT = 6;
    public static final int ERR_CODE_PHONE_NUMBER_USED = 14;
    public static final int ERR_CODE_USERNAME_USED = 15;
    public static final int ERR_CODE_PASS_WRONG = 16;
    public static final int ERR_CODE_PASS_LENGTH_INVALID = 17;
    public static final int ERR_CODE_USER_NOT_CONFIRMED = 18;
    public static final int ERR_CODE_TOKEN_TIME_OUT = 19;
    public static final int ERR_CODE_USER_NOT_ADMIN = 21;
    public static final int ERR_CODE_EMAIL_USED = 24;
    public static final int ERR_CODE_TRANSACTION_PROCESSING = 25;
    public static final int ERR_CODE_PASSWORD_WRONG_THAN_MAX = 26;
    public static final int ERR_CODE_PASSWORD_WRONG = 27;
    public static final int ERR_CODE_PASSWORD_SIMILAR = 29;
    // user ch?a ???c ph?n quy?n
    public static final int ERR_CODE_USER_ROLE_NOT_SETUP = 30;
    // user kh?ng ?? quy?n
    public static final int ERR_CODE_USER_UNAUTHORIZED = 31;
    // file import không hợp lệ
    public static final int ERR_CODE_INVALID_IMPORT_FILE = 33;
    // mã bảo mật không đúng
    public static final int ERR_CODE_SECRET_KEY_NOT_CORRECT = 35;
    // database exception
    public static final int ERR_CODE_DB_EXCEPTION = 44;
    public static final int ERR_CODE_FILE_DATA_NOT_FOUND = 998;
    public static final int ERR_CODE_INPUT_INVALID = 999;
    public static final int ERR_CODE_INVALID_FORMAT = 1000;
}
