<?php

use Illuminate\Database\Seeder;

class UserCityTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('user_city')->insert([
            ['user_id' => 1, 'city_id' => 1],
            ['user_id' => 1, 'city_id' => 2],
            ['user_id' => 2, 'city_id' => 1],
            ['user_id' => 2, 'city_id' => 3],
            ['user_id' => 3, 'city_id' => 2],
            ['user_id' => 4, 'city_id' => 2],
            ['user_id' => 5, 'city_id' => 2],
            ['user_id' => 6, 'city_id' => 3],
            ['user_id' => 7, 'city_id' => 4],
            ['user_id' => 8, 'city_id' => 5],
            ['user_id' => 9, 'city_id' => 6],
            ['user_id' => 10, 'city_id' => 7],
        ]);
    }
}
