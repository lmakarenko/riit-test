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
create view if not exists `users_view` as
select
u.id as `user_id`,
e.id as `education_id`,
c.id as `city_id`,
u.name as `user_name`,
e.name as `user_education`,
c.name as `user_city`
from
`users` u
join `user_education` ue on ue.user_id = u.id
join `user_city` uc on uc.user_id = u.id
join `city` c on c.id = uc.city_id
join `education` e on e.id = ue.education_id;
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
