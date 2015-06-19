/**
 * The main application class. An instance of this class is created by app.js when it
 * calls Ext.application(). This is the ideal place to handle application launch and
 * initialization details.
 */
Ext.define('universalapp.Application', {
    extend: 'Ext.app.Application',
    
    name: 'universalapp',

    requires: [ 
        'GeoExt.component.Map'
    ],
    
    stores: [
        // TODO: add global / shared stores here
    ],
    
    mapcomponent: null,
    
    onBeforeLaunch: function () {
        var me = this;
      
        var olMap = new ol.Map({
            layers: [
                new ol.layer.Tile({
                    source: new ol.source.Stamen({
                        layer: 'watercolor'
                    }),
                    name: 'watercolor'
                }),
                new ol.layer.Tile({
                    source: new ol.source.Stamen({
                        layer: 'terrain-labels'
                    }),
                    name: 'terrain-labels'
                })
             ],
             view: new ol.View({
                 center: ol.proj.fromLonLat( [-122.416667, 37.783333] ),
                 zoom: 12
             })
        });

        me.mapcomponent = Ext.create('GeoExt.component.Map', {
            layout: 'fit',
            map: olMap
        });
        
        me.callParent(arguments);
    },
    
    launch: function () {
        console.log('Application launch');
    },

    onAppUpdate: function () {
        Ext.Msg.confirm('Application Update', 'This application has an update, reload?',
            function (choice) {
                if (choice === 'yes') {
                    window.location.reload();
                }
            }
        );
    }
});