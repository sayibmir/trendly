'use client';

import { Clock, Sun, Moon, Sunrise, Sunset } from 'lucide-react';

// Generate heatmap data
const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const hours = [6, 9, 12, 15, 18, 21];

const heatmapData = days.map((day) => ({
  day,
  hours: hours.map((hour) => ({
    hour,
    engagement: Math.random() * 15 + 2, // Random engagement between 2-17%
    posts: Math.floor(Math.random() * 50) + 5,
  })),
}));

// Find best times
const allTimes = heatmapData.flatMap((d) =>
  d.hours.map((h) => ({ day: d.day, ...h }))
);
const bestTimes = allTimes.sort((a, b) => b.engagement - a.engagement).slice(0, 3);

export default function TimingHeatmap() {
  const getColor = (engagement: number) => {
    if (engagement >= 12) return 'bg-[--coral]';
    if (engagement >= 9) return 'bg-[--coral]/70';
    if (engagement >= 6) return 'bg-[--coral]/40';
    if (engagement >= 4) return 'bg-[--coral]/20';
    return 'bg-white/10';
  };

  const getTimeLabel = (hour: number) => {
    if (hour < 12) return `${hour}AM`;
    if (hour === 12) return '12PM';
    return `${hour - 12}PM`;
  };

  const getTimeIcon = (hour: number) => {
    if (hour >= 6 && hour < 9) return Sunrise;
    if (hour >= 9 && hour < 17) return Sun;
    if (hour >= 17 && hour < 21) return Sunset;
    return Moon;
  };

  return (
    <div className="card h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[--sunset] to-[--coral] flex items-center justify-center">
            <Clock className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold" style={{ fontFamily: 'var(--font-display)' }}>
              Best Posting Times
            </h3>
            <p className="text-sm text-white/50">When competitors get most engagement</p>
          </div>
        </div>
      </div>

      {/* Best Times Summary */}
      <div className="grid grid-cols-3 gap-2 mb-6">
        {bestTimes.map((time, index) => {
          const TimeIcon = getTimeIcon(time.hour);
          return (
            <div
              key={`${time.day}-${time.hour}`}
              className={`p-3 rounded-xl text-center ${
                index === 0
                  ? 'bg-gradient-to-br from-[--coral]/20 to-[--sunset]/20 border border-[--coral]/30'
                  : 'bg-white/5'
              }`}
            >
              <TimeIcon
                className={`w-5 h-5 mx-auto mb-1 ${
                  index === 0 ? 'text-[--coral]' : 'text-white/40'
                }`}
              />
              <p className="font-semibold text-sm">
                {time.day} {getTimeLabel(time.hour)}
              </p>
              <p className={`text-xs ${index === 0 ? 'text-[--coral]' : 'text-white/40'}`}>
                {time.engagement.toFixed(1)}% avg
              </p>
            </div>
          );
        })}
      </div>

      {/* Heatmap */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-xs text-white/40 font-normal text-left pb-2 w-12"></th>
              {hours.map((hour) => (
                <th key={hour} className="text-xs text-white/40 font-normal text-center pb-2">
                  {getTimeLabel(hour)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {heatmapData.map((dayData) => (
              <tr key={dayData.day}>
                <td className="text-xs text-white/60 py-1">{dayData.day}</td>
                {dayData.hours.map((hourData) => (
                  <td key={hourData.hour} className="p-1">
                    <div
                      className={`w-full aspect-square rounded-md ${getColor(
                        hourData.engagement
                      )} cursor-pointer hover:scale-110 transition-transform relative group`}
                    >
                      {/* Tooltip */}
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-[--card] border border-[--border] rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                        <p className="font-medium">{dayData.day} {getTimeLabel(hourData.hour)}</p>
                        <p className="text-[--coral]">{hourData.engagement.toFixed(1)}% eng</p>
                        <p className="text-white/40">{hourData.posts} posts</p>
                      </div>
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-4 mt-4 pt-4 border-t border-[--border]">
        <span className="text-xs text-white/40">Lower</span>
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 rounded bg-white/10" />
          <div className="w-4 h-4 rounded bg-[--coral]/20" />
          <div className="w-4 h-4 rounded bg-[--coral]/40" />
          <div className="w-4 h-4 rounded bg-[--coral]/70" />
          <div className="w-4 h-4 rounded bg-[--coral]" />
        </div>
        <span className="text-xs text-white/40">Higher</span>
      </div>
    </div>
  );
}
