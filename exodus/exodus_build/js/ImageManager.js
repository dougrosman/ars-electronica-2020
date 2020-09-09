import * as Utils from './utils.js';

export default class ImageManager {

    constructor(sceneManager) {
        this.game = sceneManager.game;
        this.scene = sceneManager.scene;

        this.targetPercentage= 85;

        this.allImageMaterials = [];
        this.initRandomImgs();
    }

    initRandomImgs () {

        let smallLength = Math.floor( (Utils.ImagesCat.small.imagesNumber * this.targetPercentage) / 100 );
        let midiumLength = Math.floor( (Utils.ImagesCat.medium.imagesNumber * this.targetPercentage) / 100 );
        let largeLength = Math.floor( (Utils.ImagesCat.large.imagesNumber * this.targetPercentage) / 100 );

        let maxImgNumber =  Utils.groundSize +1 ;
        this.targetImgNum =  Math.round( (Utils.crowdPercentage * maxImgNumber) / 100); //

        // let s_images, m_images , l_images  = [];

        this.s_images = this.getMatArrbyRndIndexs(Utils.ImagesCat.small, smallLength);
        this.m_images = this.getMatArrbyRndIndexs(Utils.ImagesCat.medium, midiumLength);
        this.l_images = this.getMatArrbyRndIndexs(Utils.ImagesCat.large, largeLength);
    }
    getMatArrbyRndIndexs (targetImageCat, targetLength) {
        if(targetImageCat.imagesNumber<=0)
            return [];

        let tmpImageIndexs = [];
        let matsArr = [];

        while (targetLength > 0) {
            let rndImageIndex = Math.floor(Math.random() * Math.floor(targetImageCat.imagesNumber+1));
            if(!tmpImageIndexs.includes(rndImageIndex)){
                tmpImageIndexs.push(rndImageIndex);
                targetLength--;
            }
        }

        for (let i = 0; i < tmpImageIndexs.length; i++) {
            let imageMat = new BABYLON.StandardMaterial(`${targetImageCat.id}_imgMat ${i}`, this.scene);
                imageMat.diffuseTexture = new BABYLON.Texture( `${Utils.imagesPath}/${targetImageCat.subPath}/Untitled-${i}.png`, this.scene);
                imageMat.diffuseTexture.hasAlpha = true;
                imageMat.specularColor = new BABYLON.Color3(49/255, 49/255, 49/255);     
            
                matsArr.push(imageMat);
        }
        return matsArr;
    }
    getRndMatByCatId (catId) {

        let targetMatArr = [];
        switch (catId) {
            default:
            case Utils.ImagesCat.small.id:
                targetMatArr = this.s_images;
                break;
            case Utils.ImagesCat.medium.id:
                targetMatArr = this.m_images;
                break;
            case Utils.ImagesCat.large.id:
                targetMatArr = this.l_images;
               
                break;
        }
        let rndImageIndex = Math.floor(Math.random() * Math.floor(targetMatArr.length));
        return targetMatArr[rndImageIndex];
    }

}