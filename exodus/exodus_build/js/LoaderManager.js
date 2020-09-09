import * as utils from './utils.js';

export default class LoaderManager {
    constructor(sceneManager, gameManager) {
        this.sceneManager = sceneManager;
        this.game=gameManager;

        this.assetsManager = new BABYLON.AssetsManager(this.sceneManager.scene);
        this.assetsManager.useDefaultLoadingScreen = false;

        this.previousRoom = null;
        this.roomBaseMent = null;


        this.loadingHolder = document.getElementById('l-holder');
        this.loadingTitle = document.getElementById('l-title');
        this.loadingBar = document.getElementById('l-bar');
        this.loadingValue = document.getElementById('l-value');


    }

    initializeSceneAssets(){ //first Load

        //room's
        var baseTask = this.assetsManager.addMeshTask("hbb_Task", "", "models/rooms/roomBasement/", "roomBasement.babylon");
        var hallTask = this.assetsManager.addMeshTask("hall_Task", "", "models/rooms/hall/", "hall.babylon");

        //char's
        var doorManTask = this.assetsManager.addMeshTask("hall_Task", "", "models/characters/doorMan/", "Portero_discoteca.glb");

        //Rooms
        baseTask.onSuccess =  (task) => { //Test --On Mesh Success
            this.roomBaseMent = task.loadedMeshes[76]; //roomBasement
            this.roomBaseMent.setEnabled (false)
        }
        hallTask.onSuccess = (task) => { //Test --On Mesh Success            
            this.hallMesh = task.loadedMeshes[199]; //Hall
            let doorsHolder = this.hallMesh.getChildMeshes(true).find(x => x.name === utils.doorsHolder); // doorsHolder
            this.sceneManager.registRoomActions(doorsHolder, null);
        }

        //Char's
        doorManTask.onSuccess = (task) => { //Test --On Mesh Success            
            for (let i = 0; i < task.loadedMeshes.length; i++) {
                    let doorMan = task.loadedMeshes[0];
                    doorMan.position = new BABYLON.Vector3(-3, 0, -4.5);
                    doorMan.rotation.y = 2.9;
                    doorMan.scaling = new BABYLON.Vector3(3.8, 3.8, 3.8)
                    console.log("tr" , task.loadedMeshes[i].name , "----- > ", i );
            }
        }


        this.assetsManager.onProgress = (remainingCount, totalCount, lastFinishedTask) => {
            console.log("r ",remainingCount, "pp", totalCount )
            this.game.engine.loadingUIText = 'We are loading the scene. ' + remainingCount + ' out of ' + totalCount + ' items still need to be loaded.';
            this.loadingValue.innerHTML = `${ (( (totalCount- remainingCount)/totalCount) * 100).toFixed() } %`;
            this.loadingBar.style.width = `${ ((totalCount- remainingCount)/totalCount) * 100}%`;
        };
          
        this.assetsManager.onFinish =  (tasks) => { //On ALL Done
            console.log("loaded !!! ")
            this.toggleBarByState(false);//closeBar

        };
 
        console.log("start loading")
        // Start loading
        this.loadingTitle.innerHTML = 'Loading Main Hall Assets';
        this.loadingBar.style.backgroundColor = utils.hallColor;
        this.assetsManager.load();
    }

    CheckLoadedRoomByName (roomName) {    
        console.log("roomName ---> ", roomName)
        let isHall = false;
        let targetRoomObj = null;

        if(roomName === utils.hall){ //isHall
            isHall =true;
            targetRoomObj ={
             id: "hall"   
            };

        }else {
            targetRoomObj = Object.values(utils.roomsTypesEnum).find( x => x.id === roomName);
            if(!targetRoomObj) {
                console.log("can't find this room name , out !");
                return
            };
        }
        this.loadRoomByType(isHall,targetRoomObj);
    }


    loadRoomByType(isHall,targetRoomObj) {
        console.log("start Loadingg  !!");
        this.toggleBarByState(true); //showLoading
        this.game.engine.loadingUIText = ` ${targetRoomObj.id} is loading !`;

        
        const onCompleteLoading = () => {
            //Enable MovingCamera
            this.sceneManager.adjustCameraByType(isHall)
            this.toggleBarByState(false); //hidLoading

            // this.game.engine.hideLoadingUI();
            console.log("hide")
        }

        if (isHall) {
            console.log("going to hall !!");

            this.loadingTitle.innerHTML = 'Loading Main Hall Assets';
            this.loadingBar.style.backgroundColor = utils.hallColor;
            ////
            this.previousRoom.dispose();
            this.previousRoom = null;

            this.hallMesh.setEnabled (true);
            this.roomBaseMent.setEnabled (false);

            let doorsHolder = this.hallMesh.getChildMeshes(true).find(x => x.name === utils.doorsHolder); // doorsHolder
            this.sceneManager.registRoomActions(doorsHolder, null);

            console.log("complete Hall")

            onCompleteLoading(); //complete loading
        } else {
            console.log("going to rooomObj",targetRoomObj)

            this.loadingTitle.innerHTML = `Loading ${targetRoomObj.id} Assets`;
            this.loadingBar.style.backgroundColor = targetRoomObj.color;
            ////
            BABYLON.SceneLoader.ImportMesh("", targetRoomObj.path, targetRoomObj.name, this.sceneManager.scene, (meshes) => {

                if (this.previousRoom) //dispose Previous room
                    this.previousRoom.dispose();
    
                this.previousRoom = this.currentRoom = meshes[targetRoomObj.index];
                let doorsHolder = this.currentRoom.getChildMeshes(true).find(x => x.name === utils.doorsHolder);
                let spotsHolder = this.currentRoom.getChildMeshes(true).find(x => x.name === utils.spotsHolder);
    
                //RegistRoomActions
                this.sceneManager.registRoomActions(doorsHolder, spotsHolder);

                //Adjust Scene Meshes
                this.hallMesh.setEnabled (false);
                this.roomBaseMent.setEnabled (true);

                console.log("complete Room")
                onCompleteLoading(); //complete loading
            },(loadingInfo)=>{
                if (loadingInfo.lengthComputable){
                    this.loadingValue.innerHTML = `${ ((loadingInfo.loaded/loadingInfo.total) * 100).toFixed()} %`;
                    this.loadingBar.style.width = `${ (loadingInfo.loaded/loadingInfo.total) * 100}%`;
                }
            });
        }

    }
    toggleBarByState (IsInit){
        if(IsInit){
            this.sceneManager.detachCameraControl();
            this.loadingValue.innerHTML = `0 %`;
            this.loadingBar.style.width = `0%`;
            this.loadingHolder.style.display="block";
        }else{
            this.loadingValue.innerHTML = `100 %`;
            this.loadingBar.style.width = `100%`;
            this.loadingHolder.style.display="none";
        }
    }
    
}


        // for (let i = 0; i < meshes.length; i++) {
        //     console.log("tr" , meshes[i].name , "----- > ", i );
        // }
        // return

        // switch (roomName) {
        //     case utils.roomsTypesEnum.airRoom:
                
        //         break;
        //     case utils.roomsTypesEnum.freeRoom:
                
        //         break;
        //     case utils.roomsTypesEnum.wildRoom:
        //         targetRoom
    
        //         break;
        //     case utils.roomsTypesEnum.hypeRoom:
                
        //         break;
        //     case utils.roomsTypesEnum.vibesRoom:
                
        //         break;    
        //     default:
        //         return;
        // }

        // function (evt) {     
            
        //     if (evt.lengthComputable) {   
        //         loadingText.innerHTML = "Loading, please wait..." + (evt.loaded * 100 / evt.total).toFixed() + "%";   
        //     } else {    
        //         dlCount = evt.loaded / (1024 * 1024);    
        //         loadingText.innerHTML = "Loading, please wait..." + Math.floor(dlCount * 100.0) / 100.0 + " MB already loaded.";
        //     }
        // }