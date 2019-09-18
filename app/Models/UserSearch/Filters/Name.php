<?php

namespace App\Models\UserSearch\Filters;

use Illuminate\Database\Eloquent\Builder;

/**
 * Class Name
 * Фильтр для поиска по имени
 * @package App\Models\UserSearch\Filters
 */
class Name implements FilterInterface
{
    public static function apply(Builder $builder, $value)
    {
        return $builder->where('user_name', 'LIKE', '%' . $value . '%');
    }
}
