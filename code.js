'use strict';

import {Machine} from './machine'
import {MemGUI} from './memgui'

window.onload = (()=>{

    // let Machine = require('./machine');
    //
    // let mac = Machine("Hello");
    //
    // MemGUI.fill(Machine.get_memory(0x4000),0x4000);
    show_memory(0x4000);
    // draw();

    window.get_gaddress = ()=>{
        let a = document.getElementById("go").value;
        show_memory(a);
    };

    window.save = ()=>{
        let elements = MemGUI.get_content();
        let a = elements.split("\n\n");

        let address = parseInt(a[0],16);
        let memory = a.splice(1,a.length);

        let bytes = [];

        for(let i = 0; i < memory.length; i+=2)
        {
            let bt = memory[i] + memory[i+1];

            bytes.push(parseInt(bt,16));
        }

        Machine.set_memory(address,bytes);

    };

    function show_memory(address)
    {
        address = Number(address);
        MemGUI.fill(Machine.get_memory(address),address);
    };

    // window.run = ()=>{
    //     Machine.read_program();
    // };

    function draw()
    {
        Machine.raster();
        Machine.update_canvas();
    };

    let app;

    window.run = ()=>{
        app = setInterval(()=>{
            Machine.read_program();
            draw();
        },128);
    };

    window.stop = ()=>{
        clearInterval(app);
    };

    // // //
    // //
    // function get_address()
    // {
    //     return (memory[PC+1] << 8) | memory[PC];
    // }
    //
    // function LDAN()
    // {
    //     memory[A]= memory[PC];
    //     PC+=1;
    // }
    //
    // function LDNNA()
    // {
    //     memory[get_address()] = memory[A];
    //     PC+=2;
    // }
    //
    // function JRN()
    // {
    //     return;
    // }
    //
    // let instructions = []
    //
    // // instructions.push(LDA);
    // instructions[0x3e] = LDAN;
    // instructions[0x32] = LDNNA;
    // instructions[0x18] = JRN;
    //
    // memory[PC] = 0x3e;
    // memory[PC+1] = 0xca;
    // memory[PC+2] = 0x32;
    // memory[PC+3] = 0x00;
    // memory[PC+4] = 0xc0;
    // memory[PC+5] = 0x18;
    //
    // let opcode = 0x00;
    // do
    // {
    //     opcode = memory[PC];
    //     PC+=1;
    //
    //     instructions[opcode]();
    // }while(opcode != 0x18);
    //
    // read_memory_video();
    //
    // context.putImageData(screenData,0,0);
})();

