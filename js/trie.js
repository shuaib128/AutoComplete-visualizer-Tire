document.addEventListener("DOMContentLoaded", function () {
    const data = {
        name: "", // Root node, usually empty or null
        children: [
            {
                name: "a",
                children: [
                    {
                        name: "r",
                        children: [
                            {
                                name: "t",
                                children: [
                                    {
                                        name: "i",
                                        children: [
                                            {
                                                name: "c",
                                                children: [
                                                    {
                                                        name: "l",
                                                        children: [
                                                            {
                                                                name: "e",
                                                                children: [],
                                                                isWord: true, // Indicates full word 'article'
                                                            },
                                                        ],
                                                    },
                                                ],
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                name: "m",
                                children: [
                                    {
                                        name: "y",
                                        children: [],
                                        isWord: true, // 'army'
                                    },
                                    {
                                        name: "o",
                                        children: [
                                            {
                                                name: "r",
                                                children: [],
                                                isWord: true, // 'armor'
                                            },
                                        ],
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
            // Continue similarly for other letters
        ],
    };

    const svg = d3.select("#tree-container"),
        width = +svg.attr("width"),
        height = +svg.attr("height"),
        margin = { top: 20, right: 120, bottom: 20, left: 120 },
        innerWidth = width - margin.left - margin.right,
        innerHeight = height - margin.top - margin.bottom;

    const treeLayout = d3.tree().size([innerHeight, innerWidth]);

    const zoom = d3
        .zoom()
        .scaleExtent([0.1, 3])
        .on("zoom", (event) => {
            g.attr("transform", event.transform);
        });

    const g = svg
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    svg.call(zoom);

    // Assuming data is loaded and parsed here
    const root = d3.hierarchy(data); // data should be your dataset
    treeLayout(root);

    const links = g
        .selectAll(".link")
        .data(root.links())
        .enter()
        .append("path")
        .attr("class", "link")
        .attr(
            "d",
            d3
                .linkVertical()
                .x((d) => d.x)
                .y((d) => d.y)
        );

    const nodes = g
        .selectAll(".node")
        .data(root.descendants())
        .enter()
        .append("g")
        .attr("class", "node")
        .attr("transform", (d) => `translate(${d.x},${d.y})`);

    nodes.append("circle").attr("r", 10);

    nodes
        .append("text")
        .attr("dy", "0.35em")
        .attr("x", (d) => (d.children ? -15 : 15))
        .style("text-anchor", (d) => (d.children ? "end" : "start"))
        .text((d) => d.data.name);
});
