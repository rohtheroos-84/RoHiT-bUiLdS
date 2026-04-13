import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Github } from 'lucide-react';

interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

interface ContributionWeek {
  days: ContributionDay[];
}

const GITHUB_USERNAME = 'rohtheroos-84';
const CELL_SIZE = 11;
const CELL_GAP = 2;
const COLUMN_WIDTH = CELL_SIZE + CELL_GAP;

const formatDateKey = (date: Date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
};

const parseDateKey = (key: string) => {
  const [y, m, d] = key.split('-').map(Number);
  return new Date(y, m - 1, d);
};

const MIN_MONTH_LABEL_GAP_COLUMNS = 3;

const GitHubHeatmap: React.FC = () => {
  const [contributions, setContributions] = useState<ContributionWeek[]>([]);
  const [totalContributions, setTotalContributions] = useState(0);
  const [loading, setLoading] = useState(true);
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: false });

  useEffect(() => {
    const fetchContributions = async () => {
      try {
        // Use GitHub's contribution calendar via a proxy-free approach
        // We'll use the GitHub contributions API via github-contributions-api
        const res = await fetch(
          `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`
        );
        const data = await res.json();

        if (data && data.contributions) {
          const today = new Date();
          today.setHours(0, 0, 0, 0);

          const oneYearAgo = new Date(today);
          oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

          const todayKey = formatDateKey(today);
          const oneYearAgoKey = formatDateKey(oneYearAgo);

          const filteredDays = (data.contributions as ContributionDay[])
            .filter((day) => day.date >= oneYearAgoKey && day.date <= todayKey)
            .sort((a, b) => a.date.localeCompare(b.date));

          const weeks: ContributionWeek[] = [];
          let week: ContributionDay[] = [];
          let total = 0;

          filteredDays.forEach((day) => {
            week.push({
              date: day.date,
              count: day.count,
              level: day.level,
            });
            total += day.count;

            if (week.length === 7) {
              weeks.push({ days: [...week] });
              week = [];
            }
          });

          if (week.length > 0) {
            weeks.push({ days: week });
          }

          setContributions(weeks);
          setTotalContributions(total);
        }
      } catch (err) {
        console.error('Failed to fetch GitHub contributions:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchContributions();
  }, []);

  const getLevelColor = (level: number) => {
    switch (level) {
      case 0: return 'rgba(255, 255, 255, 0.05)';
      case 1: return 'rgba(0, 240, 255, 0.2)';
      case 2: return 'rgba(0, 240, 255, 0.4)';
      case 3: return 'rgba(0, 240, 255, 0.6)';
      case 4: return 'rgba(0, 240, 255, 0.9)';
      default: return 'rgba(255, 255, 255, 0.05)';
    }
  };

  const getLevelGlow = (level: number) => {
    if (level === 0) return 'none';
    return `0 0 ${level * 3}px rgba(0, 240, 255, ${level * 0.15})`;
  };

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const getMonthLabels = () => {
    if (contributions.length === 0) return [];

    const flatDays = contributions.flatMap((week) => week.days);
    const rawLabels: { label: string; index: number }[] = [];
    let lastMonth = parseDateKey(flatDays[0].date).getMonth();

    rawLabels.push({ label: months[lastMonth], index: 0 });

    flatDays.forEach((day, dayIndex) => {
      const month = parseDateKey(day.date).getMonth();
      if (month !== lastMonth) {
        const columnIndex = Math.floor(dayIndex / 7);

        if (rawLabels.length > 0 && rawLabels[rawLabels.length - 1].index === columnIndex) {
          rawLabels[rawLabels.length - 1] = { label: months[month], index: columnIndex };
        } else {
          rawLabels.push({ label: months[month], index: columnIndex });
        }

        lastMonth = month;
      }
    });

    if (rawLabels.length <= 1) return rawLabels;

    // If range starts mid-month, the first label can be visually cramped against the next one.
    // Drop the first label when it's too close, then enforce minimum gaps.
    const normalized = [...rawLabels];
    if (normalized[1].index - normalized[0].index < MIN_MONTH_LABEL_GAP_COLUMNS) {
      normalized.shift();
    }

    if (normalized.length <= 1) return normalized;

    const filtered = [normalized[0]];
    for (let i = 1; i < normalized.length; i++) {
      const prev = filtered[filtered.length - 1];
      const current = normalized[i];
      if (current.index - prev.index >= MIN_MONTH_LABEL_GAP_COLUMNS) {
        filtered.push(current);
      }
    }

    const lastRaw = normalized[normalized.length - 1];
    const lastFiltered = filtered[filtered.length - 1];
    if (lastFiltered.index !== lastRaw.index) {
      filtered.push(lastRaw);
    }

    return filtered;
  };

  const monthLabels = getMonthLabels();
  const monthTrackWidth = Math.max(
    contributions.length > 0
      ? contributions.length * CELL_SIZE + (contributions.length - 1) * CELL_GAP
      : 0,
    0
  );
  const columnCount = Math.max(contributions.length, 1);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6 } }
  };

  return (
    <section className="gradient-bg py-12 relative">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={containerVariants}
          className="max-w-5xl mx-auto"
        >
          <div className="glassmorphism rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Github className="text-neon-blue" size={20} />
                <h3 className="text-sm font-mono text-gray-300">
                  <a
                    href={`https://github.com/${GITHUB_USERNAME}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-neon-blue transition-colors"
                  >
                    @{GITHUB_USERNAME}
                  </a>
                </h3>
              </div>
              {!loading && (
                <span className="text-xs font-mono text-gray-500">
                  {totalContributions.toLocaleString()} contributions in the last year
                </span>
              )}
            </div>

            {loading ? (
              <div className="flex items-center justify-center h-[120px]">
                <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-neon-blue"></span>
              </div>
            ) : (
              <div className="overflow-x-auto">
                {/* Month labels */}
                <div
                  className="relative mb-1 ml-8 h-4"
                  style={{ width: `${monthTrackWidth}px`, minWidth: `${monthTrackWidth}px` }}
                >
                  {monthLabels.map((m, i) => (
                    <span
                      key={i}
                      className="absolute text-[10px] font-mono text-gray-500"
                      style={{
                        left: `${m.index * COLUMN_WIDTH}px`,
                      }}
                    >
                      {m.label}
                    </span>
                  ))}
                </div>

                <div className="flex gap-[2px]">
                  {/* Day labels */}
                  <div className="flex flex-col gap-[2px] mr-1 justify-between">
                    {['', 'Mon', '', 'Wed', '', 'Fri', ''].map((d, i) => (
                      <span key={i} className="text-[10px] font-mono text-gray-500 h-[11px] leading-[11px]">
                        {d}
                      </span>
                    ))}
                  </div>

                  {/* Heatmap grid */}
                  <div
                    className="grid gap-[2px]"
                    style={{
                      gridTemplateColumns: `repeat(${columnCount}, ${CELL_SIZE}px)`,
                      width: `${monthTrackWidth}px`,
                      minWidth: `${monthTrackWidth}px`,
                    }}
                  >
                    {contributions.map((week, weekIndex) => (
                      <div key={weekIndex} className="grid gap-[2px]" style={{ gridTemplateRows: `repeat(7, ${CELL_SIZE}px)` }}>
                        {Array.from({ length: 7 }).map((_, dayIndex) => {
                          const day = week.days[dayIndex];

                          if (!day) {
                            return <div key={`${weekIndex}-${dayIndex}`} className="w-[11px] h-[11px]" />;
                          }

                          return (
                            <motion.div
                              key={`${weekIndex}-${dayIndex}`}
                              initial={{ opacity: 0, scale: 0 }}
                              animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                              transition={{
                                delay: weekIndex * 0.008 + dayIndex * 0.002,
                                duration: 0.2,
                              }}
                              className="w-[11px] h-[11px] rounded-sm cursor-pointer"
                              style={{
                                backgroundColor: getLevelColor(day.level),
                                boxShadow: getLevelGlow(day.level),
                              }}
                              title={`${day.date}: ${day.count} contribution${day.count !== 1 ? 's' : ''}`}
                            />
                          );
                        })}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Legend */}
                <div className="flex items-center justify-end gap-1 mt-3">
                  <span className="text-[10px] font-mono text-gray-500 mr-1">Less</span>
                  {[0, 1, 2, 3, 4].map((level) => (
                    <div
                      key={level}
                      className="w-[11px] h-[11px] rounded-sm"
                      style={{
                        backgroundColor: getLevelColor(level),
                        boxShadow: getLevelGlow(level),
                      }}
                    />
                  ))}
                  <span className="text-[10px] font-mono text-gray-500 ml-1">More</span>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default GitHubHeatmap;
