<?php

namespace App\Models\UserSearch\Filters;

use Illuminate\Database\Eloquent\Builder;

/**
 * Class City
 * Фильтр для поиска по городу
 * @package App\Models\UserSearch\Filters
 */
class City implements FilterInterface
{
    public static function apply(Builder $builder, $value)
    {
        return $builder->where('user_cities', 'LIKE', '%' . $value . '%');
    }
}
