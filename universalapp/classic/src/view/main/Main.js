/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting automatically applies the "viewport"
 * plugin causing this view to become the body element (i.e., the viewport).
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('universalapp.view.main.Main', {
    extend: 'Ext.panel.Panel',
    xtype: 'app-main',

    requires: [
        'Ext.plugin.Viewport',
        'Ext.window.MessageBox',
        'universalapp.Application',
        'GeoExt.tree.Panel',
        'GeoExt.data.TreeStore'
    ],

    layout: 'border',
    
    initComponent: function(){
       var me = this,
           mapComponent = universalapp.app.mapcomponent,
           map = mapComponent.getMap();
       
       var treeStore = Ext.create('GeoExt.data.TreeStore', {
           layerStore: mapComponent.getStore()
       });

       var treePanel = Ext.create('GeoExt.tree.Panel', {
           title: 'GeoExt.tree.Panel Example',
           store: treeStore,
           rootVisible: false,
           region: 'west',
           width: 200
       });

       me.items = [{
           xtype: 'panel',
           title: 'Map',
           layout: 'fit',
           region: 'center',
           items: [mapComponent]
       },
           treePanel
       ];
       
       me.callParent(arguments);
    }
});