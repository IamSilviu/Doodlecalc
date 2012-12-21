Ext.define('DoodleCalc.controller.Doodle', {
    extend: 'Ext.app.Controller',
    
    config: {
        refs: {
            drawArea : {
				selector: 'draw',
				xtype: 'draw'
			}
        },
        control: {
			drawArea: {
				initialize: 'onInitializeDrawArea'
			}
        }
    },
    
	sprite : null,
	list : [], 
	old1 : [0, 0], 
	old2 : [0, 0],
	
    //called when the Application is launched, remove if not needed
    launch: function(app) {

    },
	
	onInitializeDrawArea: function(drawArea){
		
		drawArea.setListeners({
			element: 'element',
			touchstart: this.onTouchStart,
			drag: this.onDrag,
			dragend: this.onDragEnd,
			scope: this
		});

	},
	onTouchStart: function(e){ 
		if (!this.sprite) {
			var cmp = this.getDrawArea(),
				p0 = cmp.element.getXY(),
				p = [e.pageX - p0[0], e.pageY - p0[1]];
			this.list = [p[0], p[1], p[0], p[1]];
			this.lastEventX = p[0];
			this.lastEventY = p[1];
			cmp.getSurface('overlay').element.setStyle({zIndex: 1});
			this.sprite = cmp.getSurface('overlay').add({
				type: 'path',
				path: ['M', this.list[0], this.list[1], 'L', this.list[0] + 1e-5, this.list[1] + 1e-5],
				lineWidth: 3,
				lineCap: 'round',
				lineJoin: 'round',
				strokeStyle: "blue"
			});
			this.old1 = this.old2 = p;
			cmp.getSurface('overlay').renderFrame();
		}
	},
	onDrag: function(e,node){ 
		
		if (this.sprite) {
		
			var me = this.getDrawArea(),
				p = e.touches[0].point,
				xy = me.element.getXY(),
				x = p.x - xy[0],
				y = p.y - xy[1],
				dx = this.lastEventX - x,
				dy = this.lastEventY - y,
				step = false,
				D = 40;
				
			if (dx * dx + dy * dy < D * D) {
				this.list.length -= 2;
				this.list.push(p.x - xy[0], p.y - xy[1]);
			} else {
				this.list.length -= 2;
				this.list.push(this.lastEventX = p.x - xy[0], this.lastEventY = p.y - xy[1]);
				this.list.push(this.lastEventX, this.lastEventY);
				step = true;
			}

			var path = this.smoothenList(this.list);
			this.sprite.setAttributes({
				path: path
			});
			if (Ext.os.is.Android) {
				Ext.draw.Animator.schedule(function () {
					this.getSurface('overlay').renderFrame();
				}, me);
			} else {
				me.getSurface('overlay').renderFrame();
			}
		}

	},
	onDragEnd: function(e){ 
		 var cmp = this.getDrawArea(),
				p0 = cmp.element.getXY(),
				p = [e.pageX - p0[0], e.pageY - p0[1]];
			this.list.push(p[0], p[1]);
			var path = this.smoothenList(this.list);
			this.sprite.setAttributes({
				path: path
			});
			var newSprite = cmp.getSurface().add({
				type: 'path',
				path: this.smoothenList(this.list),
				lineWidth: this.sprite.attr.lineWidth,
				lineCap: 'round',
				lineJoin: 'round',
				strokeStyle: "red"
			});
			cmp.getSurface().setDirty(true);
			cmp.getSurface().renderFrame();
			this.sprite.destroy();
			cmp.getSurface('overlay').renderFrame();
			this.sprite = null;
	},
	
	smoothenList: function(points) {
        if (points.length < 3) {
            return ["M", points[0], points[1]];
        }
        var dx = [], dy = [], result = ['M'],
            i, ln = points.length;
        for (i = 0; i < ln; i += 2) {
            dx.push(points[i]);
            dy.push(points[i + 1]);
        }
        dx = Ext.draw.Draw.spline(dx);
        dy = Ext.draw.Draw.spline(dy);
        result.push(dx[0], dy[0], "C");
        for (i = 1, ln = dx.length; i < ln; i++) {
            result.push(dx[i], dy[i]);
        }
        return result;
    }
	
});