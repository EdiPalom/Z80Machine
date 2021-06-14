var MemGUI = function()
{
    let surface = document.querySelector("#memdisplay");

    const dec_to_hex = (n)=>{
        if(n < 10)
        {
             return "0"+(Number(n).toString(16)).slice(-2).toUpperCase();
        }

        return (Number(n).toString(16)).slice(-2).toUpperCase();
    }

    const fill = (memory,address)=>{

        let counter = 0;

        let p = "<p>" + address.toString(16) + "</div>";
        surface.innerHTML = p;

        memory.forEach(
            element=>{
                let id = "m" + (address+counter);

                let number = dec_to_hex(element);

                let p = "<p id=" + id + ">" + number + "</div>";
                // let p = "<p id=" + id + ">" + element.toString(16).toUpperCase() + "</div>";
                let html = surface.innerHTML;
                // let html = document.getElementById("memdisplay").innerHTML;

                // document.getElementById("memdisplay").innerHTML = html + p;
                surface.innerHTML = html+p;

                counter +=1;
            });
    };

    return{
        fill
    }

}();

export {MemGUI};
