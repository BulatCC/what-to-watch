import { useEffect, useState, useRef, useContext } from 'react';
import { useNavigate, generatePath, useParams } from 'react-router-dom';
import { AppRoute, ApiRoute } from '../../consts';
import { getVideoDuration, timeToPercent } from '../../Services/Utils';
import { appContext } from '../../Context/App';
import { Loader } from '../../components/Loader/Loader';
import { FilmCardType } from '../../Types/Films';
import { createApi } from '../../Services/Api';

const Player = () => {
    const hasHistory = window.history.state;
    const navigate = useNavigate();
    const [isPlaying, setIsPlaying] = useState(hasHistory === null ? false : true);
    const [fullScreen, setfullScreen] = useState(!!document.fullscreenElement);
    const [videoDuration, setVideoDuration] = useState<undefined | number | string>();
    const [percentLength, setPercentLength] = useState('0');
    const { state: { currentFilm } } = useContext(appContext);
    const [video, setVideo] = useState<FilmCardType | null>(currentFilm);
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const urlId = useParams().id;
    const api = createApi();
    const link = generatePath(AppRoute.Film, { id: urlId });

    const fullScreenChangeHandler = () => {
        fullScreen ? setfullScreen(false) : setfullScreen(true);
    };

    const playClickHandler = () => {
        isPlaying ? setIsPlaying(false) : setIsPlaying(true);
    }

    const fullScreenClickHandler = () => {
        fullScreen ? document.exitFullscreen() : videoRef.current?.closest('.player')?.requestFullscreen();
    }

    useEffect(() => {
        document.addEventListener('fullscreenchange', fullScreenChangeHandler);
        return () => {
            document.removeEventListener('fullscreenchange', fullScreenChangeHandler);
        }
    }, [fullScreen]);

    useEffect(() => {
        const videoEndHandler = () => {
            setIsPlaying(false);
        }
        videoRef.current?.addEventListener('ended', videoEndHandler);
        if (videoRef.current) {
            isPlaying ? videoRef.current.play() : videoRef.current.pause();
            videoRef.current.paused && setIsPlaying(false);
        }
        return () => videoRef.current?.removeEventListener('ended', videoEndHandler);
    }, [isPlaying]);

    useEffect(() => {
        videoRef.current && setPercentLength(timeToPercent(videoRef.current.duration, videoRef.current.currentTime));
        let timeout = setTimeout(() => {
            if (videoRef.current) {
                const timeLeft = videoRef.current.duration - videoRef.current.currentTime;
                videoRef.current && setVideoDuration(getVideoDuration(timeLeft));
            }
        }, 1000);
        return () => timeout && clearTimeout(timeout);
    }, [videoDuration, isPlaying]);

    useEffect(() => {
        if (video?.id.toString() !== urlId) {
            console.log(11)
            api.get(`${ApiRoute.Films}/${urlId}`)
            .then(({ data }) => {
                setVideo(data);
            })
            .catch((e) => console.log(e));
        }
    });

    if (!video) {
        return <Loader />;
    }

    return (
        <div className='player' >
            <video ref={videoRef} src={video.videoLink} className='player__video' poster={video.previewImage}></video>
            {
                !fullScreen && <button onClick={() => hasHistory !== null ? navigate(-1) : navigate(link)} type='button' className='player__exit'>Exit</button>
            }
            <div className={`player__controls ${fullScreen && 'player__controls--hidden'}`}>
                <div className='player__controls-row'>
                    <div className='player__time'>
                        <progress className='player__progress' value={percentLength} max='100'></progress>
                        <div className='player__toggler' style={{
                            left: `${percentLength}%`,
                        }}>Toggler</div>
                    </div>
                    <div className='player__time-value'>{videoDuration}</div>
                </div>

                <div className='player__controls-row'>
                    <button onClick={playClickHandler} type='button' className='player__play'>
                        {
                            isPlaying
                                ?
                                <>
                                    <svg viewBox="0 0 14 21" width="14" height="21">
                                        <use xlinkHref="#pause"></use>
                                    </svg>
                                    <span>Play</span>
                                </>
                                :
                                <>
                                    <svg viewBox='0 0 19 19' width='19' height='19'>
                                        <use xlinkHref='#play-s'></use>
                                    </svg>
                                    <span>Pause</span>
                                </>
                        }
                    </button>
                    <div className='player__name'>{video.name}</div>

                    <button onClick={fullScreenClickHandler} type='button' className='player__full-screen'>
                        <svg viewBox='0 0 27 27' width='27' height='27'>
                            <use xlinkHref='#full-screen'></use>
                        </svg>
                        <span>Full screen</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export { Player };