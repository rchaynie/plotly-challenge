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

        otuOrdered = otuID.slice(0,10).map(otuID => `otu${otuID}`).reverse();  
        sampleValueY= sampleValues.slice(0,10).reverse();
        labelText = otuLabels.slice(0,10).reverse();
        console.log(otuOrdered);
        console.log(labelText);
        console.log(sampleValueY);
        
// Bar Chart
        //let bar = d3.select("#bar")

        barData = [{
            x: sampleValueY,
            y: otuOrdered,
            text: labelText,
            type: 'bar',
            orientation: 'h'
            
        }];

        console.log(barData)

        barLayout = {
            title: "Top 10 OTUs per Individual",
            margin: { t: 100, l: 100 },
    
          };

// Bubble Layout 

        //otuOrdered2 = otuID.slice(0,10).map(otuID => `otu${otuID}`).reverse();  
        //sampleValueY2= sampleValues.slice(0,10).reverse();
        //labelText2 = otuLabels.slice(0,10).reverse();

        //let bubble = d3.select("bubble")

        bubbleData = [{
            x: otuID,
            y: sampleValues,
            text: otuLabels,
            mode: "markers",
            marker: {
                size: sampleValues,
                color: otuID, 
                colorscale: 'Earth'
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





