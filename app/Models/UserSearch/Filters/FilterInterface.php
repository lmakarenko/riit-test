<?php

namespace App\Models\UserSearch\Filters;

use Illuminate\Database\Eloquent\Builder;

/**
 * Interface FilterInterface
 * Интерфейс для фильтров
 * @package App\Models\UserSearch\Filters
 */
interface FilterInterface
{
    /**
     * Добавляет значение поиска к обьекту построителя запросов
     *
     * @param Builder $builder
     * @param mixed $value
     * @return Builder $builder
     */
    public static function apply(Builder $builder, $value);
}

