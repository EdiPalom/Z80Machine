'use strict';
import {Machine} from './machine.js'
import {MemGUI} from './memgui.js'
import {MainLoop} from './mainloop.js';

window.get_gaddress = (a)=>{
    MemGUI.fill_memory(a);
};

window.load_binaries = (id)=>
{
    let value = document.getElementById(id);
    requestBinary(value.value+".bin");
};

window.set_pc = (a)=>{
    Machine.set_pc(a);
};

window.set_ups = (a)=>{

    MainLoop.set_ups(a);
};

window.save = ()=>{
    let elements = MemGUI.get_content();
    let a = elements.split("\n\n");

    for(let i = 0; i < 3; i++)
    {
        load_into_memory(a);
    }
};

window.run = ()=>{
    MainLoop.run();
}

window.stop = ()=>{
    MainLoop.stop();
};

window.reset = ()=>{
    start_machine();
};

window.check_input = (callback,id)=>{
    let a = document.getElementById(id).value;
    
    if(Number.isNaN(parseInt(a,16)))
        alert(`Error ${document.getElementById(id).value} is not a number`);
    else
        callback(a);
}

function load_into_memory(a,index){

        let memory = a.splice(0,33);

        let address = parseInt(memory[0],16);

        memory.splice(0,1);

        let bytes = [];

        for(let i = 0; i < memory.length; i+=2)
        {
            let bt = memory[i] + memory[i+1];

            bytes.push(parseInt(bt,16));
        }

        Machine.set_memory(address,bytes);
};



function start_machine()
{
    Machine.reset();
    MemGUI.fill_memory(4000);
    Machine.raster();
    Machine.update_canvas();
};

let requestJSON = async(file)=>{
    let response = await fetch(file);
    let data = await response.json();
    let m = [];

    data.forEach(element => m.push(Number(element)));
    
    Machine.set_memory(parseInt(4000,16),m);
    MemGUI.fill_memory(parseInt(4000));
};

window.requestBinary = (file)=>{
    let req = new XMLHttpRequest();
    req.open("GET",file,true);
    req.responseType = "arraybuffer";

    req.onload = (e)=>{
        let buffer = req.response;

        if(buffer)
        {
            let array = new Uint8Array(buffer);
            Machine.set_memory(parseInt(4000,16),array);
            MemGUI.fill_memory(parseInt(4000));
        }
    };

    req.send(null);
};

let App = {
    start: ()=>{
        start_machine();
        
        MainLoop.loop();
    },
};

window.onload = (()=>{
    App.start();
})();



