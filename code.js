
window.onload = (()=>{
    const canvas = document.querySelector("#canvas");

    const context = canvas.getContext("2d");

    const width = canvas.width;
    const height = canvas.height;

    const screenData = context.getImageData(0,0,width,height);

    let data = screenData.data;

    for(let i = 0; i < width * height; i++)
    {
        let index = i * 4;
        data[index] = 0;
        data[index + 1] = 0;
        data[index + 2] = 170;
        data[index + 3] = 255;
    }

    context.putImageData(screenData,0,0);
})();

