/**
 * ---------------------------------------
 * This demo was created using amCharts 4.
 *
 * For more information visit:
 * https://www.amcharts.com/
 *
 * Documentation is available at:
 * https://www.amcharts.com/docs/v4/
 * ---------------------------------------
 */

// Themes begin
am4core.useTheme(am4themes_animated);

var chart = am4core.create("chartdiv", am4plugins_forceDirected.ForceDirectedTree);
var networkSeries = chart.series.push(new am4plugins_forceDirected.ForceDirectedSeries())

chart.data = [{
    "name": "First",
    "value": 1,
    "link": ["Second"]
}, {
    "name": "Second",
    "value": 1,
    "link": ["Third"]
}, {
    "name": "Third",
    "value": 1,
    "link": ["First"]
}];
networkSeries.dataFields.value = "value";
networkSeries.dataFields.name = "name";
networkSeries.dataFields.children = "children";
networkSeries.nodes.template.tooltipText = "{name}:{value}";
networkSeries.nodes.template.fillOpacity = 1;

networkSeries.nodes.template.label.text = "{name}";
networkSeries.nodes.template.label.nonScaling = false;
networkSeries.fontSize = '40%';
networkSeries.minRadius = 10;
networkSeries.maxRadius = 10;

//networkSeries.nodes.template.circle.filters.push(new am4core.DropShadowFilter());


networkSeries.links.template.strokeWidth = 1;
networkSeries.dataFields.id = "name";
networkSeries.dataFields.linkWith = "link";

var hoverState = networkSeries.links.template.states.create("hover");
hoverState.properties.strokeWidth = 3;
hoverState.properties.strokeOpacity = 1;

networkSeries.nodes.template.events.on("over", function(event) {
    event.target.dataItem.childLinks.each(function(link) {
        link.isHover = true;
    })
    if (event.target.dataItem.parentLink) {
        event.target.dataItem.parentLink.isHover = true;
    }

})

networkSeries.nodes.template.events.on("out", function(event) {
    event.target.dataItem.childLinks.each(function(link) {
        link.isHover = false;
    })
    if (event.target.dataItem.parentLink) {
        event.target.dataItem.parentLink.isHover = false;
    }
})


networkSeries.nodes.template.togglable = false;
chart.zoomable = true;
networkSeries.nodes.template.events.on("hit", function(event) {
    if (event.target.isActive) {
        chart.zoomToDataItem(event.target.dataItem, 3, true)
    }
    else {
        chart.zoomOut();
    }
});

// var observer = new MutationObserver((mutations) => {
//     mutations.forEach((mutation) => {
//         if (mutation.type === "attributes") {
//             //$('input[name=spantitle]').val($('.multiselect ').attr('title'));
//             $('g[role="menuitem"]').find("g[style='" + "pointer-events: none;" + "']").attr("transform","translate(0,0) scale(1)")
//         }
//     });
// });
//
//
//
//
// $(document).ready(function () {
// //note this observe method
//     console.log($('g[role="menuitem"]').find("g[style='" + "pointer-events: none;" + "']"));
//     observer.observe($('g[style="pointer-events: none;"]')[0], {
//         attributes: true // Listening to the attribute changes
//     });
// });
