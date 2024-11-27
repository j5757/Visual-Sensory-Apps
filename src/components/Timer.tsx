import React from 'react';
import { Timer as TimerIcon } from 'lucide-react';

const Timer: React.FC = () => {
  const [duration, setDuration] = React.useState(5);
  const [isRunning, setIsRunning] = React.useState(false);
  const [timeLeft, setTimeLeft] = React.useState(duration * 60);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  React.useEffect(() => {
    audioRef.current = new Audio('data:audio/wav;base64,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');
  }, []);

  React.useEffect(() => {
    let interval: number;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
      audioRef.current?.play();
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStart = () => {
    setTimeLeft(duration * 60);
    setIsRunning(true);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4 flex items-center space-x-2">
        <TimerIcon className="w-5 h-5" />
        <span>Relaxation Timer</span>
      </h2>

      <select
        value={duration}
        onChange={(e) => setDuration(Number(e.target.value))}
        className="w-full p-2 rounded bg-gray-700 text-white"
        disabled={isRunning}
      >
        <option value={1}>1 minute</option>
        <option value={2}>2 minutes</option>
        <option value={3}>3 minutes</option>
        <option value={4}>4 minutes</option>
        <option value={5}>5 minutes</option>
        <option value={10}>10 minutes</option>
        <option value={15}>15 minutes</option>
        <option value={20}>20 minutes</option>
        <option value={30}>30 minutes</option>
      </select>

      <div className="text-center text-2xl font-mono">
        {formatTime(timeLeft)}
      </div>

      <button
        onClick={isRunning ? () => setIsRunning(false) : handleStart}
        className="w-full py-2 px-4 rounded bg-blue-600 hover:bg-blue-700 transition-colors"
      >
        {isRunning ? 'Stop' : 'Start Timer'}
      </button>
    </div>
  );
};

export default Timer;