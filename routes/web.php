<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('index');
});
// Маршруты для REST-контроллера пользователей
/*Route::resource('user', 'UserController')->only([
    'index', 'update'
]);*/
Route::get('cities', 'CityController@index');
Route::get('cities/store-data', 'CityController@storeData');
Route::get('educations', 'EducationController@index');
Route::get('users', 'UserController@index');
//Route::get('users/update/{id}', 'UserController@update');

//Route::post('users/update', 'UserController@update');
Route::put('users/update/{id}', 'UserController@update');
//Route::group(['middleware' => 'api'], function () {
    Route::get('user-search', 'UserSearchController@filter');
//});
