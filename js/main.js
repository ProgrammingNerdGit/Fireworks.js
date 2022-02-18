let canvas = document.querySelector('canvas');

let num_lights = 1

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let ctx = canvas.getContext('2d')
let canvasData = ctx.getImageData(0, 0, canvas.width, canvas.height);

let baseColorMatrix = []
for(let x = 0; x < canvas.width; x++){
    baseColorMatrix.push([]);
    for(let y = 0; y < canvas.height; y++)
        baseColorMatrix[x][y] = [0,0,0]
}
    
let cvMapCol = Math.sqrt((canvas.width*canvas.width) + (canvas.height*canvas.height))/4;

//
let lightPoints = []; // [x, y, vx, vy]
for(let i = 0; i < num_lights; i++){
    a = Math.random() * Math.PI;
    obj = [
        Math.random()*canvas.width,
        Math.random()*canvas.height,
        Math.sin(a)*1,
        Math.cos(a)*1
    ];
    lightPoints.push(obj);
}

function drawPixel (x, y, r, g, b, a) {
    var index = (x + y * canvas.width) * 4;
    
    canvasData.data[index + 0] = r;
    canvasData.data[index + 1] = g;
    canvasData.data[index + 2] = b;
    canvasData.data[index + 3] = a;
}

function update(){
    lightPoints.forEach(point => {
        point[0] += point[2];
        point[1] += point[3];
    });
}

function animation(){
    requestAnimationFrame(animation);
    
    update();

    let colorMatrix = [...baseColorMatrix]

    lightPoints.forEach(point => {
        for(let x = 0; x < canvas.width; x++){
            for(let y = 0; y < canvas.height; y++){
                let dx = (x-point[0])*(x-point[0])
                let dy = (y-point[1])*(y-point[1])

                let dist = Math.sqrt(dx+dy);

                let mag = 255/dist * 10; //! 10 IS INTENCITY

                colorMatrix[x][y] = [mag+colorMatrix[x][y][0], mag+colorMatrix[x][y][1], mag+colorMatrix[x][y][2]]
            }
        }
    });

    for(let x = 0; x < canvas.width; x++){
        for(let y = 0; y < canvas.height; y++){
            let color = colorMatrix[x][y];
            drawPixel(x, y, color[0]/num_lights, color[1]/num_lights, color[2]/num_lights, 255);
            colorMatrix[x][y] = [0,0,0]
        }
    }  
    
    

    ctx.putImageData(canvasData, 0, 0);
}

animation();