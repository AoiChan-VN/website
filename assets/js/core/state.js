const sceneState = {
  loaded:false,
  menuOpen:false,
  lowPerformance:false
};

export function updateSceneState(
  key,
  value
){

  sceneState[key] = value;
}

export function getSceneState(){
  return sceneState;
} 
