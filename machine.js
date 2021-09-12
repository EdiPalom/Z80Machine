var Machine = function(){

    const canvas = document.querySelector("#canvas");

    const context = canvas.getContext("2d");

    // const memdisplay = document.querySelector("#clipboard");

    // memdisplay.textContent = "Hello";

    const width = canvas.width;
    const height = canvas.height;

    // const pixel_size = canvas.width / 320;
    const pixels_width = 320;
    const pixel_size = width / pixels_width;
    // console.log(pixel_size);

    const screenData = context.getImageData(0,0,width,height);

    const MEMORY_SIZE = 65536;

    const A = 0;
    const B = 1;
    const C = 2;
    const D = 3;
    const E = 4;
    const F = 5;
    const H = 6;
    const L = 7;

    let SP = 0x1000;

    let PC = 0x4000;

    let buffer = new ArrayBuffer(MEMORY_SIZE);
    let memory = new Uint8Array(buffer);

    let data = screenData.data;

    let instructions = []

    const init_machine = ()=>{
        for(let i = 0x4000; i < MEMORY_SIZE; i++)
            memory[i] = 0x00;
        PC = 0x4000;
    };

    init_machine();

    const put_pixel = (pos,r = 0,g = 0,b = 0)=>{
        let index=pos*4
        data[index] = r;
        data[index + 1] = g;
        data[index + 2] = b;
        data[index + 3] = 255;
    };

    const put_pointer_position = (x,y,r,g,b) =>{
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
    };

    const put_pointer_index = (index,r,g,b)=>{
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
    };

    const get_pixel_color = (opc)=>{
        if(opc == 0x11)
            return [247,0,0];
        if(opc == 0x10)
            return [247,247,0];
        if(opc == 0x01)
            return [0,254,254];
        if(opc == 0x00)
            return [0,0,128];
        
        return [0,0,0]
    };

    const get_colors = (Byte) =>{
        let pixels = []

        for (let j = 3; j >= 0; --j)
        {
            let opcode = (Byte>>j)&0x11;
            let color = get_pixel_color(opcode);
            pixels.push(color);
        }
        
        return pixels;
    };

    // put_pointer_index(320 * 199,255,0,0);
    // put_pointer_position(0,199,0,255,0);
    
    const draw_pixels = (posX,posY,Byte)=>{
        let lx = posX * 4;

        let pixels = get_colors(Byte);
        
        put_pointer_position(lx,posY,pixels[0][0],pixels[0][1],pixels[0][2]);
        put_pointer_position(lx + 1,posY,pixels[1][0],pixels[1][1],pixels[1][2]);
        put_pointer_position(lx+2,posY,pixels[2][0],pixels[2][1],pixels[2][2]);
        put_pointer_position(lx+3,posY,pixels[3][0],pixels[3][1],pixels[3][2]);
    };

    const raster = ()=>{
        for(let y = 0; y < 200; y++)
        {
            for(let x = 0; x < 80; x++)
            {
                // console.log(0xc000 + (x+(y*80)));
                draw_pixels(x,y,memory[(0xc000 + (x+(y*80)))])
            }
        }
    };
    
    const update_canvas = ()=>{
        context.putImageData(screenData,0,0);
    };
        
    const get_address = ()=>{
        return (memory[PC+1] << 8) | memory[PC];
    };

    const LDAN = ()=>{
        memory[A]= memory[PC];
        PC+=1;
    };

    const LDNNA = ()=>{
        memory[get_address()] = memory[A];
        PC+=2;
    };

    const JRN = ()=>{
        return;
    };

    const JPNN = ()=>{
        PC = get_address();
    };

    const LDHLNN = ()=>{
        let address = get_address();
        memory[L] = address & 0xFF;
        memory[H] = address >> 8 & 0xFF;
        PC+=2;
    };

    const LDMEMHL = ()=>{
        let address = get_address();
        memory[address] = memory[L];
        memory[address+1] = memory[H];
        PC+=2;
    };

    const NOP = ()=>{
        return;
    };

    const LDMEMHLN = ()=>{
        let address = memory[H].toString(16).padStart(2,"0") + memory[L].toString(16).padStart(2,"0");
        memory[parseInt(address,16)] = memory[PC];
        PC+=1;
    };

    const LDLN = ()=>{
        memory[L] = memory[PC];
        PC+=1;
    };

    const INCL = ()=>{
        //memory[L] += 1;
        memory[L] = sum(memory[L],1);
    };

    const DECL = ()=>{
        memory[L] = sum(memory[L],-1);
//        memory[L] -= 1;
//        memory[L] = sum(memory[L],-1);
    };

    const XORL = ()=>{
        memory[L] = memory[L] ^ memory[L];
    };

    const CALL = ()=>{
        let pc = PC + 2;
        let low = pc & 0xff;
        let high = pc >> 8 & 0xff;
        memory[SP] = low;
        SP+=1;
        memory[SP] = high;
//        console.log(`${PC} ${get_address()}`);
        PC = get_address();
        
    };

    const RET = ()=>{
        let address = memory[SP];
        SP-=1;
        address = address << 8 | memory[SP];

        PC = address;
    };

    let DECA = ()=>{
        //memory[A] = memory[A] - 1;
        memory[A] = sum(memory[A],-1);
       // memory[A] -= 1;
    };

    let INCA = ()=>{
        //memory[A]+=1;
        memory[A] = sum(memory[A],1);
    }

    // const DEC = (reg) =>{
    //     memory[reg] = sum(memory[reg],-1);
    // };

    const JPNZNN = ()=>{
        //console.log((memory[F]>>6) & 0xff);
        if((memory[F] >> 6) & 0xff)
            PC = get_address();
        else
            PC+=2;
    };

    const zero_flag = (ac)=>{

        let reg = ac ? 0x00 : 0x01;
        
        reg = reg<<6;
        memory[F] = memory[F] | reg;
    };

    const sum = (reg,num)=>{
        let r = reg + num;
        zero_flag(r);
        return r;
    };

    const INCMEMHL =()=> {
        let a = memory[H].toString(16).padStart(2,"0") + memory[L].toString(16).padStart(2,"0");
        let address = parseInt(a,16);
        memory[address] = sum(memory[address],1);
    };

    const DECMEMHL =()=> {
        let a = memory[H].toString(16).padStart(2,"0") + memory[L].toString(16).padStart(2,"0");
        let address = parseInt(a,16);
        memory[address] = sum(memory[address],-1);
    };
    
          

    // instructions.push(LDA);
    instructions[0x00] = NOP;
    instructions[0x18] = JRN;
    instructions[0x21] = LDHLNN;
    instructions[0x22] = LDMEMHL;
    instructions[0x2c] = INCL;
    instructions[0x2d] = DECL;
    instructions[0x2e] = LDLN;
    instructions[0x32] = LDNNA;
    instructions[0x34] = INCMEMHL;
    instructions[0x35] = DECMEMHL;
    instructions[0x36] = LDMEMHLN;
    instructions[0x3e] = LDAN;
    instructions[0x3c] = INCA;
    instructions[0x3d] = DECA;
    instructions[0xad] = XORL;
    instructions[0xc2] = JPNZNN;
    instructions[0xc3] = JPNN;    
    //instructions[0xc9] = RET;    
    //instructions[0xcd] = CALL;

    const read_program = ()=>{
        // let opcode = 0x00;
        // do
        // {
        let opcode = memory[PC];

        PC += 1;                                
        
        switch(opcode)
        {
            case 201:
            RET();
            break;
            
            case 205:
            CALL();
            break;

            default:
            break;
        }
//       console.log(`${opcode} ${PC} ${SP}`);

  

        try{
            if(opcode != 201 && opcode != 205)
                instructions[opcode]()
        }catch(error){
            let pc = PC - 1;
            alert(`Error ${opcode.toString(16).toUpperCase()} in memory location ${pc.toString(16).toUpperCase()} is not an instruction`);
            window.stop();
        }



        if(PC >= 0xc000){
            PC = 0x4000;
        }
        
        // }while(opcode != 0x18);

        // PC = 0x4000;
    };

    const get_memory = (address)=>{
        let mem = []
    
        for(let i = 0; i < 16; i++)
            mem.push(memory[address+i]);

        return mem;
    };

    const set_memory = (address,data)=>{
        for(let i = 0; i < data.length; i++)
        {
            memory[address+i] = data[i];
        }
    };

    const set_pc = (address)=>{
        address = parseInt(address,16);
        if(address >= 0x4000 && address < 0xc000)
            PC = Number(address);
    };

    const update = ()=>{
        for(let i = 0; i < 8; i++){
            let reg = document.getElementById("reg"+i);
            reg.innerHTML = memory[i].toString(16);
        }
    };
    
    return {
        update_canvas,
        raster,
        get_memory,
        set_memory,
        update,
        read_program,
        reset:init_machine,
        set_pc
    }

}();

export {Machine};

