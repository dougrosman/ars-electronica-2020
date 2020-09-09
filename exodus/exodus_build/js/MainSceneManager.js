import LoaderManager from './LoaderManager.js';
import * as Utils from './utils.js';

import Tile from './Tile.js';
import ImageManager from './ImageManager.js';


export default class MainSceneManager {
    constructor(gameManager) {
        this.game=gameManager;
        //MainScene Obj's
        this.scene=null;
        this.MainCamera=null;
        this.HemiLight=null;
        this.isLocked = false;


        //Gen
        this.startPoint = null;
        this.tiles = [];

    }
    createScene () {
        this.scene = new BABYLON.Scene(this.game.engine);
        this.scene.imageProcessingConfiguration.exposure = 1.1//0.6;
        this.scene.imageProcessingConfiguration.contrast = 2//1.6;
        this.scene.imageProcessingConfiguration.toneMappingEnabled = true;
        this.scene.imageProcessingConfiguration.vignetteEnabled = true;
        this.scene.clearColor = new BABYLON.Color4(1,1,1,1);
        this.scene.ambientColor = new BABYLON.Color3(0.3, 0.3, 0.3);

        this.scene.gravity = new BABYLON.Vector3(0, -0.9, 0);
        this.scene.collisionsEnabled = true;

        this.scene.fogMode = BABYLON.Scene.FOGMODE_LINEAR
        this.scene.fogColor = new BABYLON.Color3(1, 1, 1);
        this.scene.fogStart = 20.0;
        this.scene.fogEnd = Utils.maxView - 5;

        // On click event, request pointer lock
        this.scene.onPointerDown =  (evt) => {
            //true/false check if we're locked, faster than checking pointerlock on each single click.
            if (!this.isLocked) {
                this.game.canvas.requestPointerLock = this.game.canvas.requestPointerLock || this.game.canvas.msRequestPointerLock || this.game.canvas.mozRequestPointerLock || this.game.canvas.webkitRequestPointerLock;
                if (this.game.canvas.requestPointerLock) {
                    this.game.canvas.requestPointerLock();
                }
            }
        };
        

        // Attach events to the document
        document.addEventListener("pointerlockchange", this.pointerlockchange(), false);
        document.addEventListener("mspointerlockchange", this.pointerlockchange(), false);
        document.addEventListener("mozpointerlockchange", this.pointerlockchange(), false);
        document.addEventListener("webkitpointerlockchange", this.pointerlockchange(), false);
        


        this.loadingHolder = document.getElementById('l-holder');
        this.loadingBar = document.getElementById('l-bar');
        this.loadingValue = document.getElementById('l-value');

        this.createCamera();
        this.initializeEnvironMent();

        this.loadingValue.innerHTML = `100 %`;
        this.loadingBar.style.width = `100%`;
        this.loadingHolder.style.display="none";


        // this.scene.debugLayer.show();
        return this.scene;
    }

    pointerlockchange () {
		var controlEnabled = document.mozPointerLockElement || document.webkitPointerLockElement || document.msPointerLockElement || document.pointerLockElement || null;
		// If the user is already locked
		if (!controlEnabled) {
			//camera.detachControl(canvas);
			this.isLocked = false;
		} else {
			//camera.attachControl(canvas);
			this.isLocked = true;
		}
    }

    createCamera () {
        // var camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 10, new BABYLON.Vector3(0, 0, 0), this.scene);
        //     camera.attachControl(this.game.canvas, true);

        //Moving Camera
        this.MainCamera = new BABYLON.UniversalCamera("FpsCamera", new BABYLON.Vector3(0, 5, 0), this.scene);
            this.MainCamera.speed = .28;
            this.MainCamera.checkCollisions = true;
            this.MainCamera.minZ = 0.5;
            this.MainCamera.maxZ = Utils.maxView;
            this.MainCamera.fov = 1.65;
            //Controls  WASD
            this.MainCamera.keysUp.push(87); 
            this.MainCamera.keysDown.push(83);            
            this.MainCamera.keysRight.push(68);
            this.MainCamera.keysLeft.push(65);

            this.MainCamera.attachControl(this.game.canvas, true);
            this.MainCamera.ellipsoid = new BABYLON.Vector3(1, Utils.cameraHeight, 1);

            this.camBox = BABYLON.MeshBuilder.CreateBox("CameraBox", {size:2}, this.scene);
            this.camBox.parent = this.MainCamera;
        
    }

    initializeEnvironMent () {
        this.HemiLight= new BABYLON.HemisphericLight("HemiLight", new BABYLON.Vector3(0, 1, 0), this.scene);
        this.HemiLight.intensity=1.2;

        // var box = BABYLON.MeshBuilder.CreateBox("MainBox", {size:1}, this.scene);

    //Materials 
        //alphaMat
        this.alphaMaterial = new BABYLON.StandardMaterial("alphaMat", this.scene);
        this.alphaMaterial.alpha=1;        
        //groundMat
        this.groundMaterail = new BABYLON.StandardMaterial("groundMat", this.scene);
        this.groundMaterail.diffuseTexture = new BABYLON.Texture(Utils.groundTexture, this.scene);
        this.groundMaterail.diffuseTexture.level = 1.2;
        this.groundMaterail.specularColor = new BABYLON.Color3(27/255, 27/255, 27/255);
        
        let backGroundMusic = new BABYLON.Sound("backGroundMusic",
        "assets/Sound/repeatingsound.mp3",
        this.scene,
         null,
            {
                loop: true,
                autoplay: true
            },
        );  
        
        // this.createSurface();
        this.imageManager = new ImageManager(this);
        this.initGenerator();


        // this.camBox.material = this.alphaMaterial;
        this.MainCamera.applyGravity = true;
    }

    initGenerator () {
        this.startPoint = new BABYLON.Vector3.Zero();

        let date = new Date();
        let updateTime = date.getMonth() + "/" + date.getDate() + "/" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    
        for (let x = -Utils.groundOffsetX; x < Utils.groundOffsetX; x++) {
            for (let z = -Utils.groundOffsetZ; z < Utils.groundOffsetZ; z++) {
                // for (let x = -0; x < Utils.groundOffsetX; x++) {
                //     for (let z = -0; z < Utils.groundOffsetZ; z++) {
        
                let pos = new BABYLON.Vector3( (x * Utils.groundSize + this.startPoint.x),
                                                Utils.yOffset,
                                                (z * Utils.groundSize +this.startPoint.z));
                
                let tileName = "Tile_" + ( (Math.floor(pos.x)) + "_" + (Math.floor(pos.z)) );
                let newTile = new Tile(tileName, pos, updateTime, this, this.imageManager);
                this.tiles.push(
                    {
                        name: tileName,
                        tile: newTile
                    }
                );
                
            }            
        }

        //Start Updatign the Generator
        this.scene.registerBeforeRender(() => {
            this.UpdateGenerator();
        });

    }

    UpdateGenerator () {
        let player = this.MainCamera;
        let xMove = Math.floor(player.position.x - this.startPoint.x);
        let zMove = Math.floor(player.position.z - this.startPoint.z);

        if(Math.abs(xMove) >= Utils.groundSize || Math.abs(zMove) >= Utils.groundSize ){

            let date = new Date();
            let updateTime = date.getMonth() + "/" + date.getDate() + "/" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

            //Player Position
            let playerX = ( Math.floor(player.position.x/Utils.groundSize)* Utils.groundSize ); //pos at x
            let playerZ = ( Math.floor(player.position.z/Utils.groundSize)* Utils.groundSize ); //pos at z

            let boolingTiles = [];
            for (let x = -Utils.groundOffsetX; x < Utils.groundOffsetX; x++) {
                for (let z = -Utils.groundOffsetZ; z < Utils.groundOffsetZ; z++) {

                    let pos = new BABYLON.Vector3( (x * Utils.groundSize + playerX),
                                                    Utils.yOffset,
                                                    (z * Utils.groundSize + playerZ)
                                                );
                    let tileName = "Tile_" + ( (Math.floor(pos.x)) + "_" + (Math.floor(pos.z)) );
                    let targetTile = this.tiles.find( (x) => x.name === tileName); //scearch for target Tile
                    if (!targetTile) { //if it's not exsists 
                        boolingTiles.push({
                            pos :pos.clone(),
                            name : tileName
                        });
                    }else {
                        targetTile.tile.UpdateCreationTime(updateTime);
                    }
                }
            };

            for (let t = 0; t < this.tiles.length; t++) {
                if(this.tiles[t].tile.creationTime !== updateTime) {
                    if(boolingTiles.length <= 0)
                        throw Error ("No booling pos !!!!");
                    //delete
                    let rnd = Math.floor(Math.random() * Math.floor(boolingTiles.length)); //random booling Obj
                    let pos = boolingTiles[rnd].pos;
                    this.tiles[t].name = boolingTiles[rnd].name;
                    this.tiles[t].tile.Reuse(pos, updateTime); //recenter
                    
                    boolingTiles.splice(rnd, 1);
                }
            }
            this.startPoint = player.position.clone();
        }
    }

    createSurface () {
        let planeSize = 150;
        var ground = BABYLON.MeshBuilder.CreateGround("ground", {width: planeSize, height: planeSize}, this.scene);
            ground.checkCollisions = true;
            ground.material = this.groundMaterail;

        this.setSurfaceImages();
    }

    setSurfaceImages () {
        let imageHolder = new BABYLON.Mesh("ImageHolder",this.scene);

        let xImageOffset = Math.floor(Math.random() * Utils.xMaxImageOffset) + 1;
        let zImageOffset = Math.floor(Math.random() * Utils.zMaxImageOffset) + 1;

        let cols = Utils.groundSize - Utils.imageSize;
            cols = (Utils.groundSize / (Utils.imageSize + zImageOffset) );
        let rows = cols;

        let x = (-Utils.groundSize/2) + Utils.imageSize/2;
        let z = (Utils.groundSize/2) - Utils.imageSize/2;
        console.log("cols ", cols);

            for (let i = 0; i < cols; i++) {
                for (let j = 0; j < rows; j++) {
                    let rndNum = Math.floor(Math.random() * Math.floor(Utils.imagesNumber+1));
                    console.log("rnd", rndNum);
                    let imageMesh = BABYLON.MeshBuilder.CreatePlane(`img ${i} - ${j}`, {size: Utils.imageSize}, this.scene);
                    let imageMat = new BABYLON.StandardMaterial(`imgMat ${i} - ${j}`, this.scene);
                        imageMat.diffuseTexture = new BABYLON.Texture( `assets/People/Untitled-${rndNum}.png`, this.scene);
                        imageMat.diffuseTexture.hasAlpha = true;
                        imageMesh.material = imageMat;

                
                    imageMesh.position = new BABYLON.Vector3(x, Utils.yOffset, z);
                    imageMesh.rotation = new BABYLON.Vector3(Math.PI/2,0,Math.PI/2);
                    imageMesh.parent = imageHolder; //parent

                    x += ( xImageOffset + Utils.imageSize);
                }
                z -= ( xImageOffset + Utils.imageSize);
                x = (Math.round(Math.random())) ? (-Utils.groundSize/2) + Utils.imageSize/2 : (-Utils.groundSize/2) +  Utils.imageSize;
            }

        // for (let i = 0; i < Utils.imagesNumber; i++) {
            
        //     let imageMesh = BABYLON.MeshBuilder.CreatePlane("imag - 0", {size: Utils.imageSize}, this.scene);
        //     let imageMat = new BABYLON.StandardMaterial("imag - 0 mat", this.scene);
        //         imageMat.diffuseTexture = new BABYLON.Texture("assets/People/Untitled-1.png", this.scene);
        //     imageMesh.material = imageMat;
            
        //         imageMesh.position.y += 0.05;
        //         imageMesh.rotation = new BABYLON.Vector3(Math.PI/2,0,Math.PI/2);
        // }

    }

}




   // for (let i = 0; i < task.loadedMeshes.length; i++) {
    //     console.log("tr" , task.loadedMeshes[i].name , "----- > ", i );
    // }

    // this.MainCamera = new BABYLON.VirtualJoysticksCamera("VJC", new BABYLON.Vector3(0, 4, 0), this.scene);
    // this.MainCamera.checkCollisions = true;
    // this.MainCamera.speed = .4;
    // this.MainCamera.minZ = 0.5;
    // this.MainCamera.maxZ = Utils.maxView;
    // this.MainCamera.fov = 1.3;
    
    // this.MainCamera.attachControl(this.game.canvas, true);
    // this.MainCamera.ellipsoid = new BABYLON.Vector3(1, 2, 1);
