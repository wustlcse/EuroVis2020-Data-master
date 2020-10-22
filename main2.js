margin = {
    top: 30,
    right: 80,
    bottom: 5,
    left: 5
}
width = 805
height = 765

const svg = d3.select('#container')
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", 'translate(' + margin.left + ',' + margin.top +')');

const subgraphWidth = width*2/8;
const subgraphHeight = height*1/5;

const subgraph = svg.append("g")
    .attr("id", "subgraph")
    .attr("transform", 'translate(' + (width - subgraphWidth - 20) + ',' + '0)');

subgraph.append("text")
    .style("font-size","16px");

svg.append('defs').append('marker')
    .attr("id",'arrowhead')
    .attr('viewBox','-0 -5 10 10') //the bound of the SVG viewport for the current SVG fragment. defines a coordinate system 10 wide and 10 high starting on (0,-5)
    .attr('refX',24) // x coordinate for the reference point of the marker. If circle is bigger, this need to be bigger.
    .attr('refY',0)
    .attr('orient','auto')
    .attr('markerWidth',6)
    .attr('markerHeight',6)
    .attr('xoverflow','visible')
    .append('svg:path')
    .attr('d', 'M 0,-5 L 10 ,0 L 0,5')
    .attr('fill', '#999')
    .style('stroke','none');

svg.append("text")
    .text("Robot Components")
    .attr("text-anchor","middle")
    .attr("x",width/2)
    .style("font-size","20px")

const dataset =  {
    nodes: [
        {id: 1, name: 'AGGR', label: 'Aggregation', group: 'Team C', runtime: 20},
        {id: 2, name: 'ASMT', label: 'Assessment Repository', group: 'Team A', runtime: 60},
        {id: 3, name: 'CALC', label: 'Final Calc', group: 'Team C', runtime: 30},
        {id: 4, name: 'DEMO', label: 'Demographic', group: 'Team B', runtime: 40},
        {id: 5, name: 'ELIG', label: 'Eligibility', group: 'Team B', runtime: 20},
        {id: 6, name: 'GOAL', label: 'Goal Setting', group: 'Team C', runtime: 60},
        {id: 7, name: 'GROW', label: 'Growth Model', group: 'Team C', runtime: 60},
        {id: 8, name: 'LINK', label: 'Linkage', group: 'Team A', runtime: 100},
        {id: 9, name: 'MOSL', label: 'MOSL', group: 'Team A', runtime: 80},
        {id: 10, name: 'MOTP', label: 'MOTP', group: 'Team A', runtime: 20},
        {id: 11, name: 'REPT', label: 'Reporting', group: 'Team E', runtime: 240},
        {id: 12, name: 'SEDD', label: 'State Data', group: 'Team A', runtime: 30},
        {id: 13, name: 'SNAP', label: 'Snapshot', group: 'Team A', runtime: 40}
    ],
    links: [
        {source: 1, target: 3, type: 'Next -->>'},
        {source: 6, target: 1, type: 'Next -->>'},
        {source: 7, target: 1, type: 'Next -->>'},
        {source: 9, target: 1, type: 'Next -->>'},
        {source: 2, target: 4, type: 'Next -->>'},
        {source: 2, target: 6, type: 'Next -->>'},
        {source: 2, target: 7, type: 'Next -->>'},
        {source: 2, target: 8, type: 'Next -->>'},
        {source: 2, target: 9, type: 'Next -->>'},
        {source: 10, target: 3, type: 'Next -->>'},
        {source: 3, target: 11, type: 'Next -->>'},
        {source: 8, target: 5, type: 'Go to ->>'},
        {source: 8, target: 11, type: 'Go to ->>'},
        {source: 6, target: 9, type: 'Go to ->>'},
        {source: 7, target: 9, type: 'Go to ->>'},
        {source: 8, target: 9, type: 'Go to ->>'},
        {source: 9, target: 11, type: 'Go to ->>'},
        {source: 12, target: 9, type: 'Go to ->>'},
        {source: 13, target: 11, type: 'Go to ->>'},
        {source: 13, target: 2, type: 'Go to ->>'},
        {source: 13, target: 4, type: 'This way>>'},
        {source: 13, target: 5, type: 'This way>>'},
        {source: 13, target: 8, type: 'This way>>'},
        {source: 13, target: 9, type: 'This way>>'},
        {source: 13, target: 10, type: 'This way>>'},
        {source: 4, target: 7, type: 'Next -->>'},
        {source: 10, target: 5, type: 'Next -->>'},
        {source: 4, target: 2, type: 'Next -->>'},
        {source: 5, target: 3, type: 'Next -->>'}
    ]
};

// Initialize the links
const link = svg.selectAll(".links")
    .data(dataset.links)
    .enter()
    .append("line")
    .attr("class", "links")
    .attr("stroke","#999")
    .attr("stroke-width","2px")
    .style("opacity", 0.8)
    .attr("id",d=> "line"+d.source+d.target)
    .attr("class", "links")
    .attr('marker-end','url(#arrowhead)') //The marker-end attribute defines the arrowhead or polymarker that will be drawn at the final vertex of the given shape.

link.append("title")
    .text(d => d.type);

const edgepaths = svg.selectAll(".edgepath") //make path go along with the link provide position for link labels
    .data(dataset.links)
    .enter()
    .append('path')
    .attr('class', 'edgepath')
    .attr('fill-opacity', 0)
    .attr('stroke-opacity', 0)
    .attr('id', function (d, i) {return 'edgepath' + i})
    .style("pointer-events", "none");

const edgelabels = svg.selectAll(".edgelabel")
    .data(dataset.links)
    .enter()
    .append('text')
    .style("pointer-events", "none")
    .attr('class', 'edgelabel')
    .attr('id', function (d, i) {return 'edgelabel' + i})
    .attr('font-size', 10)
    .attr('fill', '#aaa');

edgelabels.append('textPath') //To render text along the shape of a <path>, enclose the text in a <textPath> element that has an href attribute with a reference to the <path> element.
    .attr('xlink:href', function (d, i) {return '#edgepath' + i})
    .style("text-anchor", "middle")
    .style("pointer-events", "none")
    .attr("startOffset", "50%")
    .text(d => d.type);

// Initialize the nodes
const node = svg.selectAll(".nodes")
    .data(dataset.nodes)
    .enter()
    .append("g")
    .attr("class", "nodes")

node.call(d3.drag() //sets the event listener for the specified typenames and returns the drag behavior.
    .on("start", dragstarted) //start - after a new pointer becomes active (on mousedown or touchstart).
    .on("drag", dragged)      //drag - after an active pointer moves (on mousemove or touchmove).
);

node.append("circle")
    .attr("r", d=> 17)//+ d.runtime/20 )
    .attr("id",d=> "circle"+d.id)
    .style("stroke", "grey")
    .style("stroke-opacity",0.3)
    .style("stroke-width", d => d.runtime/10)
    .style("fill", function (d)
    {
        return "blue";
    })

node.append("title")
    .text(d => d.id + ": " + d.label + " - " + d.group +", runtime:"+ d.runtime+ "min");

node.append("text")
    .attr("dy", 4)
    .attr("dx", -15)
    .text(d => d.name);
node.append("text")
    .attr("dy",12)
    .attr("dx", -8)
    .text(d=> d.runtime);