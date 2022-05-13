function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    var sampleNames = data.names;

    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    // buildMetadata(firstSample);
  });
}

// Initialize the dashboard
init();

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  // buildMetadata(newSample);
  buildCharts(newSample);
  
}

// // Demographics Panel 
// function buildMetadata(sample) {
//   d3.json("samples.json").then((data) => {
//     var metadata = data.metadata;

//     // Filter the data for the object with the desired sample number
//     var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
//     var result = resultArray[0];
    
//     // Use d3 to select the panel with id of `#sample-metadata`
//     var PANEL = d3.select("#sample-metadata");

//     // Use `.html("") to clear any existing metadata
//     PANEL.html("");

//     // Use `Object.entries` to add each key and value pair to the panel
//     // Hint: Inside the loop, you will need to use d3 to append new
//     // tags for each key-value in the metadata.
//     Object.entries(result).forEach(([key, value]) => {
//       PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
//     });

//   });
// }

// 1. Create the buildCharts function.
function buildCharts(sample) {

  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    console.log(metadata);
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    var Washing_frequency = result.wfreq;
    console.log(Washing_frequency);
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });

  // 2. Use d3.json to load and retrieve the samples.json file 
  d3.json("samples.json").then((data) => {
    // 3. Create a variable that holds the samples array. 
    var holdsSamples = data.samples;
    console.log(holdsSamples);
    // 4. Create a variable that filters the samples for the object with the desired sample number.
    var filtersample = holdsSamples.filter(sampleObj => sampleObj.id == sample);
    //  5. Create a variable that holds the first sample in the array.
    var firstsample = filtersample[0];
    console.log(firstsample);
    
    // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
    var holds_otu_ids = firstsample.otu_ids;
    var holds_otu_labels = firstsample.otu_labels;
    var holds_sample_values = firstsample.sample_values;
    console.log(holds_otu_ids);

    var topFiveCityGrowths = filtersample.map(city => (city.otu_ids));
    console.log(topFiveCityGrowths[0][0]);
    // 7. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order  
    //  so the otu_ids with the most bacteria are last. 
    // var top_otu_ids = holds_otu_ids.slice(0,10);
    // for (i=0; i<=10; i++){
    //   var top_otu_ids= holds_otu_ids[i].toString();

    // };
    // console.log(top_otu_ids);
    // var yticks = (top_otu_ids.sort((a,b) => b - a));
    // var xplus = yticks.toString();
    // console.log(yticks);
    // console.log(xplus);
    console.log(holds_otu_ids[3]);
    var top_sample = holds_sample_values.slice(0,10);
    var yticks = (top_sample.sort((a,b) => a - b));
    console.log(yticks);
    // 8. Create the trace for the bar chart. 
    var barData = {
      // y: [topFiveCityGrowths[0][0].toString(),holds_otu_ids[1].toString(),holds_otu_ids[2].toString(),holds_otu_ids[3].toString(),holds_otu_ids[4].toString(),holds_otu_ids[5].toString(),holds_otu_ids[6].toString(),holds_otu_ids[7].toString(),holds_otu_ids[8].toString(),holds_otu_ids[9].toString()],
      y: [
      "OTU1",
      "OTU2",
      "OTU3",
      "OTU4",
      "OTU5",
      "OTU6",
      "OTU7",
      "OTU8",
      "OTU9",
      "OTU10"],
      x:top_sample,
      text: holds_otu_labels,
      orientation: "h",
      type: "bar"
      
    };
    
    // 9. Create the layout for the bar chart. 
    var barLayout = {
      title: "Top 10 Bacteria Cultures Found",
      
    };
    // 10. Use Plotly to plot the data with the layout. 
    Plotly.newPlot("bar", [barData], barLayout);
  

      // 1. Create the trace for the bubble chart.
      var bubbleData = {
      x: holds_otu_ids,
      y:holds_sample_values,
      text: holds_otu_labels,
      mode: "markers",
      marker: {
        color: holds_otu_ids,
        size: holds_sample_values,
        }
      };
  
      // 2. Create the layout for the bubble chart.
      var bubbleLayout = {
        title: 'Bacteria Cultures Per Sample',
        };
  
      // 3. Use Plotly to plot the data with the layout.
      Plotly.newPlot("bubble", [bubbleData], bubbleLayout); 


          // 5. Create the layout for the gauge chart.
    var gaugeData = [
      {
        domain: { x: [0, 1], y: [0, 1] },
        value: Washing_frequency,
        title: { text: "Scrubs per Week" },
        type: "indicator",
        mode: "gauge+number",
        gauge: {
          axis: { range: [null, 10]},
          bar:{ color: "black" },
          steps: [
            { range: [0, 2], color: "red" },
            { range: [2, 4], color: "orange" },
            { range: [4, 6], color: "yellow" },
            { range: [6, 8], color: "lightgreen" },
            { range: [8, 10], color: "green" }
          ],
        
        }
      }
     
    ];
    
    // 4. Create the trace for the gauge chart.
    var gaugeLayout = { 
      // width: 600, 
      // height: 500, 
      title: '<b>Belly Button Washing Frequency</b>',
      
        
      // margin: { t: 0, b: 0 } 
    };

    // 6. Use Plotly to plot the gauge data and layout.
    Plotly.newPlot("gauge",gaugeData,gaugeLayout);
  });
}
  )}
      
