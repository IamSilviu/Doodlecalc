/* 
 * Doodle Canvas
 */

Ext.define('DoodleCalc.view.Doodle',{
    extend: 'Ext.Panel',
    xtype: 'doodle',
    
    config : {
	
        layout: 'fit',
		
        items: [
            {
                xtype: 'draw'
            }
        ]
    }
});
