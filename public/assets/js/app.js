Ext.Loader.setConfig({enabled: true});
//Ext.Loader.setPath('Ext.ux', '../ux');
Ext.Loader.setPath({
    'Ext.ux': 'https://extjs.cachefly.net/ext/gpl/4.2.1/examples/ux'
});
Ext.require([
    'Ext.grid.*',
    'Ext.data.*',
    'Ext.ux.grid.FiltersFeature',
    'Ext.toolbar.Paging',
    'Ext.ux.ajax.JsonSimlet',
    'Ext.ux.ajax.SimManager'
]);

/* Models */

Ext.define('City', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'id',
        type: 'int'
    }, {
        name: 'name',
    }]
});

Ext.define('Education', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'id',
        type: 'int'
    }, {
        name: 'name',
    }]
});

Ext.define('User', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'user_id',
        type: 'int'
    }, {
        name: 'city_id',
    }, {
        name: 'education_id',
    }, {
        name: 'user_name'
    }, {
        name: 'user_education',
    }, {
        name: 'user_city',
    }]
});

Ext.onReady(function () {

    var url = '/users';

    var userStore = Ext.create('Ext.data.JsonStore', {
        // store configs
        autoDestroy: true,
        model: 'User',
        proxy: {
            type: 'ajax',
            url: url,
            reader: {
                type: 'json',
                root: 'data',
                idProperty: 'user_id',
                totalProperty: 'total'
            }
        },
        remoteSort: false,
        sorters: [{
            property: 'user_name',
            direction: 'ASC'
        }],
        pageSize: 50
    });

    var cityStore = Ext.create('Ext.data.Store', {
        autoDestroy: true,
        model: 'City',
        proxy: {
            type: 'ajax',
            url: '/cities',
            reader: {
                type: 'json',
                root: 'data',
                idProperty: 'id',
                totalProperty: 'total'
            }
        }
    });
    // city combobox
    var cityCombo = new Ext.form.ComboBox({
        store: cityStore,
        valueField: 'id',
        displayField: 'name',
    });

    //var educationStore = new Ext.data.SimpleStore({
    var educationStore = Ext.create('Ext.data.Store', {
        autoDestroy: true,
        model: 'Education',
        proxy: {
            type: 'ajax',
            url: '/educations',
            reader: {
                type: 'json',
                root: 'data',
                idProperty: 'id',
                totalProperty: 'total'
            }
        },
    });
    // education combobox
    var educationCombo = new Ext.form.ComboBox({
        store: educationStore,
        valueField: 'id',
        displayField: 'name',
    });

    // configure whether filter query is encoded or not (initially)
    var encode = false;

    // configure whether filtering is performed locally or remotely (initially)
    var local = true;

    var filters = {
        ftype: 'filters',
        // encode and local configuration options defined previously for easier reuse
        encode: encode, // json encode the filter query
        local: local,   // defaults to false (remote filtering)
        // Filters are most naturally placed in the column definition, but can also be
        // added here.
        filters: [
            {
                type: 'string',
                dataIndex: 'user_name',
            },
            {
                type: 'list',
                dataIndex: 'education_id',
                labelField: 'name',
                store: educationStore,
            },
            {
                type: 'list',
                dataIndex: 'city_id',
                labelField: 'name',
                store: cityStore,
            },
        ],
    };

    /**
    * Use a factory method to reduce code while demonstrating
    * that the GridFilter plugin may be configured with or without
    * the filter types (the filters may be specified on the column model
    * */
    function create_columns(finish, start)
    {

        var columns = [
            {
                header: 'ID',
                dataIndex: 'user_id',
                width: 30,
                filterable: true,
            },
            {
                header: 'Имя',
                dataIndex: 'user_name',
                flex: 1,
            },
            {
                header: 'Образование',
                dataIndex: 'education_id',
                renderer: function(id) {
                    var idx = educationStore.find('id', id);
                    var rec = educationStore.getAt(idx);
                    return rec.get('name');
                },
                editor: educationCombo,
                flex: 1,
            },
            {
                header: 'Город',
                dataIndex: 'city_id',
                renderer: function(id) {
                    var idx = cityStore.find('id', id);
                    var rec = cityStore.getAt(idx);
                    return rec.get('name');
                },
                editor: cityCombo,
                flex: 1,
                //editable: false,
            }
        ];

        return columns.slice(start || 0, finish);
    }

    // Main grid
    var grid = Ext.create('Ext.grid.Panel', {
        title: 'Пользователи',
        store: userStore,
        columns: create_columns(4),
        selType: 'cellmodel',
        plugins: [
            Ext.create('Ext.grid.plugin.CellEditing', {
                clicksToEdit: 1
            })
        ],
        //height: 300,
        //width: 600,
        renderTo: Ext.getBody(),
        //
        loadMask: true,
        features: [filters],
        dockedItems: [Ext.create('Ext.toolbar.Paging', {
            dock: 'bottom',
            store: userStore,
        })],
        emptyText: 'No Matching Records',
    });

    // add some buttons to bottom toolbar just for demonstration purposes
    grid.child('pagingtoolbar').add([
        '->',
        {
            text: 'Encode: ' + (encode ? 'On' : 'Off'),
            tooltip: 'Toggle Filter encoding on/off',
            enableToggle: true,
            handler: function (button, state) {
                var encode = (grid.filters.encode !== true);
                var text = 'Encode: ' + (encode ? 'On' : 'Off');
                grid.filters.encode = encode;
                grid.filters.reload();
                button.setText(text);
            }
        },
        {
            text: 'Local Filtering: ' + (local ? 'On' : 'Off'),
            tooltip: 'Toggle Filtering between remote/local',
            enableToggle: true,
            handler: function (button, state) {
                var local = (grid.filters.local !== true),
                    text = 'Local Filtering: ' + (local ? 'On' : 'Off'),
                    newUrl = url,
                    store = grid.view.getStore();

                // update the GridFilter setting
                grid.filters.local = local;
                // bind the store again so GridFilters is listening to appropriate store event
                grid.filters.bindStore(store);
                // update the url for the proxy
                store.proxy.url = newUrl;

                button.setText(text);
                store.load();
            }
        },
        {
            text: 'All Filter Data',
            tooltip: 'Get Filter Data for Grid',
            handler: function () {
                var data = Ext.encode(grid.filters.getFilterData());
                Ext.Msg.alert('All Filter Data',data);
            }
        },{
            text: 'Clear Filter Data',
            handler: function () {
                grid.filters.clearFilters();
            }
        },/*{
            text: 'Add Columns',
            handler: function () {
                if (grid.headerCt.items.length < 6) {
                    grid.headerCt.add(createColumns(6, 4));
                    grid.view.refresh();
                    this.disable();
                }
            }
        }*/
    ]);

    var win = Ext.create('Ext.Window', {
        title: 'Пользователи',
        height: 400,
        width: 875,
        layout: 'fit',
        items: grid
    }).show();

    //
    cityStore.load();
    educationStore.load();
    userStore.load();

});
