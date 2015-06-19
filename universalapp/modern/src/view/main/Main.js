/**
 * This class is the main view for the application. It is specified in app.js as
 * the "mainView" property. That setting causes an instance of this class to be
 * created and added to the Viewport container.
 * 
 * TODO - Replace this content of this view to suite the needs of your
 * application.
 */
Ext.define('universalapp.view.main.Main', {
    extend: 'Ext.TabPanel',
    xtype: 'app-main',

    requires: [
        'GeoExt.component.Map',
        'GeoExt.dataview.LayerList',
        'universalapp.Application',
        'GeoExt.data.TreeStore'
    ],
    
    /**
     * 
     */
    fullscreen: true,
    
    /**
     * 
     */
    tabBarPosition: 'bottom',

    /**
     * 
     */
    initialize: function(){
        var me = this,
            mapComponent = universalapp.app.mapcomponent,
            data = {};
            data.items = [];
        
        // TODO: remove these static data collection when gx_treestore and 
        // gx_layerstore have been cleaned up
        var layersArr = mapComponent.getLayers().getArray();
        
        Ext.each(layersArr, function(l) {
            data.items.push({
                name: l.get('name'),
                leaf: true
            });
        });
        
        var store = Ext.create('Ext.data.TreeStore', {
            fields: [
                {
                    name: 'name',
                    type: 'string'
                }
            ],
            defaultRootProperty: 'items',
            root: data
        });
        
        var layerList = Ext.create('GeoExt.dataview.LayerList', {
            store: store,
            displayField: 'name',
            showMapAfterLayerSelection: true
        });
        
        me.callParent(arguments);
        
        me.add([
            {
                title: 'Map',
                layout: 'fit',
                items: [mapComponent]
            }, {
                title: 'Layers',
                layout: 'fit',
                items: [layerList]
            }
        ]);
    }
});