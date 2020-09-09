
import * as Utils from './utils.js';

export default class Tile {
    constructor(name, position, updateTime,sceneManager, imageManager) {

        this.name = name;
        this.position = position.clone();
        this.creationTime = updateTime;
        this.imageManager = imageManager;

        this.scene = sceneManager.scene;
        this.groundMaterail = sceneManager.groundMaterail;

        this.InitTile();
    }

    InitTile () {
        this.ground = BABYLON.MeshBuilder.CreateGround(this.name, {width: Utils.groundSize, height: Utils.groundSize}, this.scene);
        this.ground.checkCollisions = true;
        this.ground.material = this.groundMaterail;
        
        let holder = this.SetTileImages();
        holder.parent = this.ground;
        this.ground.position = this.position;
        this.ground.rotation.y = (Math.round(Math.random())) ? 0 : Math.PI/2;
    }
    SetTileImages () {
        let imageHolder = new BABYLON.Mesh("ImageHolder",this.scene);
        let targetArr = Object.values(Utils.ImagesCat).filter((keyValue) => keyValue.imagesNumber > 0); //arr contains all used sizes
        
        let groundOffset = targetArr[targetArr.length-1].imageSize / 2;

        let selectedImgs = [];
        let noMore = false;
        let tries = 10;

        let targetNum = this.imageManager.targetImgNum;
        // console.log("Sdsd", targetNum)
        let minDis = targetArr[targetArr.length-1].imageSize ; //large imageSize
        let imageId = 0;
        while(targetNum > 0) {
            let rndSizeIndex = Math.floor(Math.random() * targetArr.length);
            let tmpImageSize =  targetArr[rndSizeIndex].imageSize;
            while(noMore && tmpImageSize === Utils.ImagesCat.large.imageSize ){
                
                rndSizeIndex = Math.floor(Math.random() * targetArr.length);
                tmpImageSize = targetArr[rndSizeIndex];
            }

           const {id, imagesNumber, imageSize, subPath} = targetArr[rndSizeIndex];

            // console.log("iiiiiii", imageSize)
            let newPoint = new BABYLON.Vector3(
                Math.floor(Math.random() * ( (Utils.groundSize/2 - groundOffset) - (-Utils.groundSize/2 + groundOffset) + 1) + (-Utils.groundSize/2 + groundOffset )), //x
                0,
                Math.floor(Math.random() * ((Utils.groundSize/2 - groundOffset) - (-Utils.groundSize/2 + groundOffset) + 1) + (-Utils.groundSize/2 + groundOffset )), //z
            );
            let closestImgArr = selectedImgs.filter((imgData) => {
                let disV3 =  new BABYLON.Vector3(
                    Math.abs(imgData.v3.x - newPoint.x ),
                    0,
                    Math.abs(imgData.v3.z - newPoint.z )
                );
                // console.log("dis ", disV3)
                if(disV3.x <= minDis && disV3.z <= minDis )
                    return true
                else
                    return false
            });
            // console.log("-------------")
            // console.log(" [] ", closestImgArr);
            let readyToPost = true;
            for (let i = 0; i < closestImgArr.length; i++) {
                // X
                let disX =  closestImgArr[i].v3.x - newPoint.x;
                // Z
                let disZ =  closestImgArr[i].v3.z - newPoint.z;       
                
                let dis = Math.sqrt( (disX * disX ) + (disZ * disZ) );
                let radSum = closestImgArr[i].size + imageSize ; //
                // console.log(" [dis] ", dis, "[Rad]", radSum);
                if(dis < radSum){
                    if(imageSize === Utils.ImagesCat.large.imageSize && tries <= 0){
                        noMore = true;
                        minDis = Utils.ImagesCat.medium.imageSize;
                    }
                    // console.log(" [Warring !!! ] ");
                    tries--;
                    readyToPost = false;
                    break;
                }           
            }

            if(readyToPost){
                // console.log(" [ok we are going to post !!! ] ");
                let imageMesh = BABYLON.MeshBuilder.CreatePlane(`img ${imageId}`, {size: imageSize}, this.scene);
                    imageMesh.position =  new BABYLON.Vector3(newPoint.x, Utils.yOffset, newPoint.z);
                    imageMesh.rotation = new BABYLON.Vector3(Math.PI/2, (Math.round(Math.random())) ? 0 : Math.PI, Math.PI/2);

                let imageMat = this.imageManager.getRndMatByCatId(id);
                    imageMesh.material = imageMat;
                    imageMesh.parent = imageHolder; //parent
    
                selectedImgs.push({
                    id:imageId,
                    v3:newPoint.clone(),
                    size: imageSize, //
                });
                imageId++;
                targetNum--;
            }
        }
        return imageHolder;
    }
    UpdateCreationTime (updateTime) {
        this.creationTime = updateTime;
    }
    Reuse (pos,updateTime) {
        this.UpdateCreationTime(updateTime);
        this.ground.position = pos.clone();
        // this.ground.rotation.y = (Math.round(Math.random())) ? 0 : Math.PI/2;
        this.ground.getChildMeshes(false)[0].rotation.y = (Math.round(Math.random())) ? 0 : Math.PI/2;

    }

}