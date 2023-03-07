AFRAME.registerComponent("create-markers", {
    init:async function(){
        var mainScene = document.querySelector("#main-scene");
        var robot = await this.getAllRobots();
        robot.map(robots => {
            var marker = document.createElement("a-marker");
            marker.setAttribute("id", robots.id);
            marker.setAttribute("type", "pattern");
            marker.setAttribute("url", robots.marker_pattern_url)
            marker.setAttribute("cursor", {
                rayOrigin:"mouse"
            });
            marker.setAttribute("markerhandler", {});
            mainScene.appendChild(marker);

            //Adding 3D model to scene
            var model = document.createElement("a-entity");
            model.setAttribute("id", `model-${robots.id}`);
            model.setAttribute("position", robots.model_goemetry.position);
            //NOTE: IF ERROR POPS UP TRY AND ADD ROTATION TO model_geometry on firestore on firebase
            model.setAttribute("scale", toy.model_geometry.scale);
            model.setAttribute("gltf-model", `url(${robots.model_url})`);
            model.setAttribute("gesture-handler", {});
            model.setAttribute("animation-mixer", {});
            marker.appendChild(model);
            
        })
    },
    getAllRobots: async function(){
        return await firebase
        .firestore()
        .collection("robots")
        .get()
        .then(snap => {
            return snap.docs.map(doc => doc.data());
        });
    }
})