<?php

namespace App\traits;

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
