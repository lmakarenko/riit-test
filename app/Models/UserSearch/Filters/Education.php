<?php

namespace App\Models\UserSearch\Filters;

use Illuminate\Database\Eloquent\Builder;

class Education implements FilterInterface
{
    /**
     * Apply a given search value to the builder instance.
     *
     * @param Builder $builder
     * @param mixed $value
     * @return Builder $builder
     */
    public static function apply(Builder $builder, $value)
    {
        return $builder->where('education_id', '=', $value);
    }
}
