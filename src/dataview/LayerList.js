/**
 * An Ext.tree.Panel.
 *
 * Example: TODO
 *
 * @class GeoExt.dataview.LayerList
 */
Ext.define('GeoExt.dataview.LayerList', {
    extend: 'Ext.dataview.NestedList',
    alias: [
        "widget.gx_layerlist",
        "widget.gx_layer_list"
    ],
    
    /**
     * 
     */
    map: null,
    
    /**
     * 
     */
    store: null,
    
    /**
     * 
     */
    displayField: null,
    
    /**
     * 
     */
    showMapAfterLayerSelection: false,

    /**
     * 
     */
    initComponent: function() {
        var me = this;
        
        me.callParent();
        
        me.on("leafitemtap", function(scope, list, index, target, record) {
            var layerName = record.get('name'),
                layer,
                layerArr = mapComponent.getMap().getLayers().getArray();
            
            Ext.each(layerArr, function(l) {
                if (l.get('name') === layerName) {
                    layer = l;
                    return false;
                }
            });
            if (Ext.isDefined(layer)) {
                // toggle the visibility
                layer.setVisible(!layer.getVisible());
            }
            
            // now show the map again
            if (me.showMapAfterLayerSelection) {
                // TODO: implement
//                me.setActiveItem(0);
            }
            
        });
    }
});
