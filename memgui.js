import {Machine} from './machine.js'

var MemGUI = function()
{
    let surface = document.querySelector("#memdisplay");

    surface.innerHTML = "";

    let tab_counter = 0;

    const dec_to_hex = (n)=>{
        if(n < 10)
        {
             return "0"+(n.toString(16)).slice(-2).toUpperCase();
        }

        return (n.toString(16)).slice(-2).toUpperCase();
    }

    const go_to_next_element = (t_i,i)=>{
        // console.log(t_i,i);
        //
        if(i == '0')
            surface.children[Number(t_i)+1].children[1].focus();
        else if(i == '1')
            surface.children[Number(t_i)+2].children[0].focus();

        // let id = document.getElementById
        // surface.children[1].focus();
        // console.log(surface.childNodes[1]);
        // let id = surface.children[1].children[0].id;
        // console.log(document.getElementById(id).focus());
        // document.getElementById(id).focus();
        // console.log(surface.childNodes[1].focus());

    }

    const get_focus= (id,t_i,i)=>{
        if(i == '0')
        {
            surface.children[Number(id)].children[Number(t_i)+1].children[1].contentEditable = 'true';
            surface.children[Number(id)].children[Number(t_i)+1].children[1].focus();
        }else
        {
            surface.children[Number(id)].children[Number(t_i)+2].children[0].contentEditable = 'true';
            surface.children[Number(id)].children[Number(t_i)+2].children[0].focus();
        }
        // surface.children[1].children[0].click();
    }

    const create_nibble = (id,index,content)=>{
        let p = document.createElement("input"); //"<p id=" + id + ";h" + ">" + a[0] + "</div>";
        p.id = id;
        p.setAttribute('index',index);
        p.setAttribute('key_counter',0);
        // let text = document.createTextNode()
        // p.textContent = content;
        p.value = content;
        p.style.width = "16px";
        // p.contentEditable = false;

        // p.onclick = ()=>{
        //     p.contentEditable = true;
        // };

        p.onkeypress = ()=>{
            // if(p.contentEditable)
            // p.textContent = "";
            p.value="";

            let c = Number(p.getAttribute('key_counter'));
            c += 1;
            p.setAttribute('key_counter',c);
        };

        p.onkeyup = ()=>{
            let keycode = event.which || event.keyCode;
        
            p.value = p.value.toUpperCase();
            let text = p.value;

            if(text != "A" && text != "B" && text != "C" && text != "D" && text != "E" && text != "F" && text != "0" && text != "1" && text != "2" && 
                text != "3" && text != "4" && text != "5" && text != "6" && text != "7" && text != "8" && text != "9")
            {
                p.style.backgroundColor = "red";

                p.setAttribute("key_counter",0);
            }else
            {
                if((keycode >= 65 && keycode <= 70)||(keycode >= 48 && keycode <= 57))
                {
                    p.style.backgroundColor = "white";

                    if(Number(p.getAttribute("key_counter"))<2)
                    {
                        go_to_next_element(p.parentNode.parentNode.id,p.parentNode.getAttribute('t_index'),p.getAttribute('index'));
                        p.setAttribute("key_counter",0);
                    }else
                    {
                        p.setAttribute("key_counter",1);
                    }
                }
            }
        };

        p.onmouseover = () =>
        {
            if(p.style.backgroundColor != "red")
                p.style.backgroundColor = "#3d8a47";
            // p.contentEditable = true;
        }

        p.onmouseleave = () =>
        {
            if(p.style.backgroundColor != "red")
                p.style.backgroundColor = "white";
        }

        return p;
    }

    const create_paragraph = (id,index,content)=>{
        let p = document.createElement("P"); //"<p id=" + id + ";h" + ">" + a[0] + "</div>";
        p.id = id;
        p.setAttribute('index',index);
        p.setAttribute('key_counter',0);

        // let text = document.createTextNode()
        p.textContent = content;
        // p.style.width = "16px";
        // p.contentEditable = false;

        p.onclick = ()=>{
            p.focus();
            p.contentEditable = true;
        };

        p.onkeypress = ()=>{
            // if(p.contentEditable)
            //
            // let keycode = event.which || event.keyCode;
            // if(x)
            // if((keycode >= 97 && keycode <= 102) || (keycode >= 48 && keycode <= 57))
            p.textContent = "";
            let c = Number(p.getAttribute('key_counter'));
            c += 1;
            p.setAttribute('key_counter',c);
            // let counter = 0;
            // if(event)
            //     counter+=1;
            // console.log(p.getAttribute('key_counter'));
        };

        p.onkeyup = ()=>{

            let keycode = event.which || event.keyCode;
            // console.log(x);
            p.contentEditable = false;
            p.textContent = p.innerText.toUpperCase();

            let text = p.textContent;

            if(text != "A" && text != "B" && text != "C" && text != "D" && text != "E" && text != "F" && text != "0" && text != "1" && text != "2" && 
                text != "3" && text != "4" && text != "5" && text != "6" && text != "7" && text != "8" && text != "9")
            {
                p.style.backgroundColor = "red";

                p.setAttribute("key_counter",0);
            }else
            {
                p.style.backgroundColor = "white";
            }

            if(Number(p.getAttribute('key_counter')) < 2)
            {
                get_focus(p.parentNode.parentNode.id,p.parentNode.getAttribute('t_index'),p.getAttribute('index'));
                p.setAttribute("key_counter",0);
            }else
            {
                p.setAttribute("key_counter",1);
            }
        };

        p.onmouseover = () =>
        {
            if(p.style.backgroundColor != "red")
                p.style.backgroundColor = "#3d8a47";
            p.contentEditable = true;
            // p.focus();
        }

        p.onfocus = () =>
        {
            // p.contentEditable = true;
            // p.style.backgroundColor = "#00ff00";
        }

        p.onmouseleave = () =>
        {
            if(p.style.backgroundColor != "red")
            {
                p.style.backgroundColor = "white";
            }
            // p.contentEditable = false;
        }

        return p;
    }

    const fill = (memory,address)=>{
        let div = document.createElement("div");
        div.id = tab_counter;

        let p = document.createElement("P");
        p.textContent = address.toString(16);
        // let p = "<p>" + address.toString(16) + "</p>";
        div.appendChild(p);

        memory.forEach(
            (element,index)=>{

                let id = (address+index);

                let number = dec_to_hex(element);

                let a = number.split("");

                let b = document.createElement('div');
                b.className = "byte";
                b.setAttribute('t_index',index);

                // let para1 = create_nibble(id,0,a[0]);
                let para1 = create_paragraph(id,0,a[0]);
                b.appendChild(para1);

                // let para2 = create_nibble(id,1,a[1]);
                let para2 = create_paragraph(id,1,a[1]);
                b.appendChild(para2);

                div.appendChild(b);
            });
        surface.appendChild(div);
        tab_counter += 1;
    };

    const reset=()=>
    {
        surface.innerHTML = "";
        tab_counter = 0;
    }

    const get_content = ()=>
    {
        return surface.innerText;
    };

    const show_memory = (address)=>
    {
        address = Number(address);
        fill(Machine.get_memory(address),address);
    };

    const fill_memory = (address)=>
    {
        address = parseInt(address,16);
        reset();
        show_memory(address);
        show_memory(address + 0x10);
        show_memory(address + 0x20);
    };

    const update = ()=>{
        let m = document.getElementById("go").value;
        fill_memory(m);
    };

    return{
        get_content,
        reset,
        fill_memory,
        update
    }

}();

export {MemGUI};
