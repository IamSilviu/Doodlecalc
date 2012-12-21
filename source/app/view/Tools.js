Ext.define('DoodleCalc.view.Tools', {
    extend: 'Ext.Toolbar',
    xtype: 'tools',
	
    config: {
		docked: 'bottom',
		
		items: [{
			iconCls: 'trash',
			iconMask: 'true',
			iconAlign: 'top',
			action: 'clearDraw'
		}]
	}
});
