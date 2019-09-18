<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\UsersView;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Exception;
use Debugbar;

class UserController extends Controller
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
            'total' => UsersView::all()->count(),
            'data' => UsersView::all()->take(50)->toArray(),
        ];
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
        $update_status = false;
        try {
            $user = User::findOrFail($id);
            Debugbar::info("START UPDATE USER # {$id}");
            DB::beginTransaction();
            if($request->has('name')) {
                $user->name = $request->input('name');
                $user->save();
                Debugbar::info("NEW USER name = {$user->name}");
            }
            if($request->has('city_id')) {
                $city_id = $request->input('city_id');
                $user->cities()->syncWithoutDetaching($city_id);
                Debugbar::info("NEW USER city_id = {$city_id}");
            }
            if($request->has('education_id')) {
                $education_id = $request->input('education_id');
                $user->educations()->syncWithoutDetaching($education_id);
                Debugbar::info("NEW USER education_id = {$education_id}");
            }
            DB::commit();
            Debugbar::info("END UPDATE USER # {$id}");
            $update_status = true;
        } catch(Exception $e) {
            DB::rollback();
            Debugbar::error("ERROR UPDATING USER # {$id} : " . $e->getMessage());
            Debugbar::addThrowable($e);
            $update_status = false;
        }
        return [
            'status' => $update_status,
        ];
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
