// get our url for the data
var url = "/resources/energy_final";

// rename the variables for the dropdownn 
var plotNames = {
    LPG: "LPG",
    Naturalgas: "Natural Gas",
    Fueloil: "Fuel oil",
    Diesel: "Diesel",
    Blackcoal: "Black coal",
    Solarenergy: "Solar energy",
    Electricity: "Electricity",
    "Liquid/gasBiofuels" : "Liquid /gasBiofuels",
    Browncoal : "Brown coal"
    
};

// Select data and get value variale for the plot
d3.json(url, function(data) {
    document.getElementById("energy_final").addEventListener("change", function() {
        var value = this[this.selectedIndex].value;
        getPlot(value, data);
    });

    //  select and get dropdown variable
    var dropdown = d3.select("#Visualization");

    //  create keys variable
    var keys = Object.keys(data);

    // select the data for the dropdwown menu
    keys.forEach(function(d) {
        if (d !== "location" && d !== "id" && d !== "value" && d !== "industry" && d !== "fuel_consumed") {
            dropdown.append("option").text(plotNames[d]).property("value", d);
        }       
    });
    //  display the plot for the second index value
    getPlot(keys[1], data);

    // Select biopower_solid by default
    document.getElementById("energy_final").options.selectedIndex = 1;

    //  create a function that creates the plot
    function getPlot(value, data) {
        //  create the trace variable
        var trace = {
            x: data.state,
            y: data[value],
            mode:"markers",
            type: "scatter",
            name: value,
            marker: {
                size: 14,
                color: 'rgb(44, 160, 101)',
            },      
        };

        // create the layout
        var layout = {
            title: "<b> Energy Comparison for States</b>",
            font:{
                size: 12
            },
            // showlegend: true,
            xaxis: { 
                title : "States",
                tickangle: -40,
                dtick:1
            },
            margin: {
                l: 50,
                r: 50,
                b: 100,
                t: 100,
                pad: 5
            },
            legend:{
                bgcolor: "#E2E2E2 "
            },
            yaxis:{
                title: "unit (Gwhs)"
            }
        };
        // create the plot
        Plotly.newPlot("plot3", [trace], layout, {responsive: true});
    }
});

//  get the data with url
d3.json(url, function(data) {
   
    //  create renewable variable to store total values for each renewable type
    var energy = [];

    //  assign data values to a varibale
    var data_values = Object.values(data)
    // console.log(data_values)


    // loop through array of arrays to get total varibale value for each renewable energy type
    for (var i=0; i< data_values.length; i++){
        var total = 0;
        if ( i!= 14 && i!= 7 && i!= 11 && i!=10 && i!=4){
            for (var j=0; j< data_values[i].length; j ++){
                total += data_values[i][j]
            }
            // push the totals in the renewable array
            energy.push(total)
        }
    };

    //  create renevable_names array for the renewable energy names
    var energy_names = [];
    var names = Object.keys(data);
    
    // loop through the Object.keys values to grab desired renewable energy names
    for (var i=0; i < names.length; i ++){
        if (names[i] != "energy_consumption" && names[i] != "rank" && names[i] !="id" &&
         names[i] != "state" && names[i] != "population"){
             energy_names.push(plotNames[names[i]])
        }
    };

    //  create trace2 and data_total variables for the plot
    var trace2 = {
        x: energy_names,
        y: energy,
        type: "bar",
        name:"Unit (Gwhs)",
        marker: {
            color: "#fd8d3c"
        }
    };

    var data_total = [trace2];

    // create layout variable for the plot's styling
    var layout = {
        title:"<b>Greatest Potential Energy by Type</b>",
        xaxis:{
            title:"Renewable Energy Types",
            tickangle: -20
        },
        showlegend: true,
        legend:{
            bgcolor: "#E2E2E2 "
        }
    }

    // create the new plot
    Plotly.newPlot("plot4", data_total, layout, {responsive: true})

});