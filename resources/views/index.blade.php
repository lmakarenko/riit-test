<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Laravel & Ext JS - Пользователи</title>

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet">

        <!-- Styles -->
        <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/extjs/4.2.1/resources/css/ext-all.css" />
        <!--<link rel="stylesheet" type="text/css" href="{{ asset('/assets/css/example.css') }}" />
        <link rel="stylesheet" type="text/css" href="{{ asset('/assets/css/ux/grid/GridFilters.css') }}" />
        <link rel="stylesheet" type="text/css" href="{{ asset('/assets/css/ux/grid/RangeMenu.css') }}" />-->
        <!-- ExtJS -->
        <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/extjs/4.2.1/ext-all.min.js"></script>
        <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/extjs/4.2.1/locale/ext-lang-ru.min.js"></script>
        <!--<script type="text/javascript" src="{{ asset('/assets/js/extjs/grid-filtering/grid-filter-local.js') }}"></script>-->
        <script type="text/javascript" src="{{ asset('/assets/js/app.js') }}"></script>

    </head>
    <body>
        <div class="flex-center position-ref full-height">

            <div class="content">

                <div id="grid-example" style="margin: 10px;"></div>

            </div>
        </div>
    </body>
</html>
