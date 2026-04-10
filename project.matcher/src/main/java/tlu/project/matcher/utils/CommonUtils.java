package tlu.project.matcher.utils;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.Collection;
import java.util.Map;

public class CommonUtils {
    private static final String ALPHABET = "0123456789abcdefghijklmnopqrstuvwxyz";
    private static final SecureRandom random = new SecureRandom();

    public static String generateKey(int length) {
        try {
            StringBuilder sb = new StringBuilder(length);
            for (int i = 0; i < length; i++) {
                int index = random.nextInt(ALPHABET.length());
                sb.append(ALPHABET.charAt(index));
            }
            return sb.toString();
        } catch (Exception e) {
            return "genKeyER";
        }
    }

    public static String generateKey() {
        return generateKey(4);
    }

    public static String generateKey(String name) {
        return generateKey(4) + "_" + name;
    }

    public static String generateKey(String name, int length) {
        return generateKey(length) + "_" + name;
    }

    public static String buildHashBySHA256(String input) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");

            byte[] encodedHash = digest.digest(input.getBytes(StandardCharsets.UTF_8));

            StringBuilder hexString = new StringBuilder(2 * encodedHash.length);
            for (byte b : encodedHash) {
                String hex = Integer.toHexString(0xff & b);
                if (hex.length() == 1) {
                    hexString.append('0');
                }
                hexString.append(hex);
            }
            return hexString.toString();
        } catch (NoSuchAlgorithmException e) {
            return null;
        }
    }

    /**
     * Check Null or Empty
     */
    public static boolean isNullOrEmpty(Object o) {
        if (o == null) {
            return true;
        } else {
            if (o instanceof String) {
                return ((String) o).trim().isEmpty();
            }
            if (o instanceof Collection) {
                return ((Collection<?>) o).isEmpty();
            }
            if (o instanceof Map) {
                return ((Map<?, ?>) o).isEmpty();
            }
            return false;
        }
    }

    /**
     * Check Null or Empty
     */
    public static boolean isNullOrEmpty(Object... lstObject) {
        if (lstObject.length == 0) {
            return true;
        } else {
            for (Object o : lstObject) {
                if (isNullOrEmpty(o)) return true;
            }
        }
        return false;
    }

    /**
     * Check Null or Empty
     */
    public static boolean isAllNullOrEmpty(Object... lstObject) {
        if (lstObject.length == 0) {
            return true;
        } else {
            boolean isNull = true;
            for (Object o : lstObject) {
                if (!isNullOrEmpty(o)) isNull = false;
            }
            return isNull;
        }
    }

    public static Integer parseFromString(String input) {
        try {
            return Integer.parseInt(input);
        } catch (Exception e) {
            return 0;
        }
    }
}
