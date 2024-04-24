import React, { useEffect, useRef, useState } from 'react'
import { TerminalDetails } from '../classes/TerminalDetails.ts';


interface Props {
    commands: any; // Specify the type of 'commands' prop as 'any'
}

export const Terminal = ({ commands }: Props) => {
    let userInput = "";
    const [history, setHistory] = useState<TerminalDetails[]>([]);
    const [output, setOutput] = useState<any>("");
    const [isCLS, setIsCls] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {

        inputRef.current!.focus();

    }, [isCLS])



    const handleOnchange = (e: any) => {
        userInput = e.target.value;
    }
    const handleTerminal = (event: any) => {
        let outputHolder = "";
        let lowerCaseUserInput = userInput.toLowerCase();
        if (event.key === 'Enter') {
            if (commands.hasOwnProperty(lowerCaseUserInput) && lowerCaseUserInput !== "cls") {
                setOutput(commands[lowerCaseUserInput]);
                outputHolder = commands[lowerCaseUserInput];
            } else if (lowerCaseUserInput === "cls") {
                setOutput("")
                setHistory([]);
                setIsCls(true);
                return;
            } else {
                setOutput(`command ${userInput}: does not exist type "commands"`)
                outputHolder = `command ${userInput}: does not exist type "commands"`

            }
            setHistory(prevHistory => [...prevHistory, new TerminalDetails(userInput, outputHolder)])
            console.log('history', history);
            event.target.value = "";
            setIsCls(false)
        }

    }

    return (


        <div className="w-4/6 bg-darkBlue h-3/5 border-2 border-white rounded-xl ">
            <div className="flex justify-end h-6 bg-blue border-b-white border-b-2 rounded-tl-xl rounded-tr-xl flex">
                <p className="text-xl rotate-45 text-white mb-4 hover:text-red hover:cursor-pointer">+</p>
            </div>
            <div className="w-full h-full ">
                <>
                    {
                        isCLS ? (

                            <div>
                                <div className="pt-2 flex flex-row justify-center ">
                                    <h1 className="w-1/4 text-white  pl-2 font-monospace pt-2">Tenpenny@virtualMachine:~ </h1>
                                    <input ref={inputRef} maxLength={20} onKeyPress={handleTerminal} onChange={handleOnchange} className='w-3/4  pt-2 bg-darkBlue outline-none font-monospace text-red ' type='text' />
                                </div>
                            </div>

                        ) : (
                            <>
                                {
                                    history.map((h, index) => (
                                        <div key={index}>
                                            <div className="pt-2 flex flex-col justify-center md:flex-row">
                                                <h1 className="w-1/4 text-white text-m pl-2 font-monospace pt-2">Tenpenny@virtualMachine:~ </h1>
                                                <p className='w-3/4 pl-2 mr-18 pt-2 bg-darkBlue outline-none font-monospace text-red'>{h.savedInput}</p>
                                            </div>
                                            <div className="self-center h-auto w-full">
                                                <h1 className='text-white text-m pl-2 font-monospace'><span className="text-red">&gt;&gt;&gt; </span>{h.savedOutput}</h1>
                                            </div>
                                        </div>
                                    ))
                                }

                                <div>
                                    <div className="pt-2 flex flex-col justify-center md:flex-row">
                                        <h1 className="w-1/4 text-white text-m pl-2 font-monospace pt-2">Tenpenny@virtualMachine:~ </h1>
                                        <input ref={inputRef} placeholder="Type any commands here to know more .." maxLength={20} onKeyPress={handleTerminal} onChange={handleOnchange} className='w-3/4 mr-18 bg-darkBlue pt-2 outline-none font-monospace text-red' type='text' />
                                    </div>
                                </div>
                            </>
                        )
                    }
                </>
            </div>
        </div>

    );

}