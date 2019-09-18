<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

class CreateUsersView extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::statement($this->dropView());
        DB::statement($this->createView());
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::statement($this->dropView());
    }

    /**
     * Returns SQL for create user_view
     * @return string
     */
    protected function createView()
    {
        return <<<SQL
CREATE VIEW if NOT EXISTS `users_view` as
SELECT
t.user_id as user_id,
t.user_name as user_name,
group_concat(t.city_name) user_cities,
group_concat(t.education_name) user_educations
FROM
(
select
u.id as user_id,
u.name as user_name,
c.name as city_name,
null as education_name
FROM
users u
JOIN user_city uc on u.id = uc.user_id
JOIN city c on c.id = uc.city_id

UNION ALL

select
u.id as user_id,
u.name as user_name,
null as city_name,
e.name as education_name
FROM
users u
JOIN user_education ue on u.id = ue.user_id
JOIN education e on e.id = ue.education_id
) as t
GROUP BY t.user_id;
SQL;
    }

    /**
     * Returns SQL for delete user_view
     * @return string
     */
    protected function dropView()
    {
        return <<<SQL
drop view if exists `users_view`;
SQL;
    }
}
