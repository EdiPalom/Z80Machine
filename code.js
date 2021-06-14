'use strict';

import {Machine} from './machine'
import {MemGUI} from './memgui'

window.onload = (()=>{

    // let Machine = require('./machine');
    //
    // let mac = Machine("Hello");
    //
    MemGUI.fill(Machine.get_memory(0x4000),0x4000);

    Machine.read_memory_video();
    Machine.update_canvas();

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

