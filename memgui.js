var MemGUI = function()
{
    let surface = document.querySelector("#memdisplay");

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

    const get_focus= (t_i,i)=>{
        if(i == '0')
        {
            surface.children[Number(t_i)+1].children[1].contentEditable = 'true';
            surface.children[Number(t_i)+1].children[1].focus();
        }else
        {
            surface.children[Number(t_i)+2].children[0].contentEditable = 'true';
            surface.children[Number(t_i)+2].children[0].focus();
        }
        // surface.children[1].children[0].click();
    }

    const create_nibble = (id,index,content)=>{
        let p = document.createElement("input"); //"<p id=" + id + ";h" + ">" + a[0] + "</div>";
        p.id = id;
        p.setAttribute('index',index);
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
        };

        p.onkeyup = ()=>{
            // p.contentEditable = false;
            // p.textContent = p.innerText.toUpperCase();
            p.value = p.value.toUpperCase();

            // let text = p.textContent;
            let text = p.value;
            if(text != "A" && text != "B" && text != "C" && text != "D" && text != "E" && text != "F" && text != "0" && text != "1" && text != "2" && text != "3" && text != "4" && text != "5" && text != "6" && text != "7" && text != "8" && text != "9")
            {
                p.style.backgroundColor = "red";
            }else
            {
                p.style.backgroundColor = "white";
            }
            
            // console.log(p);
            go_to_next_element(p.parentNode.getAttribute('t_index'),p.getAttribute('index'));
        };

        p.onmouseover = () =>
        {
            if(p.style.backgroundColor != "red")
                p.style.backgroundColor = "#3d8a47";
            // p.contentEditable = true;
        }

        p.onfocus = () =>
        {
            // p.contentEditable = true;
            p.style.backgroundColor = "#00ff00";
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
        // let text = document.createTextNode()
        p.textContent = content;
        // p.style.width = "16px";
        p.contentEditable = false;

        p.onclick = ()=>{
            p.contentEditable = true;
        };

        p.onkeypress = ()=>{
            // if(p.contentEditable)
            p.textContent = "";
        };

        p.onkeyup = ()=>{
            p.contentEditable = false;
            p.textContent = p.innerText.toUpperCase();

            let text = p.textContent;
            if(text != "A" && text != "B" && text != "C" && text != "D" && text != "E" && text != "F" && text != "0" && text != "1" && text != "2" && text != "3" && text != "4" && text != "5" && text != "6" && text != "7" && text != "8" && text != "9")
            {
                p.style.backgroundColor = "red";
            }else
            {
                p.style.backgroundColor = "white";
            }
            
            // console.log(p);
            get_focus(p.parentNode.getAttribute('t_index'),p.getAttribute('index'));
        };

        p.onmouseover = () =>
        {
            if(p.style.backgroundColor != "red")
                p.style.backgroundColor = "#3d8a47";
            p.contentEditable = true;
        }

        p.onfocus = () =>
        {
            // p.contentEditable = true;
            p.style.backgroundColor = "#00ff00";
        }

        p.onmouseleave = () =>
        {
            if(p.style.backgroundColor != "red")
                p.style.backgroundColor = "white";
            p.contentEditable = false;
        }

        return p;
    }

    const fill = (memory,address)=>{
        surface.innerHTML = "";
      
        let p = document.createElement("P");
        p.textContent = address.toString(16);
        // let p = "<p>" + address.toString(16) + "</p>";
        surface.appendChild(p);

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

                surface.appendChild(b);
            });
    };

    const get_content = ()=>
    {
        return surface.innerText;
    };

    return{
        fill,
        get_content
    }

}();

export {MemGUI};
