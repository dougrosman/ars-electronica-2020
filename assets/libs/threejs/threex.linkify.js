// import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r119/build/three.module.js';


var THREEx	= THREEx	|| {}

let o = 0;

THREEx.Linkify	= function(domEvents, mesh, url, withBoundingBox){
	withBoundingBox	= withBoundingBox !== undefined ? withBoundingBox : true
	// compute geometry size
	var geometry	= mesh.geometry
	geometry.computeBoundingBox();
	var size	= new THREE.Vector3();
	size.x	= (geometry.boundingBox.max.x - geometry.boundingBox.min.x)
	size.y	= (geometry.boundingBox.max.y - geometry.boundingBox.min.y)
	size.z	= (geometry.boundingBox.max.z - geometry.boundingBox.min.z)
	
	// create the boundingBox if needed
	if( withBoundingBox ){
		var boundingBox	= new THREE.Mesh(new THREE.CubeGeometry(1,1,1), new THREE.MeshBasicMaterial({
			wireframe	: true
		}))
		boundingBox.material.visible	= false
		boundingBox.scale.copy(size)
		mesh.add(boundingBox)	
	}

	// build the outline
	var outlineH	= size.y / 10;
	var deltaY	= size.y / 20;
	// var outline = new THREE.Mesh(new THREE.PlaneBufferGeometry(size.x+1, size.y+1), new THREE.MeshBasicMaterial({color: 0xffffff, transparent: true, opacity: 0.25, wireframe: false}))
	// outline.position.y	+= -size.y/2 - deltaY - outlineH/2
	const linegeometry = new THREE.BoxBufferGeometry( size.x+1, size.y+1, 0 );
	const linegeometry2 = new THREE.BoxBufferGeometry( size.x+1.025, size.y+1.025, 0 );
	const edges = new THREE.EdgesGeometry( linegeometry );
	const edges2 = new THREE.EdgesGeometry( linegeometry2 );
	const outline = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: 0xffffff, transparent: true, opacity: 0 } ) );
	const outline2 = new THREE.LineSegments( edges2, new THREE.LineBasicMaterial( { color: 0xffffff, transparent: true, opacity: 0 } ) );
	// const mat = THREE.MeshBasicMaterial({color: 0xffffff, transparent: true, opacity: 0.25});
	//const outline = new three.Mesh(line, mat);
	outline.position.y = 0;
	this.underline = outline

	// make it invisible by default
	outline.visible = true;
	outline.visible = true;

	// add it to the mesh
	mesh.add(outline);


	// bind the click
	var eventTarget	= withBoundingBox ? boundingBox : mesh 
	this.eventTarget = eventTarget
	domEvents.bind(eventTarget, 'click', function(event){
		window.open(url, '_blank');
	})
	
	domEvents.bind(eventTarget, 'touchend', function(event){
		window.open(url, '_blank');
	})

	// bind 'mouseover'
	domEvents.bind(eventTarget, 'mouseover', function(event){
		let fadeIn = setInterval(function(){
			o+=0.08;
			outline.material.opacity = o;
			outline2.material.opacity = o;
			if(o >= 1) {
				clearInterval(fadeIn);
			}
		}, 16);
		
		
		document.body.style.cursor	= 'pointer';
	}, false)
		
	// bind 'mouseout'
	domEvents.bind(eventTarget, 'mouseout', function(event){
		let fadeOut = setInterval(function(){
			o-=0.08;
			outline.material.opacity = o;
			outline2.material.opacity = o;
			if(o <= 0) {
				clearInterval(fadeOut);
			}
		}, 16);	
		document.body.style.cursor	= 'default';
	}, false)
	
	this.destroy = function(){
		console.log('not yet implemented')
	}
}
