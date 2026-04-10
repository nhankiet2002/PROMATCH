package tlu.project.matcher.utils;

import java.io.File;

public class AppUtils {
    private AppUtils() {}

    public static final long _60_DAYS_IN_MILLISECONDS = 5184000000L;
    public static final long _30_DAYS_IN_MILLISECONDS = 2592000000L;
    public static final long _1_DAY_IN_MILLISECONDS = 86400000L;
    public static final long _6_HOUR_IN_MILLISECONDS = 6 * 3600000;
    public static final long _12_HOUR_IN_MILLISECONDS = 12 * 3600000;
    public static final long _18_HOUR_IN_MILLISECONDS = 18 * 3600000;
    public static final String SEPARATOR_CHAR = String.valueOf(File.separatorChar);
}
