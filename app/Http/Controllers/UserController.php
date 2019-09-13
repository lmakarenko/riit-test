<?php

namespace App\Http\Controllers;

use App\User;
use App\UsersView;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;;
use \Debugbar;

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
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
        $update_status = false;
        $user = User::findOrFail($id);
        try {
            Debugbar::info("START UPDATE USER # {$id}");
            DB::beginTransaction();
            if($request->post('name')) {
                $user->name = $request->post('name');
                $user->save();
            }
            if($request->post('cities_id')) {
                $user->cities()->syncWithoutDetaching($request['cities_id']);
            }
            if($request->post('educations_id')) {
                $user->educations()->syncWithoutDetaching($request['educations_id']);
            }
            DB::commit();
            Debugbar::info("END UPDATE USER # {$id}");
            $update_status = true;
        } catch(\Exception $e) {
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
