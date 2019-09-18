<?php

namespace App\traits;

/**
 * Trait ReadOnlyModelTrait
 * Функционал для Eloquent моделей "только для чтения", например для представлений (БД),
 * запрещающий операции обновления, вставки и удаления модели
 * @package App\traits
 */
trait ReadOnlyModelTrait
{
    /**
     * Make model readonly
     */
    public static function boot()
    {
        parent::boot();
        static::saving(function () {
            return false;
        });
        static::deleting(function () {
            return false;
        });
    }
}
