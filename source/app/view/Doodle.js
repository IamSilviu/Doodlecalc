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
                xtype: 'draw',

                items: [
                    {
                        type: 'path',
                        path: 'M75,75 c0,-25 50,25 50,0 c0,-25 -50,25 -50,0',
                        strokeStyle: 'blue'
                    }       
                ]


            }
        ]
    }
});
