interface ProgressBarProps {
    percentage: number;
}

function ProgressBar({ percentage } : ProgressBarProps) {
    return (
        <div className="absolute top-0 left-0 h-3 bg-custom-green z-10" style={{ width: `${percentage}%` }}></div>
    );
}

export default ProgressBar
