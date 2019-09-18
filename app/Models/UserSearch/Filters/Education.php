<?php

namespace App\Models\UserSearch\Filters;

use Illuminate\Database\Eloquent\Builder;

/**
 * Class Education
 * Фильтр для поиска по образованию
 * @package App\Models\UserSearch\Filters
 */
class Education implements FilterInterface
{
    public static function apply(Builder $builder, $value)
    {
        return $builder->where('user_educations', 'LIKE', '%' . $value . '%');
    }
}
