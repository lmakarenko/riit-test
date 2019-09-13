<?php

use Illuminate\Database\Seeder;

class EducationTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('education')->insert([
            ['name' => 'Среднее'],
            ['name' => 'Среднее профессиональное образование'],
            ['name' => 'Бакалавриат'],
            ['name' => 'Магистратура'],
        ]);
    }
}
