<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\City;

class CityController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        return [
            'total' => City::all()->count(),
            'data' => City::all()->take(50)->toArray(),
        ];
    }

    public function storeData()
    {
        return City::all()->take(50)->toArray();
    }
}
