<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\traits\ReadOnlyModelTrait;

/**
 * Class UsersView
 * Модель для работы с представлением (БД) users_view
 * Eloquent model for users_view
 * @package App
 */
class UsersView extends Model
{
    /**
     * Readonly model cause of view
     */
    use ReadOnlyModelTrait;
    /**
     * The view associated with the model.
     *
     * @var string
     */
    protected $table = 'users_view';
}
