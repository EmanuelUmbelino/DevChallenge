import { Button, Card, CardActions, CardContent, Fab, Tooltip, Typography } from "@material-ui/core";
import { Delete, LibraryAdd, Mic, Pause, PlayArrow, Save } from "@material-ui/icons";
import { Movie } from "../api/library";
import { UseRecorder } from "../types/recorder";
import useRecorder from "../hooks/use-recorder";
import { Box } from "@material-ui/system";
import "./style.css";
import { formatMinutes, formatSeconds } from "../utils/format-time";
import useAudio from "../hooks/user-audio";

type Prop = {
    movie: Movie;
    inLib: boolean;
    addToLibrary: (movie: Movie) => void;
    removeFromLibrary: (imdb: string) => void;
    // saveAudio: (media: MediaRecorder) => void;
}

export default function MovieCard(props: Prop) {
    const { movie } = props;
    let { inLib } = props;
    const { recorderState, ...handlers }: UseRecorder = useRecorder();
    const { startRecording, saveRecording } = handlers;
    const audio = recorderState.audio ? recorderState.audio : '';
    const { recordingMinutes, initRecording, recordingSeconds } = recorderState;
    const { playing, toggle } = useAudio(audio);

    const addToLibrary = (() => {
        props.addToLibrary(movie);
        inLib = true;
    });
    const removeFromLibrary = (() => {
        props.removeFromLibrary(movie.imdbID);
        inLib = false;
    });
    const toggleAudio = (() => {
        console.log('toggle', audio)
        toggle();
    });

    handlers.saveRecording = (() => {
        saveRecording();
        console.log('teste', recorderState, audio);
    })

    return (
        <Card sx={{ maxWidth: 200 }}>
            <Box className='home-card-view flex-center imageCard'
                style={{ backgroundImage: `url(${movie.poster})` }}>
                {audio ?
                    <div>
                        <Tooltip title="Listen Review">
                            <Fab size="large" onClick={toggleAudio}>
                                {playing ?
                                    <Pause fontSize="large" /> :
                                    <PlayArrow fontSize="large" />}
                            </Fab>
                        </Tooltip>
                    </div> :
                    <div>
                        {initRecording ?
                            < Fab variant="extended" size="large" onClick={handlers.saveRecording} disabled={recordingSeconds < 1}>
                                <Save sx={{ mr: 1 }} />
                                <span>{formatMinutes(recordingMinutes)}</span>
                                <span>:</span>
                                <span>{formatSeconds(recordingSeconds)}</span>
                            </Fab> :
                            <Tooltip title="Add your Review">
                                <Fab size="large" onClick={startRecording}>
                                    <Mic fontSize="large" />
                                </Fab>
                            </Tooltip>
                        }
                    </div>
                }
            </Box >
            <CardContent>
                <Typography variant="subtitle2" component="div">
                    {movie.title}
                </Typography>
            </CardContent>
            <CardActions sx={{ pt: 0 }}>
                {inLib ?
                    // <div className="recorder-container">
                    //     <RecorderControls recorderState={recorderState} handlers={handlers} />
                    //     <RecordingsList audio={audio} imdbId={movie.imdbID} />
                    // </div>
                    <Button fullWidth size="small" variant="outlined" color="error" startIcon={<Delete />} onClick={removeFromLibrary}>
                        Remove from My Library
                    </Button> :
                    <Button fullWidth size="small" variant="outlined" startIcon={<LibraryAdd />} onClick={addToLibrary}>
                        Add to My Library
                    </Button>
                }
            </CardActions>
        </Card >
    );
}
