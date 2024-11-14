require([
    "esri/Map",
    "esri/views/MapView",
    "esri/layers/GeoJSONLayer"
  ], (Map, MapView, GeoJSONLayer) => {
  
    
    const geojsonLayer = new GeoJSONLayer({
      url: "bay_data.geojson",    
      outFields: ["*"],            
      popupTemplate: {             
        title: "San Jose",      
        content: "This is San Jose in the Bay Area."
      }
    });
  
    
    const map = new Map({
      basemap: "topo-vector",      
      layers: [geojsonLayer]       
    });
  
    
    const view = new MapView({
      container: "viewDiv",        
      map: map,
      zoom: 11,                    
      center: [-121.8863, 37.3382] 
    });
  
    
  });
  