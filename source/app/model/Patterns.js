Ext.define('DoodleCalc.model.Patterns', {
    extend: 'Ext.data.Model',
	
    config: {
        fields: ['pattern'],
		
		belongsTo: 'DoodleCalc.model.keys'
    }
});