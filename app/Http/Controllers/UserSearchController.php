<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\UserSearch\UserSearch;

class UserSearchController extends Controller
{
    public function filter(Request $request)
    {
        return UserSearch::apply($request);
    }
}
