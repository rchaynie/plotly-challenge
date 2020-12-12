console.log("app.js is up")

const jsonData = d3.json("../../data/samples.json")
console.log(jsonData)


function init_build() {
    d3.json("../../data/samples.json").then(
        data => {
        let selectSubject = d3.select("#selDataset")
        let names=data.names;
        names.forEach((d) => {
            selectSubject.append("option")
                .attr("value", d)
                .text(d)
        }) 
})
};
init_build();

function buildMetadata(d) {
    d3.json("../../data/samples.json").then((obj) => {
        let metadata = obj.metadata; 
        let metadataArray = metadata.filter(obj => {obj.names == d});
        result=metadataArray[0]
        
        let panelMetaData = d3.select("#sample-metadata");

        panelMetaData.html("");

        Object.entries(result).forEach(([key,value]) => 
        panelMetaData.append("p").text(`${key}: ${value}`));
    })  
    };

buildMetadata();
      
        // let resultArray = metadata.filter(obj => obj.id == sample);
        // let result = resultArray[0];
     
        // let panel = d3.select("#sample-metadata");

        // Object.entries(result).forEach([key, value]) => {
        //     panel.append("h6").text(`${key}: ${value}`);
        // }
