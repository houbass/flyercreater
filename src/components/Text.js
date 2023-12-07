import { useEffect, useLayoutEffect, useState } from "react"

//color lib
import { HexColorPicker } from "react-colorful";

export default function Text() {

    //STATES
    const [texts, setTexts] = useState([]);
    const [refresh, setRefresh] = useState(true);
    const [color, setColor] = useState("#ffffff");
    const [padding, setPadding] = useState(40);
    const [colorText, setColorText] = useState("#000000");

    //BOX WIDTH
    const boxWidth = 300;
    const targetBox = boxWidth - (2 * padding);

    //CLASSES
    class scaledText {
        constructor(text, fontSize) {
            this.text = text;
            this.fontSize = fontSize;
        }

        update(text) {
            this.text = text;
        }

        updateSize(fontSize) {
            this.fontSize = fontSize;
        }
    }

    //GET TEXT SIZE
    function getTextSize(thisFontSize) {

        return thisFontSize + 0.1;
    };

    //ADD MORE
    function addMore() {

        const newLine = new scaledText("new text", 1);
        setTexts([
            ...texts, newLine
        ])
    };

    //DELETE LINE
    function deleteLine(checkIndex) {
        const filtered = texts.filter((item, index) => index !== checkIndex)
        setTexts(filtered);
    }

    //PADDING 
    function paddingFun(e) {
        texts.forEach((item) => {
            item.updateSize(1);
        });
        setPadding(e.target.value);
    };

    //SET WHEN FIRST LOADED
    useLayoutEffect(() => {

        const startingText = ["this", "text", "will always", "match"]
        let thisTextArray = [];
        startingText.forEach((item) => {
            const thisText = new scaledText(item, 10);
            thisTextArray.push(thisText);
        })

        setTexts(thisTextArray);
    }, [])

    //FIT THE TEXT
    useEffect(() => {
        texts.forEach((item, index) => {
            const checking = document.getElementById("text" + index);
            const thisRef = checking.getBoundingClientRect();
            const thisWidth = thisRef.width;

            if(item.length === 0){

            }else{
    
                if(thisWidth < targetBox){
                    const thisFontSizeResult = getTextSize(item.fontSize)
                    item.updateSize(thisFontSizeResult);
                    setRefresh(!refresh);
                }
            }
        })
    })


    return(
        <div 
        style={{
            display: "flex",
            flexDirection: "column",
            gap: "50px"
        }}>
            <div 
            style={{
                display: "flex",
                flexDirection: "column",
                //background: "white"
            }}>         

                {texts.map((item, index) => {

                    //input on change
                    function onChange(e) {

                        item.update(e.target.value);
                        item.updateSize(1);
                        setRefresh(!refresh);
                    };

                    return(
                        <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            gap: "5px"
                        }}>
                            <input style={{width: "100%"}} value={item.text} placeholder={"write something"} onChange={onChange}></input>
                            <button style={{width: "20px"}} onClick={() => deleteLine(index)}>-</button>
                        </div>
                    )
                })} 
                <button onClick={addMore}>+</button>
            </div>

            <div 
            style={{
                position: "relative",
                height: "550px",
                //background: "orange",
                widows: boxWidth
            }}>
            <div 
            style={{
                //position: "absolute",
                background: color, 
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: boxWidth + "px",
                padding: padding + "px 0px",
                textTransform: "uppercase"
            }}>
                {texts.map((item, index) => {

                    return(
                        <p 
                        key={index} 
                        id={"text" + index}
                        style={{
                            fontSize: item.fontSize + "px", 
                            whiteSpace: "nowrap",
                            lineHeight: "0.82",
                            fontFamily: "Impact",
                            color: colorText
                        }}>{item.text}</p> 
                    )
                })}
            </div>
            </div>

            <div 
            style={{
                display: "flex",
                flexDirection: "column",
            }}>    
                <div 
                style={{
                    display: "flex",
                    flexDirection: "column",
                }}>
                    <p style={{background: "black", color: "white"}}>padding - {padding}px</p>
                    <input type="range" step="1" min="0" max="50" value={padding} onChange={paddingFun}></input>
                </div>

                <br/>

                <p style={{background: "black", color: "white", paddingBottom: "20px"}}>background color</p>
                <HexColorPicker style={{width: "100%", height: "130px"}} color={color} onChange={setColor} />

                <br/>

                <p style={{background: "black", color: "white", paddingBottom: "20px"}}>text color</p>
                <HexColorPicker style={{width: "100%", height: "130px"}} color={colorText} onChange={setColorText} />

                <br/>
            </div>
        </div>
    )
}