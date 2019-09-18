<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\UserSearch\UserSearch;

/**
 * Class UserSearchController
 * Контроллер для поиска (фильтрации) пользователей
 * @package App\Http\Controllers
 */

class UserSearchController extends Controller
{
    /**
     * Фильтр пользователей
     * @param Request $request
     * @return \Illuminate\Database\Eloquent\Builder[]|\Illuminate\Database\Eloquent\Collection
     */
    public function filter(Request $request)
    {
        return UserSearch::apply($request);
    }
}
