Ext.define('DoodleCalc.view.Viewport', {
    extend: 'Ext.Panel',
    xtype: 'viewport',
	
    config: {
		
		layout: 'fit',
        items: [
			{
				xtype: 'tools'
			},
            {
                xtype: 'doodle'
            },{
				xtype: 'panel',
				docked: 'top',
				width: 100,
				height: 100,
				html: ['<svg xmlns="http://www.w3.org/2000/svg" x="5" y="5" width="100" height="100" viewBox="-.5 -.5 3 3">'
							,'<path id="ps" fill="none" stroke="black" d="M0,0 L1,0 L1,1 L0,2 L1,2 L2,2" stroke-width="0.1"/>'
						,'</svg>'].join('')
			 
			 /*
				html: ['<table border="1" bordercolor="#FFCC00" style="background-color:#FFFFCC" width="100" height="100" cellpadding="3" cellspacing="1">',
						,'<tr>'
							,'<td id="xy-00"> </td>'
							,'<td id="xy-10"> </td>'
							,'<td id="xy-20"> </td>'
						,'</tr>'
						,'<tr>'
							,'<td id="xy-01"> </td>'
							,'<td id="xy-11"> </td>'
							,'<td id="xy-21"> </td>'
						,'</tr>'
						,'<tr>'
							,'<td  id="xy-02"> </td>'
							,'<td id="xy-12"> </td>'
							,'<td id="xy-22"> </td>'
						,'</tr>'
					,'</table>'].join('\n')
					
					*/
			
			}
        ]
    }
});
