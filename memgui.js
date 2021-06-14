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

    const create_nibble = (id,content)=>{
        let p = document.createElement("P"); //"<p id=" + id + ";h" + ">" + a[0] + "</div>";
        p.id = id;
        // let text = document.createTextNode()
        p.textContent = content;
        p.contentEditable = false;

        p.onclick = ()=>{
            p.contentEditable = true;
        };

        p.onkeypress = ()=>{
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

        };

        p.onmouseover = () =>
        {
            if(p.style.backgroundColor != "red")
                p.style.backgroundColor = "#3d8a47";
        }

        p.onmouseleave = () =>
        {
            if(p.style.backgroundColor != "red")
                p.style.backgroundColor = "white";
        }

        return p;
    }

    const fill = (memory,address)=>{

        let counter = 0;

        let p = "<p>" + address.toString(16) + "</p>";
        surface.innerHTML = p;

        memory.forEach(
            element=>{

                let id = (address+counter);

                let number = dec_to_hex(element);

                let a = number.split("");

                let b = document.createElement('div');
                b.className = "byte";

                let para1 = create_nibble(id + ";h",a[0]);
                b.appendChild(para1);

                let para2 = create_nibble(id + ";l",a[1]);
                b.appendChild(para2);

                surface.appendChild(b);

                counter +=1;
            });
    };

    return{
        fill
    }

}();

export {MemGUI};
