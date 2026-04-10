package tlu.project.matcher.utils;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Locale;
import java.util.TimeZone;

public class DateTime {
    public final String value;
    public final LocalDateTime localDateTime;
    private static final String pattern = "HH:mm:ss dd-MM-yyyy";

    public DateTime() {
        final LocalDateTime time = LocalDateTime.now();
        this.localDateTime = time;
        this.value = DateTimeFormatter.ofPattern(pattern, Locale.ENGLISH)
                .format(time);
    }

    private DateTime(String value) {
        this.value = value;
        this.localDateTime = LocalDateTime.parse(value, DateTimeFormatter.ofPattern(pattern, Locale.ENGLISH));
    }

    private DateTime(long timestamp) {
        this.localDateTime = LocalDateTime.ofInstant(
                Instant.ofEpochMilli(timestamp),
                TimeZone.getDefault().toZoneId()
        );
        this.value = DateTimeFormatter.ofPattern(pattern, Locale.ENGLISH)
                .format(this.localDateTime);
    }

    public static String parseString(String dateTime) {
        if (dateTime == null)
            return null;
        try {
            LocalDateTime.parse(dateTime, DateTimeFormatter.ofPattern(pattern, Locale.ENGLISH));
            return dateTime;
        } catch (Exception e) {
            return null;
        }
    }

    public static String parseTimestamp(long timestamp) {
        if (timestamp <= 0) {
            return "";
        }
        return new DateTime(timestamp).value;
    }

    public boolean isBefore(DateTime that) {
        return localDateTime.isBefore(that.localDateTime);
    }

    @Override
    public String toString() {
        return value;
    }
}
