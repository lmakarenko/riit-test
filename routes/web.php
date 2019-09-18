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
/**
 * Маршрут для индексной страницы
 */
Route::get('/', function () {
    return view('index');
});
/**
 * Маршрут для ресурса городов
 */
Route::get('cities', 'CityController@index');
/**
 * Маршрут для ресурса образования
 */
Route::get('educations', 'EducationController@index');
/**
 * Маршрут для ресурса пользователей
 */
Route::get('users', 'UserController@index');
/**
 * Маршрут для ресурса пользователей, обновление данных
 */
Route::put('users/update/{id}', 'UserController@update');
/**
 * Маршрут для ресурса пользователей, поиск (фильтрация) данных
 */
Route::get('user-search', 'UserSearchController@filter');
