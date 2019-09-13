<?php

use Illuminate\Database\Seeder;

class UserEducationTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('user_education')->insert([
            ['user_id' => 1, 'education_id' => 2],
            ['user_id' => 1, 'education_id' => 3],
            ['user_id' => 2, 'education_id' => 3],
            ['user_id' => 3, 'education_id' => 3],
            ['user_id' => 4, 'education_id' => 4],
            ['user_id' => 5, 'education_id' => 3],
            ['user_id' => 6, 'education_id' => 2],
            ['user_id' => 7, 'education_id' => 3],
            ['user_id' => 8, 'education_id' => 2],
            ['user_id' => 8, 'education_id' => 3],
            ['user_id' => 8, 'education_id' => 4],
            ['user_id' => 9, 'education_id' => 3],
            ['user_id' => 10, 'education_id' => 1],
        ]);
    }
}
