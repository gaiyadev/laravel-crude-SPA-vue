<?php

use Illuminate\Support\Facades\Route;

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
    return view('welcome');
});

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
Route::post('api/post', 'PostController@store');
Route::get('api/post', 'PostController@getPosts');
Route::delete('api/post/{id}', 'PostController@destroy');
Route::put('api/post/{id}', 'PostController@update');
