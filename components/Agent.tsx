"use client"; // <--- ADD THIS LINE AT THE TOP

import { useState, useEffect } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

enum CallStatus {
    INACTIVE = 'INACTIVE',
    CONNECTING = 'CONNECTING',
    ACTIVE = 'ACTIVE',
    FINISHED = 'FINISHED',
}

const Agent = ({ userName }: { userName: string }) => {
    const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
    const [seconds, setSeconds] = useState(0);

    // Timer Logic: Starts when status is ACTIVE
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (callStatus === CallStatus.ACTIVE) {
            interval = setInterval(() => {
                setSeconds((prev) => prev + 1);
            }, 1000);
        } else {
            setSeconds(0); // Reset timer when call ends
        }
        return () => clearInterval(interval);
    }, [callStatus]);

    // Format seconds into 00:00
    const formatTime = (totalSeconds: number) => {
        const mins = Math.floor(totalSeconds / 60);
        const secs = totalSeconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const handleStartCall = () => {
        setCallStatus(CallStatus.CONNECTING);
        setTimeout(() => {
            setCallStatus(CallStatus.ACTIVE);
        }, 2000);
    };

    const handleEndCall = () => {
        setCallStatus(CallStatus.FINISHED);
    };

    return (
        <div className="flex flex-col items-center">
            <div className={"call-view"}>
                {/* AI Interviewer Card */}
                <div className={"card-interviewer"}>
                    <div className={"avatar"}>
                        <Image src={"/ai-avatar.png"} alt={"vapi"}
                               width={65} height={54} className={"object-cover"} />
                        {callStatus === CallStatus.ACTIVE && <span className={"animate-speak"}/>}
                    </div>
                    <h3>AI Interviewer</h3>
                    {/* Show Timer when Active */}
                    {callStatus === CallStatus.ACTIVE && (
                        <p className="text-green-500 font-mono text-sm">{formatTime(seconds)}</p>
                    )}
                </div>

                {/* User Card */}
                <div className={"card-border"}>
                    <div className={"card-content"}>
                        <Image src={"/picc.png"} alt={"user avatar"}
                               width={540} height={540}
                               className="rounded-full object-cover size-[120px]"/>
                        <h3>{userName}</h3>
                    </div>
                </div>
            </div>

            {/* Transcript */}
            <div className={"transcript-border"}>
                <div className={"transcript"}>
                    <p className="animate-fadeIn">
                        {callStatus === CallStatus.CONNECTING ? "Connecting to agent..." : "My name is Shiva Singh, nice to meet you!"}
                    </p>
                </div>
            </div>

            {/* Call Button Controls */}
            <div className={"w-full flex justify-center mt-8"}>
                {callStatus !== CallStatus.ACTIVE ? (
                    <button
                        onClick={handleStartCall}
                        disabled={callStatus === CallStatus.CONNECTING}
                        className="relative btn-call min-w-[120px]"
                    >
                        {callStatus === CallStatus.CONNECTING && (
                            <span className="absolute inset-0 animate-ping rounded-full bg-white/20" />
                        )}
                        <span>{callStatus === CallStatus.CONNECTING ? '...' : 'Call'}</span>
                    </button>
                ) : (
                    <button
                        onClick={handleEndCall}
                        className="bg-red-500 hover:bg-red-600 text-white px-10 py-3 rounded-full font-bold shadow-lg transition-all active:scale-95"
                    >
                        End Call
                    </button>
                )}
            </div>
        </div>
    );
};

export default Agent;