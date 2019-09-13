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

Ext.define('User', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'user_id',
        type: 'int'
    }, {
        name: 'user_name'
    }, {
        name: 'user_education',
    }, {
        name: 'user_city',
    }]
});

Ext.onReady(function(){

    Ext.ux.ajax.SimManager.init({
        delay: 300,
        defaultSimlet: null
    }).register({
        'myData': {
            data: [
                ['small', 'small'],
                ['medium', 'medium'],
                ['large', 'large'],
                ['extra large', 'extra large']
            ],
            stype: 'json'
        }
    });

    var cityStore = Ext.create('Ext.data.Store', {
        fields: ['id', 'name'],
        proxy: {
            type: 'ajax',
            url: '/city',
        }
    });

    var educationStore = Ext.create('Ext.data.Store', {
        fields: ['id', 'name'],
        proxy: {
            type: 'ajax',
            url: '/education',
        }
    });

    Ext.QuickTips.init();

    // for this demo configure local and remote urls for demo purposes
    var url = {
        local:  'https://extjs.cachefly.net/ext/gpl/4.2.1/examples/grid-filter.json',  // static data file
        remote: '/user'
    };

    // configure whether filter query is encoded or not (initially)
    var encode = false;

    // configure whether filtering is performed locally or remotely (initially)
    var local = false;

    var store = Ext.create('Ext.data.JsonStore', {
        // store configs
        autoDestroy: true,
        model: 'User',
        proxy: {
            type: 'ajax',
            url: (local ? url.local : url.remote),
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

    var filters = {
        ftype: 'filters',
        // encode and local configuration options defined previously for easier reuse
        encode: encode, // json encode the filter query
        local: local,   // defaults to false (remote filtering)

        // Filters are most naturally placed in the column definition, but can also be
        // added here.
        filters: [{
            type: 'string',
            dataIndex: 'name'
        }]
    };

    // use a factory method to reduce code while demonstrating
    // that the GridFilter plugin may be configured with or without
    // the filter types (the filters may be specified on the column model
    var createColumns = function (finish, start) {

        var columns = [{
            dataIndex: 'user_id',
            text: 'ID',
            // instead of specifying filter config just specify filterable=true
            // to use store's field's type property (if type property not
            // explicitly specified in store config it will be 'auto' which
            // GridFilters will assume to be 'StringFilter'
            filterable: true,
            width: 30
            //,filter: {type: 'numeric'}
        }, {
            dataIndex: 'user_name',
            text: 'Имя',
            flex: 1,
            id: 'user_name',
            filter: {
                type: 'string'
                // specify disabled to disable the filter menu
                //, disabled: true
            }
        }, {
            dataIndex: 'user_education',
            text: 'Образование',
            flex: 1,
            filter: {
                //type: 'numeric'  // specify type here or in store fields config
                type: 'list',
                store: educationStore,
            },
        }, {
            dataIndex: 'user_city',
            text: 'Город',
            flex: 1,
            filter: {
                type: 'list',
                store: cityStore,
                //store: optionsStore
                //,phpMode: true
            }
        }];

        return columns.slice(start || 0, finish);
    };

    var grid = Ext.create('Ext.grid.Panel', {
        border: false,
        store: store,
        columns: createColumns(4),
        loadMask: true,
        features: [filters],
        dockedItems: [Ext.create('Ext.toolbar.Paging', {
            dock: 'bottom',
            store: store
        })],
        emptyText: 'No Matching Records'
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
                    newUrl = local ? url.local : url.remote,
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
        },{
            text: 'Add Columns',
            handler: function () {
                if (grid.headerCt.items.length < 6) {
                    grid.headerCt.add(createColumns(6, 4));
                    grid.view.refresh();
                    this.disable();
                }
            }
        }
    ]);

    var win = Ext.create('Ext.Window', {
        title: 'Пользователи',
        height: 400,
        width: 875,
        layout: 'fit',
        items: grid
    }).show();

    store.load();
});
