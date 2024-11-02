import React, { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { togglePower,setVolume } from "../redux/drumSlice";


const DrumMaster = () => {
    const dispatch = useDispatch();
    const {power, volume} = useSelector((state)=> state.drum);

    const updateDisplay = (text) => {
        document.getElementById("display").value = text;
    };

    const playAudio = (id, sampleName) => {
        if(!power) return;

        const audio = document.getElementById(id);
        audio.volume = volume; // Set the volume from the state
        if(audio){
            console.log(`Playing ${sampleName} at volume: ${volume}`); // Debug log
            audio.currentTime = 0;// reset incase it's still playing
            audio.play().catch((err) => console.error('Playback failed', err));
            updateDisplay(sampleName);
        }
    };

    useEffect(() => {
        const handleKeyPress = (event) => {
            if(!power) return;// Only proceed if power is on
            const key = event.key.toUpperCase();
            switch (key) {
                case "Q":
                    playAudio("Q", "Heater 1");
                    break;
                case "W":
                    playAudio("W", "Heater 2");
                    break;
                case "E":
                    playAudio("E", "Heater 3");
                    break;
                case "A":
                    playAudio("A", "Heater 4");
                    break;
                case "S":
                    playAudio("S", "Clap");
                    break;
                case "D":
                    playAudio("D", "Open-HH");
                    break;
                case "Z":
                    playAudio("Z", "Kick-n'-Hat");
                    break;
                case "X":
                    playAudio("X", "Kick");
                    break;
                case "C":
                    playAudio("C", "Closed-HH");
                    break;
                default:
                    break; // No sound for other keys
            }
        };


        // event listener for keydown
        document.addEventListener("keydown", handleKeyPress);

        //clean up event listener on component unmount
        return() => {
            document.removeEventListener("keydown", handleKeyPress);
        };
    }, [power, volume]);

    return(
        <div id="drum-machine" style={{textAlign: "center", padding: '20px'}}>
            <h1>Drum Machine</h1>

            {/* Power Button */}
            <button onClick={() => dispatch(togglePower())}>
                {power ? 'Power Off' : 'Power On'}
            </button>


            <input id="display" readOnly />

            <div id="button-div" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginTop: '20px' }}>
                <button 
                    className="drum-pad" 
                    id="button-Q" 
                    onClick={() => playAudio("Q", "Heater 1")}>
                    <audio className="clip" id="Q" src="/assets/Heater-1.mp3"></audio>
                    Q
                </button>
                <button 
                    className="drum-pad" 
                    id="button-W" 
                    onClick={() => playAudio("W", "Heater 2")}>
                    <audio className="clip" id="W" src="/assets/Heater-2.mp3"></audio>
                    W
                </button>
                <button 
                    className="drum-pad" 
                    id="button-E" 
                    onClick={() => playAudio("E", "Heater 3")}>
                    <audio className="clip" id="E" src="/assets/Heater-3.mp3"></audio>
                    E
                </button>
                <button 
                    className="drum-pad" 
                    id="button-A" 
                    onClick={() => playAudio("A", "Heater 4")}>
                    <audio className="clip" id="A" src="/assets/Heater-4_1.mp3"></audio>
                    A
                </button>
                <button 
                    className="drum-pad" 
                    id="button-S" 
                    onClick={() => playAudio("S", "Clap")}>
                    <audio className="clip" id="S" src="/assets/Kick_n_Hat.mp3"></audio>
                    S
                </button>
                <button 
                    className="drum-pad" 
                    id="button-D" 
                    onClick={() => playAudio("D", "Open-HH")}>
                    <audio className="clip" id="D" src="/assets/RP4_KICK_1.mp3"></audio>
                    D
                </button>
                <button 
                    className="drum-pad" 
                    id="button-Z" 
                    onClick={() => playAudio("Z", "Kick-n' -Hat")}>
                    <audio className="clip" id="Z" src="/assets/Heater-6.mp3"></audio>
                    Z
                </button>
                <button 
                    className="drum-pad" 
                    id="button-X" 
                    onClick={() => playAudio("X", "Kick")}>
                    <audio className="clip" id="X" src="/assets/Cev_H2.mp3"></audio>
                    X
                </button>
                <button 
                    className="drum-pad" 
                    id="button-C" 
                    onClick={() => playAudio("C", "Closed-HH")}>
                    <audio className="clip" id="C" src="/assets/Dsc_Oh.mp3"></audio>
                    C
                </button>
        </div>


            {/*Volume Slider */}
            <div style={{marginTop: '20px'}}>
                <label htmlFor="volume">Volume: {Math.round(volume * 100)}%</label>
                <input 
                    type="range"
                    id="volume"
                    min={0}
                    max={1}
                    step={0.01}
                    value={volume}
                    onChange={(e) => dispatch(setVolume(parseFloat(e.target.value)))}
                />
            </div>
        </div>
    )
}

export default DrumMaster;