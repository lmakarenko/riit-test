<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Education extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'education';
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
    ];
    public $timestamps = false;
}
