'use strict';
import {Machine} from './machine'
import {MemGUI} from './memgui'
import {MainLoop} from './mainloop';

window.get_gaddress = (a)=>{
    fill_memory(a);
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
    let a = Number(document.getElementById(id).value);
    
    if(Number.isNaN(a))
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

function show_memory(address)
{
    address = Number(address);
    MemGUI.fill(Machine.get_memory(address),address);
};

function fill_memory(address)
{
    address = parseInt(address,16);
    MemGUI.reset();
    show_memory(address);
    show_memory(address + 0x10);
    show_memory(address + 0x20);
};

function start_machine()
{
    Machine.reset();
    fill_memory(4000);
    Machine.raster();
    Machine.update_canvas();
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



