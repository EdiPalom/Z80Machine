
window.onload = (()=>{
    const canvas = document.querySelector("#canvas");

    const context = canvas.getContext("2d");

    const width = canvas.width;
    const height = canvas.height;

    // const pixel_size = canvas.width / 320;
    const pixels_width = 320;
    const pixel_size = width / pixels_width;
    // console.log(pixel_size);

    const screenData = context.getImageData(0,0,width,height);

    let data = screenData.data;
    

    function put_pixel(pos,r = 0,g = 0,b = 0)
    {
        let index=pos*4
        data[index] = r;
        data[index + 1] = g;
        data[index + 2] = b;
        data[index + 3] = 255;
    }

    function put_pointer_position(x,y,r,g,b)
    {
        let lx = x * pixel_size;
        let ly = y * pixel_size;
        // let ly = Math.trunc(p/* o */s/320);

        for(let y = ly; y < ly + pixel_size; y++)
        {
            for(let x = lx; x < lx + pixel_size; x++)
            {
                put_pixel(x+(width * y),r,g,b)
            }
        }
    }

    function put_pointer_index(index,r,g,b)
    {
        let lx = (index % pixels_width) * pixel_size;
        let ly = Math.trunc(index / pixels_width) * pixel_size;

        for(let y = ly; y < ly + pixel_size; y++)
        {
            for(let x = lx; x < lx + pixel_size; x++)
            {
                put_pixel(x+(width * y),r,g,b)
            }
        }
    }

    // put_pointer_position(0,0,255,0,0);
    // put_pointer_position(1,0,0,255,0);
    // put_pointer_position(0,199,0,0,255);

    // put_pointer(3,3,255,0,0);
    // put_pointer_index(320 * 199,255,0,0);
    // put_pointer_index(640,255,0,0);
    // put_pointer_index(0,255,0,0);
    // put_pointer_index(320,0,255,0);

    // put_pointer(199 * 320,255,0,0);
    // put_pointer(0,255,0,0);
    // put_pointer(320,255,0,0);
    // put_pointer(640,0,255,0);
    
    context.putImageData(screenData,0,0);
})();

