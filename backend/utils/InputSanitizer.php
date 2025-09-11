<?php

namespace utils;

class InputSanitizer
{

    public static function sanitizeString($string): string
    {
        return trim(htmlspecialchars($string));
    }

    public static function sanitizeArray(array $array): array
    {
        $sanitizedArray = [];
        foreach ($array as $key => $value) {
            $sanitizedArray[$key] = self::sanitizeString($value) ?? '';
        }

        return $sanitizedArray;
    }
}