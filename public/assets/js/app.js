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

/**
* Reads CSRF token from COOKIES
*/
Ext.require(["Ext.util.Cookies", "Ext.Ajax"], function(){
    // Add csrf token to every ajax request
    var token = Ext.util.Cookies.get('XSRF-TOKEN');
    if(!token){
        Ext.Error.raise("Missing csrftoken cookie");
    } else {
        Ext.Ajax.defaultHeaders = Ext.apply(Ext.Ajax.defaultHeaders || {}, {
            'X-XSRF-TOKEN': token
        });
        //Ext.util.Cookies.set('X-XSRF-TOKEN', token);
    }
});

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
        name: 'user_educations',
    }, {
        name: 'user_cities',
    }]
});

Ext.onReady(function () {

    var url = '/users';

    var cityStore = Ext.create('Ext.data.Store', {
        autoload: true,
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
        listeners: {
            'beforeselect': function(combo, rec, indx) {
                let selModel = grid.getSelectionModel();
                let rowData = selModel.getSelection()[0].data;
                let newCityId = rec.data.id;
                let userId = rowData.user_id;
                let params = {
                    'city_id': newCityId
                };
                Ext.Ajax.request({
                    url: 'users/update/' + userId,
                    method: 'PUT',
                    params: params,
                    success: function(response, opts) {
                        var obj = Ext.decode(response.responseText);
                        console.dir(obj);
                        combo.collapse();
                        //selModel.clearSelections();
                        userStore.load();
                    },
                    failure: function(response, opts) {
                        console.log('server-side failure with status code ' + response.status);
                    }
                });
                return false;
            },
        },
    });

    //var educationStore = new Ext.data.SimpleStore({
    var educationStore = Ext.create('Ext.data.Store', {
        autoload: true,
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
        listeners: {
            'beforeselect': function(combo, rec, indx) {
                let selModel = grid.getSelectionModel();
                let rowData = selModel.getSelection()[0].data;
                let newEducationId = rec.data.id;
                let userId = rowData.user_id;
                let params = {
                    'education_id': newEducationId
                };
                Ext.Ajax.request({
                    url: 'users/update/' + userId,
                    method: 'PUT',
                    params: params,
                    success: function(response, opts) {
                        var obj = Ext.decode(response.responseText);
                        console.dir(obj);
                        combo.collapse();
                        userStore.load();
                    },
                    failure: function(response, opts) {
                        console.log('server-side failure with status code ' + response.status);
                    }
                });
                return false;
            },
        },
    });

    var userStore = Ext.create('Ext.data.JsonStore', {
        // store configs
        autoload: true,
        autoDestroy: true,
        autoSync: true,
        model: 'User',
        proxy: {
            type: 'rest',
            url: url,
            actionMethods: {
                read: 'GET',
                update: 'PUT',
                /*create: 'POST',
                destroy: 'DELETE'*/
            },
            api: {
                read: url,
                update: url + '/update',
            },
            reader: {
                type: 'json',
                root: 'data',
                totalProperty: 'total',
                idProperty: 'user_id',
            },
            writer: {
                type: 'json',
                writeAllFields: true,
                encode: true,
                root: 'data',
            },
        },
        remoteSort: false,
        sorters: [{
            property: 'user_name',
            direction: 'ASC'
        }],
        pageSize: 50,
        /*listeners: {
            'datachanged': function(e) {
                console.log(e);
                Ext.MessageBox.alert('Alert box', 'datachanged event is called');
            },
            'updated': function(e) {
                console.log(e);
                Ext.MessageBox.alert('Alert box', 'updated event is called');
            },
        },*/
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
            },
            {
                type: 'list',
                dataIndex: 'city_id',
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
                dataIndex: 'user_educations',
                editor: educationCombo,
                flex: 1,
            },
            {
                header: 'Город',
                dataIndex: 'user_cities',
                editor: cityCombo,
                flex: 1,
            },
        ];

        return columns.slice(start || 0, finish);
    }

    // Main grid
    var grid = Ext.create('Ext.grid.Panel', {
        title: 'Данные пользователей: имя, образование (1 или несколько), город (1 или несколько)',
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
        loadMask: true,
        features: [filters],
        dockedItems: [Ext.create('Ext.toolbar.Paging', {
            dock: 'bottom',
            store: userStore,
        })],
        emptyText: 'No Matching Records',
        listeners: {
            edit: function(editor, e) {
                console.log('Edit event fired');
                //e.record.commit();
            }
        }
    });

    // add some buttons to bottom toolbar just for demonstration purposes
    grid.child('pagingtoolbar').add([
        '->',
        /*{
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
        },*/
        /*{
            text: 'Save changes',
            tooltip: 'Save changes to server',
            handler: function(button, state) {
                //
            },
        },*/
        /*{
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
        },*/
        /*{
            text: 'Показать данные фильтра',
            tooltip: 'Get Filter Data for Grid',
            handler: function () {
                var data = Ext.encode(grid.filters.getFilterData());
                Ext.Msg.alert('All Filter Data',data);
            }
        },*/{
            text: 'Очистить данные фильтра',
            handler: function () {
                grid.filters.clearFilters();
            }
        },
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
