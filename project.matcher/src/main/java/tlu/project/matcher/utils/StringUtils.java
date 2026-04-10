package tlu.project.matcher.utils;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.SecureRandom;
import java.text.Normalizer;
import java.util.UUID;
import java.util.regex.Pattern;

public class StringUtils {
    public static String sha256(String src) {
        try {
            MessageDigest md = MessageDigest.getInstance("SHA-256");
            md.update(src.getBytes());
            byte byteData[] = md.digest();
            StringBuffer sb = new StringBuffer();
            for (int i = 0; i < byteData.length; i++) {
                sb.append(Integer.toString((byteData[i] & 0xff) + 0x100, 16).substring(1));
            }
            return sb.toString();
        } catch (Exception e) {
            return "";
        }
    }

    private static final SecureRandom random = new SecureRandom();
    private static final String charset = "0123456789abcdefghijklmnopqrstuvwxyz";
    private static final String numberSet = "0123456789";

    public static String generateRandomStringNumberCharacter(int length) {
        char[] buf = new char[length];
        for (int i = 0; i < length; i++) {
            int index = random.nextInt(charset.length());
            buf[i] = charset.charAt(index);
        }
        return new String(buf);
    }

    public static String generateOtp() {
        char[] buf = new char[6];
        for (int i = 0; i < 6; i++) {
            int index = random.nextInt(numberSet.length());
            buf[i] = numberSet.charAt(index);
        }
        return new String(buf);
    }

    private static String randomString(char from, char to, int length) {
        int range = to - from;
        char[] buf = new char[length];
        for (int i = 0; i < buf.length; i++) {
            int index = random.nextInt(range);
            buf[i] = (char) (from + index);
        }
        return new String(buf);
    }

    public static String randomString(int length) {
        return randomString('a', 'z', length);
    }

    public static String randomStringUpper(int length) {
        return randomString('A', 'Z', length);
    }

    public static String generateUUID() {
        return UUID.randomUUID().toString();
    }

    public static String normalizeString(String input) {
        if (CommonUtils.isNullOrEmpty(input)) return "";
        return Normalizer.normalize(input, Normalizer.Form.NFD)
                .replaceAll("[đĐ]", "d")
                .replaceAll("[\n,\t,\r]+", " ")
                .replaceAll("[^\\p{ASCII}]", "")
                .replaceAll("[$&+,:;=?@#|_'<>.^*()%!\\-–—]", " ")
                .toLowerCase();
    }

    public static String encodeFileName(String fileName) throws UnsupportedEncodingException {
        return URLEncoder.encode(fileName, StandardCharsets.UTF_8.name()).replace("+", "%20");
    }

    public static boolean patternMatches(String string, String regexPattern) {
        return Pattern.compile(regexPattern)
                .matcher(string)
                .matches();
    }
}
