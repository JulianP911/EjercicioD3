// Url donde se encuentra los datos necesarios para la grafica 1
const urlGrafica1 = "https://gist.githubusercontent.com/josejbocanegra/d3b9e9775ec3a646603f49bc8d3fb90f/raw/3a39300c2a2ff8644a52e22228e900251ec5880a/population.json";

d3.json(urlGrafica1).then(data => {
    // Obtener el elemento canvas del html
    const canvas = d3.select("#canvas");

    // Caracteristicas del canvas
    const widhtG1 = 700;
    const heightG1 = 500;
    const marginG1 = {top:10, left:90, bottom: 40, right: 10};
    const iwidthG1 = widhtG1 - marginG1.left - marginG1.right;
    const iheightG1 = heightG1 - marginG1.top - marginG1.bottom;
    
    // Creacion del elemento svg para la grafica 1 con sus atributos
    const svgG1 = canvas.append("svg");
    svgG1.attr("width", widhtG1);
    svgG1.attr("height", heightG1);

    let g1 = svgG1
        .append("g").attr("transform", `translate(${marginG1.left}, ${marginG1.top})`);

    // Creacion de las barras de la grafica
    const bars = g1.selectAll("rect").data(data);

    // Dominio en x de la grafica 1
    const x1 = d3.scaleLinear() 
        .domain([0, 980000])
        .range([0, iwidthG1]);

    // Dominio en y de la grafica 1
    const y1 = d3.scaleBand() 
        .domain(data.map(d => d.name)) 
        .range([0, iheightG1])
        .padding(0.1); 

    // Configuracion de cada barra perteneciente a la grafica 1 con sus especificaciones
    bars.enter().append("rect")
        .attr("class", "bar")
        .attr("fill", "steelblue")
        .attr("x", () => x1(0))
        .attr("y", (d) => y1(d.name))
        .attr("height", y1.bandwidth())
        .attr("width", d => x1(d.value));

    // Eje x de la grafica 1 corresponde al numero de refugiados
    g1.append("g")
        .classed("x--axis", true)
        .call(d3.axisBottom(x1))
        .attr("transform", `translate(0, ${iheightG1})`); 
        
    // Eje y de la grafica 1 corresponde a los paises de procedencia
    g1.append("g")
        .classed("y--axis", true)
        .call(d3.axisLeft(y1));

    // Titulo de la grafica 1
    g1.append("text")
        .attr("text-anchor", "middle")
        .style("font-size", "14px")
        .attr("x", 370)
        .attr("y", 15)
        .text("Número de refugiados por País de Procedencia");

    // Descripcion del eje x (label x) de la grafica 1
    g1.append("text")
        .attr("class", "x label")
        .attr("text-anchor", "end")
        .style("font-size", "14px")
        .attr("x", 390)
        .attr("y", 485)
        .text("Número de refugiados");

    // Descripcion del eje y (label y) de la grafica 1
    g1.append("text")
        .attr("class", "y label")
        .attr("text-anchor", "end")
        .style("font-size", "14px")
        .attr("x", -170)
        .attr("y", -70)
        .attr("transform", "rotate(-90)")
        .text("País de precedencia");
});

// Url donde se encuentra los datos necesarios para la grafica 2
const urlGrafica2 = "https://gist.githubusercontent.com/josejbocanegra/000e838b77c6ec8e5d5792229c1cdbd0/raw/83cd9161e28e308ef8c5363e217bad2b6166f21a/countries.json";

d3.json(urlGrafica2).then(data => {
    // Obtener el elemento canvas del html
    const canvas = d3.select("#canvas");

    // Caracteristicas del canvas
    const widhtG2 = 800;
    const heightG2 = 600;
    const marginG2 = {top:10, left:50, bottom: 40, right: 10};
    const iwidthG2 = widhtG2 - marginG2.left - marginG2.right;
    const iheightG2 = heightG2 - marginG2.top - marginG2.bottom;

    // Creacion del elemento svg para la grafica 12con sus atributos
    const svgG2 = canvas.append("svg");
    svgG2.attr("width", widhtG2);
    svgG2.attr("height", heightG2);

    let g2 = svgG2
        .append("g").attr("transform", `translate(${marginG2.left}, ${marginG2.top})`);

    // Creacion de las circulos de la grafica
    const circles = g2.selectAll("circle").data(data);

    // Dominio en x de la grafica 2
    const x2 = d3.scaleLinear() 
        .domain([0, 40000])
        .range([0, iwidthG2]);

    // Dominio en y de la grafica 2
    const y2 = d3.scaleLinear() 
        .domain([0, 100])
        .range([iheightG2, 0]);

    // Arreglo con las poblaciones de todos los paises
    let arrayPopulations = []
    data.forEach((e) => {
        arrayPopulations.push(parseInt(e.population));
    });

    // Configuracion de cada circulo perteneciente a la grafica 2 con sus especificaciones
    circles.enter().append("circle")
        .attr("class", "point")
        .attr("fill", "steelblue")
        .attr("cx", (d) => x2(d.purchasingpower))
        .attr("cy", (d) => y2(d.lifeexpectancy))
        .attr("r", (d) => (d.population / Math.max.apply(null, arrayPopulations))*100);

    // Configuracion de texto que tiene cada circulo perteneciente a la grafica 2 para indicar el pais
    circles.enter().append("text")
        .attr("x", (d) => x2(d.purchasingpower) + 19)
        .attr("y", (d) => y2(d.lifeexpectancy) + 1)
        .style("font-size", "14px")
        .text((d) => d.country);

    // Eje x de la grafica 2 corresponde al poder adquisitivo
    g2.append("g")
        .classed("x--axis", true)
        .call(d3.axisBottom(x2))
        .attr("transform", `translate(0, ${iheightG2})`); 
        
    // Eje y de la grafica 2 corresponde a l a expectativa de vida
    g2.append("g")
        .classed("y--axis", true)
        .call(d3.axisLeft(y2));

    // Titulo de la grafica 2
    g2.append("text")
        .attr("text-anchor", "middle")
        .style("font-size", "14px")
        .attr("x", 370)
        .attr("y", 10)
        .text("Expectativa de vida vs Poder adquisitivo por país");

    // Descripcion del eje x (label x) de la grafica 2
    g2.append("text")
        .attr("class", "x label")
        .attr("text-anchor", "end")
        .style("font-size", "14px")
        .attr("x", 420)
        .attr("y", 585)
        .text("Poder adquisitivo");

    // Descripcion del eje y (label y) de la grafica 2
    g2.append("text")
        .attr("class", "y label")
        .attr("text-anchor", "end")
        .style("font-size", "14px")
        .attr("x", -220)
        .attr("y", -32)
        .attr("transform", "rotate(-90)")
        .text("Expectativa de vida");
});