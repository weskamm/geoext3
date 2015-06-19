Ext.require([
]);

Ext.application({
    name: 'layerlist',
    launch: function() {
        
        
        var me = this,
            data = {};
            data.items = [],
            olMap = new ol.Map({
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
            }),
            mapComponent = Ext.create('GeoExt.component.Map', {
                layout: 'fit',
                map: olMap
            });
        
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
            showMapAfterLayerSelection: false
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
