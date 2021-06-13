
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

    const MEMORY_SIZE = 65536;

    const A = 0x0000;
    const B = 0x0001;
    const C = 0x0002;
    const D = 0x0003;
    const E = 0x0004;
    const F = 0x0005;
    const H = 0x0006;
    const L = 0x0007;

    let PC = 0x4000;

    let buffer = new ArrayBuffer(MEMORY_SIZE);
    let memory = new Uint8Array(buffer);

    let data = screenData.data;

    init_machine();

    function init_machine()
    {
        for(let i = 0; i < MEMORY_SIZE; i++)
            memory[i] = 0x00;
    }

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
        // console.time('test');
        // time of execution 2ms

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

        // console.timeEnd('test');
    }

    function put_pointer_index(index,r,g,b)
    {
        // console.time('test');
        // time of execution 3ms
        let lx = (index % pixels_width) * pixel_size;
        let ly = Math.trunc(index / pixels_width) * pixel_size;

        for(let y = ly; y < ly + pixel_size; y++)
        {
            for(let x = lx; x < lx + pixel_size; x++)
            {
                put_pixel(x+(width * y),r,g,b)
            }
        }

        // console.timeEnd('test');
    }

    function get_pixel_color(opc)
    {
        if(opc == 0x11)
            return [247,0,0];
        if(opc == 0x10)
            return [247,247,0];
        if(opc == 0x01)
            return [0,254,254];
        if(opc == 0x00)
            return [0,39,251];
        
        return [0,0,0]
    }

    function get_colors(Byte)
    {
        let pixels = []

        for (let j = 3; j >= 0; --j)
        {
            let opcode = (Byte>>j)&0x11;
            let color = get_pixel_color(opcode);
            pixels.push(color);
        }
        
        return pixels;
    }

    // put_pointer_index(320 * 199,255,0,0);
    // put_pointer_position(0,199,0,255,0);
    
    function draw_pixels(posX,posY,Byte)
    {
        let lx = posX * 4;

        let pixels = get_colors(Byte);
        
        put_pointer_position(lx,posY,pixels[0][0],pixels[0][1],pixels[0][2]);
        put_pointer_position(lx + 1,posY,pixels[1][0],pixels[1][1],pixels[1][2]);
        put_pointer_position(lx+2,posY,pixels[2][0],pixels[2][1],pixels[2][2]);
        put_pointer_position(lx+3,posY,pixels[3][0],pixels[3][1],pixels[3][2]);
    }

    function read_memory_video()
    {
        for(let y = 0; y < 200; y++)
        {
            for(let x = 0; x < 80; x++)
            {
                // console.log(0xc000 + (x+(y*80)));
                draw_pixels(x,y,memory[(0xc000 + (x+(y*80)))])
            }
        }
    }
        
    // memory[0xc000] = 0x80;//start position in video;
    // memory[0xc001] = 0x88;
    // memory[0xfe7f] = 0xff; // last position in video;
    //
    //
    function get_address()
    {
        return (memory[PC+1] << 8) | memory[PC];
    }

    function LDAN()
    {
        memory[A]= memory[PC];
        PC+=1;
    }

    function LDNNA()
    {
        memory[get_address()] = memory[A];
        PC+=2;
    }

    function JRN()
    {
        return;
    }

    let instructions = []

    // instructions.push(LDA);
    instructions[0x3e] = LDAN;
    instructions[0x32] = LDNNA;
    instructions[0x18] = JRN;

    memory[PC] = 0x3e;
    memory[PC+1] = 0xca;
    memory[PC+2] = 0x32;
    memory[PC+3] = 0x00;
    memory[PC+4] = 0xc0;
    memory[PC+5] = 0x18;

    let opcode = 0x00;
    do
    {
        opcode = memory[PC];
        PC+=1;

        instructions[opcode]();
    }while(opcode != 0x18);

    read_memory_video();

    context.putImageData(screenData,0,0);
})();

