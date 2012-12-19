Ext.define('DoodleCalc.model.Keys', {
    extend: 'Ext.data.Model',
	
    config: {
		data: [0,1,2,3,4,5,6,7,8,9,'.',',','+','-','*','/','='],
        fields: ['key']
    }
});
