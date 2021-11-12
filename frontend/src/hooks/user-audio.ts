import { useState, useEffect } from "react";

export default function useAudio(url: string) {
    const [audio] = useState(new Audio(url));
    const [playing, setPlaying] = useState(false);

    const toggle = () => setPlaying(!playing);

    useEffect(() => {
        const playPromise = playing ? audio.play() : audio.pause();
        if (playPromise !== undefined) {
            playPromise
                .then(_ => {
                    // Automatic playback started!
                    // Show playing UI.
                    console.log("audio played auto");
                })
                .catch(error => {
                    // Auto-play was prevented
                    // Show paused UI.
                    console.log("playback prevented");
                });
        }
    },
        [audio, playing]
    );

    useEffect(() => {
        audio.addEventListener('ended', () => setPlaying(false));
        return () => {
            audio.removeEventListener('ended', () => setPlaying(false));
        };
    }, [audio]);

    return { playing, toggle };
};