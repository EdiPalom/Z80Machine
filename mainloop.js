import {Machine} from './machine'

var MainLoop = function(){
    let UPS = 30;
    let MS_PER_SECOND = 1000 / UPS;

    const getAnimation = (callback)=>{
            let id = window.requestAnimationFrame(callback) || window.mozRequestAnimationFrame(callback) || window.msRequestAnimationFrame(callback) || window.webkitRequestAnimationFrame(callback);
        return id;
    };

    let mainLoop = {
        id:null,
        last_time: Date.now(),
        current_time: Date.now(),
        ups_lag:0,
        delta_time: 0,
        previous_time: 0,
        aps: 0,
        fps:0,
        quit:false,

        loop:(time_elapsed)=>{

            mainLoop.id = getAnimation(mainLoop.loop);

            mainLoop.current_time = Date.now();
            mainLoop.delta_time = mainLoop.current_time - mainLoop.last_time;
            mainLoop.last_time = mainLoop.current_time;
            mainLoop.ups_lag += mainLoop.delta_time;

            if(mainLoop.ups_lag >= MS_PER_SECOND)
            {
                mainLoop.update();
                mainLoop.ups_lag -= MS_PER_SECOND; 
                // console.log(mainLoop.ups_lag);
            }

            mainLoop.draw();

            if(time_elapsed - mainLoop.previous_time > 999){
                // console.log(typeof(delta_time));
                mainLoop.previous_time = time_elapsed; 

                // console.log("APS: " + mainLoop.aps + " FPS: " + mainLoop.fps);

                mainLoop.aps = 0;
                mainLoop.fps = 0;
            }
        },

        stop:()=>{
            window.cancelAnimationFrame(mainLoop.id);
            mainLoop.id = null;
        },

        update:(current_time)=>{
            Machine.read_program();
            mainLoop.aps++;
        },

        draw:(current_time)=>{
            Machine.raster();
            Machine.update_canvas();
            mainLoop.fps++;
        }
    };

    const set_ups = (ups)=>{
        MS_PER_SECOND = 1000 / ups;
    };

    const run = ()=>{
        if(mainLoop.id == null){
            mainLoop.loop();
        }
    };

    return{
        loop:mainLoop.loop,
        set_ups,
        stop:mainLoop.stop,
        run,
    }
}();

export{MainLoop};
