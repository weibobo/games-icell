yc.util.ObjectPool = yc.op = function ObjectPool(className)
{
	this.freeObjects = [] ;
	this.usingObjects = {} ;
	this.count = 0 ;
	this.nAssignedId = 0 ;
	
	this.className = className ;
	
	/**
	 * 从对象池中取出一个对象
	 */
	this.ob = function(){
		if(!this.freeObjects.length)
		{
			var ob = new className() ;
			ob.__ObjectPoolId__ = this.nAssignedId ++
		}
		else
		{
			var ob = this.freeObjects.pop() ;
		}
		
		this.usingObjects[ob.__ObjectPoolId__] = ob ;
		this.count ++ ;
		
		return ob ;
	}
	/**
	 * 将对象归还到对象池中
	 */
	this.free = function(ob){
		delete this.usingObjects[ob.__ObjectPoolId__] ;
		this.count -- ;
		
		this.freeObjects.push(ob) ;
	}
}

yc.util.ObjectPool.mapFlyweights = {} ;
yc.util.ObjectPool.ins = function(className){
    
    var name = typeof(className.className)=='undefined'? className.name: className.className ;
    if(!name)
    {
        return null ;
    }
	if( typeof(yc.util.ObjectPool.mapFlyweights[name])=='undefined' )
	{
		yc.util.ObjectPool.mapFlyweights[name] = new yc.util.ObjectPool(className) ;
	}
	return yc.util.ObjectPool.mapFlyweights[name] ;
}