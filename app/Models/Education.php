<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Education
 * Модель для работы со справочником об образовании
 * @package App\Models
 */
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
    /**
     * Record timestamps
     * @var bool
     */
    public $timestamps = false;
}
