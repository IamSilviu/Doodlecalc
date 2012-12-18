Ext.define('DoodleCalc.view.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'main',
    requires: [
        'Ext.TitleBar'
    ],
    config: {
        tabBarPosition: 'bottom',

        items: [
            {
                xtype: 'Doodle',
                title: 'Doodle',
                iconCls: 'home'
            }
        ]
    }
});
