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
    draw();

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

    window.reset = ()=>{
        stop();
        Machine.reset();
        draw();
        run();
    };
})();

