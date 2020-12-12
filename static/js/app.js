console.log("app.js is up")

const jsonData = d3.json("../../data/samples.json")
console.log(jsonData)


function buildMetadata(sample) {
    d3.json("../../data/samples.json").then((data) => {
        let metadata = data.metadata; 
        // console.log(metadata[0])

        let metadataRecord = metadata.filter(obj => obj.id == sample);
        result=metadataRecord[0];
        // console.log(result)

        

        let panelMetaData = d3.select("#sample-metadata");

        panelMetaData.html("");

        Object.entries(result).forEach(([key,value]) => 
        panelMetaData.append("p").text(`${key}: ${value}`));
    })  
};


function buildChart(sample) {
    
    d3.json("../../data/samples.json").then((data) => {
        
        let samples = data.samples;
        console.log(samples[0])
        let results = samples.filter(sampleValue => sampleValue.id == sample);
        result = results[0]
        console.log(result)

        // resultSorted = result.orderBy("sample_values," "desc").slice(0,10)

        let otuID = result.otu_ids;
        let otuLabels = result.otu_labels;
        let sampleValues = result.sample_values;

        otuOrdered = otuID.sort().reverse();  
        console.log(otuOrdered.splice(0,10))
        
// Bar Chart
        let bar = d3.select("#bar")

        barData = [{
            type: 'bar',
            x: otuOrdered.splice(0,10),
            y: sampleValues.splice(0,10),
            text: otuLabels,
            orientation: 'h'
        }];

        var barLayout = {
            title: "Top 10 OTUs per Individual",
            margin: { t: 100, l: 100 }
          };

// Bubble Layout 

        let bubble = d3.select("bubble")

        bubbleData = [{
            x: otuOrdered.splice(0,10),
            y: sampleValues.splice(0,10),
            text: otuLabels,
            mode: "markers",
            marker: {
                size: sampleValues,
                colors: otuOrdered
                }
        }];

        bubbleLayout = [{
            title: 'OTU ID',
            showlegend: false,
            height: 100,
            width: 100,
            hovermode: "closest",
            xaxis: { title: "OTU ID" },

        }];


    Plotly.newPlot("bar", barData, barLayout);
    Plotly.newPlot("bubble", bubbleData, bubbleLayout);

})

};



function init_build() {
    d3.json("../../data/samples.json").then((data) => {
        
        let names=data.names;

        let selectSubject = d3.select("#selDataset")

        names.forEach((sample) => {
            selectSubject
                .append("option")
                .attr("value", sample)
                .text(sample)
        });
    

        console.log(names[0])
        let firstRecord = names[0];

        console.log(firstRecord)
        buildMetadata(firstRecord);
        buildChart(firstRecord);

        }) 
};


function optionChanged(newName) {
    buildMetadata(newName)
    buildChart(newName)};


init_build();









// function plot_chart(data,name) {
//     let samples = data.samples
    
// }









      
        // let resultArray = metadata.filter(obj => obj.id == sample);
        // let result = resultArray[0];
     
        // let panel = d3.select("#sample-metadata");

        // Object.entries(result).forEach([key, value]) => {
        //     panel.append("h6").text(`${key}: ${value}`);
        // }