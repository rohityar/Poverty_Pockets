require([
    "esri/WebMap",
    "esri/views/MapView",
    "esri/layers/FeatureLayer",
    "esri/widgets/FeatureTable",
    "esri/core/reactiveUtils"
  ], (WebMap, MapView, FeatureLayer, FeatureTable, reactiveUtils) => {
    let selectedFeature, id;
  
    const webmap = new WebMap({
      portalItem: {
        id: "209aa768f537468cb5f76f35baa7e013"
      }
    });
  
    const view = new MapView({
      map: webmap,
      container: "viewDiv",
      zoom: 3,
      center: [-98, 38.5],
      popup: {
        dockEnabled: true,
        dockOptions: {
          buttonEnabled: false,
          breakpoint: false
        }
      }
    });
  
    view.when(() => {
      const featureLayer = webmap.findLayerById("OverlaySchools_2862");
      featureLayer.title = "US Private school enrollment";
      featureLayer.outFields = ["*"];
  
      const featureTable = new FeatureTable({
        view: view,
        layer: featureLayer,
        tableTemplate: {
          columnTemplates: [
            { type: "field", fieldName: "state_name", label: "State" },
            { type: "field", fieldName: "PercentagePrivate", label: "Private school percentage" },
            { type: "field", fieldName: "PercentagePublic", label: "Public school percentage" }
          ]
        },
        container: "tableDiv"
      });
  
      const checkboxEle = document.getElementById("checkboxId");
      checkboxEle.onchange = () => {
        toggleFeatureTable();
      };
  
      function toggleFeatureTable() {
        const appContainer = document.getElementById("appContainer");
        const tableContainer = document.getElementById("tableContainer");
        const labelText = document.getElementById("labelText");
        if (!checkboxEle.checked) {
          appContainer.removeChild(tableContainer);
          labelText.innerHTML = "Show Feature Table";
        } else {
          appContainer.appendChild(tableContainer);
          labelText.innerHTML = "Hide Feature Table";
        }
      }
  
      reactiveUtils.watch(
        () => view.popup.viewModel?.active,
        () => {
          selectedFeature = view.popup.selectedFeature;
          if (selectedFeature !== null && view.popup.visible !== false) {
            featureTable.highlightIds.removeAll();
            featureTable.highlightIds.add(view.popup.selectedFeature.attributes.OBJECTID);
            id = selectedFeature.getObjectId();
          }
        }
      );
    });
  });
  