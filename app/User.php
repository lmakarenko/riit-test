<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    /**
     * The attributes that aren't mass assignable.
     *
     * @var array
     */
    protected $guarded = ['id'];

    /**
     * Cities that belongs to user
     */
    public function cities()
    {
        return $this->belongsToMany(
            'App\City',
            'user_city',
            'user_id',
            'city_id'
        );
    }

    /**
     * Educations that belongs to user
     */
    public function educations()
    {
        return $this->belongsToMany(
            'App\Education',
            'user_education',
            'user_id',
            'education_id'
        );
    }

}
