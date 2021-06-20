'use strict';
import {Machine} from './machine'
import {MemGUI} from './memgui'
import {MainLoop} from './mainloop';

window.get_gaddress = ()=>{
    let a = document.getElementById("go").value;
    fill_memory(a);
};

window.set_pc = ()=>{
    let a = document.getElementById("i_pc").value;
    Machine.set_pc(a);
};

window.set_ups = ()=>{
    let a = document.getElementById("i_ups").value;
    MainLoop.set_ups(Number(a));
};

window.save = ()=>{
    let elements = MemGUI.get_content();
    let a = elements.split("\n\n");

    for(let i = 0; i < 3; i++)
    {
        load_into_memory(a);
    }
};

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
    address = Number(address);
    MemGUI.reset();
    show_memory(address);
    show_memory(address + 0x10);
    show_memory(address + 0x20);
};

function start_machine()
{
    Machine.reset();
    fill_memory(0x4000);
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



