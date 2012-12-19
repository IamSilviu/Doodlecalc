Ext.define('DoodleCalc.view.Viewport', {
    extend: 'Ext.tab.Panel',
    xtype: 'viewport',
	
    config: {
        tabBarPosition: 'bottom',

        items: [
            {
                xtype: 'doodle',
                title: 'Doodle',
                iconCls: 'home'
            }
        ]
    }
});
