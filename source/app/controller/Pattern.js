Ext.define('DoodleCalc.controller.Pattern', {
    extend: 'Ext.app.Controller',
    
    config: {
        refs: {
            
        },
        control: {
            
        }
    },
    
    //called when the Application is launched, remove if not needed
    launch: function(app) {
        
    },
	
	pattern: function(points){
        var l = this.findLeft(points).x;
        var r = this.findRight(points).x;
        var t = this.findTop(points).y;
        var b = this.findBottom(points).y;
        if((t-b)*3 < (r-l)){
            t = b + (r-l);
        }
        if((r-l)*3 < (t-b)){
            r = l + (t-b);
        }
        var c1 = l + (r-l)/3;
        var c2 = l + (r-l)*(2/3);
        var r1 = b + (t-b)/3;
        var r2 = b + (t-b)*(2/3);
        var pts = [];
        for(var i=0;i<points.length;i++){
            
			var p = points[i];

            if(p.x < c1){
                p.x = 0;
            }else if(p.x<c2){
                p.x = 1;
            }else{
                p.x = 2;
            }
            if(p.y < r1){
                p.y = 0;
            }else if(p.y < r2){
                p.y = 1;
            }else{
                p.y = 2;
            }
            if(i>0){				
			
			   if(!((pts[pts.length-1].x == p.x) && (pts[pts.length-1].y == p.y))){
                    pts.push(p);
                }
				
            }else{
                pts.push(p);
            }
        }
        return pts;
    },
	
	findTop: function(points){
        var top = points[0];
        for(var i=1;i<points.length;i++){
            if(top.y < points[i].y){
                top = points[i];
            }
        }
        return top;
    },
    
    findBottom: function(points){
        var p = points[0];
        for(var i=1;i<points.length;i++){
            if(p.y > points[i].y){
                p = points[i];
            }
        }
        return p;
    },
    
    findRight: function(points){
        var p = points[0];
        for(var i=1;i<points.length;i++){
            if(p.x < points[i].x){
                p = points[i];
            }
        }
        return p;
    },
    
    findLeft: function(points){
        var p = points[0];
        for(var i=1;i<points.length;i++){
            if(p.x > points[i].x){
                p = points[i];
            }
        }
        return p;
    },
	
	listToPoints: function(list) {
	
		var points = [];
			
		for (var i = 0; i<list.length; i++) {
			
			var xy = { 'x': list[i], 'y': list[i+1]};
			points.push(xy);
			
			i++;
						
		}
		
		return points;
	},
	debug: function(pattern){
	
		
		
		var path = "M";

		
		for(var i = 0; i < pattern.length; i++){		
		
		
		
			path += pattern[i].x +"," + pattern[i].y + " ";
			//document.getElementById('xy-'+pattern[i].x + pattern[i].y).style.backgroundColor = "red";
		}
		
		
		document.getElementById('ps').setAttribute("d", path);
	},
	
	
	guessKey: function(list) {
		var points = this.listToPoints(list);
		var pattern = this.pattern(points,true);
		
		
		this.debug(this.pattern(points,false));
		
		var keyStore = Ext.getStore('Keys');
		var keyRecord = keyStore.findRecord('pattern', pattern, 0, false, true, true);
		if (keyRecord) {
			console.log(keyRecord.get('key'));
		}
		else {
			console.log('not found',Ext.JSON.encode(pattern));
		}
		
		
	}
});