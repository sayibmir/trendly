'use client';

import { useState } from 'react';
import WeeklyReport from '@/components/reports/WeeklyReport';
import {
  FileText,
  Calendar,
  Clock,
  Download,
  Filter,
  Plus,
  CheckCircle,
} from 'lucide-react';
import { format, subDays } from 'date-fns';

interface ReportItem {
  id: string;
  title: string;
  type: 'weekly' | 'monthly' | 'custom';
  generatedAt: Date;
  status: 'ready' | 'generating' | 'scheduled';
}

const mockReports: ReportItem[] = [
  {
    id: '1',
    title: 'Weekly Competitor Report',
    type: 'weekly',
    generatedAt: new Date(),
    status: 'ready',
  },
  {
    id: '2',
    title: 'Weekly Competitor Report',
    type: 'weekly',
    generatedAt: subDays(new Date(), 7),
    status: 'ready',
  },
  {
    id: '3',
    title: 'Monthly Summary - February',
    type: 'monthly',
    generatedAt: subDays(new Date(), 14),
    status: 'ready',
  },
  {
    id: '4',
    title: 'Weekly Competitor Report',
    type: 'weekly',
    generatedAt: subDays(new Date(), 21),
    status: 'ready',
  },
];

export default function ReportsView() {
  const [selectedReport, setSelectedReport] = useState<string | null>('1');
  const [filterType, setFilterType] = useState<'all' | 'weekly' | 'monthly'>('all');

  const filteredReports = mockReports.filter(
    (r) => filterType === 'all' || r.type === filterType
  );

  return (
    <div className="flex h-[calc(100vh-6rem)] gap-6">
      {/* Sidebar - Reports List */}
      <div className="w-80 flex-shrink-0 flex flex-col bg-[--card] rounded-2xl border border-[--border] overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-[--border]">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold" style={{ fontFamily: 'var(--font-display)' }}>
              Reports
            </h2>
            <button className="p-2 rounded-lg bg-[--coral]/20 text-[--coral] hover:bg-[--coral]/30 transition-colors">
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Filter */}
          <div className="flex items-center gap-1 p-1 bg-white/5 rounded-lg">
            {(['all', 'weekly', 'monthly'] as const).map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`flex-1 py-1.5 rounded-md text-xs font-medium transition-all capitalize ${
                  filterType === type
                    ? 'bg-[--coral] text-white'
                    : 'text-white/50 hover:text-white'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Reports List */}
        <div className="flex-1 overflow-y-auto p-2">
          {filteredReports.map((report) => (
            <button
              key={report.id}
              onClick={() => setSelectedReport(report.id)}
              className={`w-full p-3 rounded-xl text-left transition-all mb-2 ${
                selectedReport === report.id
                  ? 'bg-gradient-to-r from-[--coral]/20 to-transparent border border-[--coral]/30'
                  : 'hover:bg-white/5'
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    report.type === 'weekly'
                      ? 'bg-[--coral]/20 text-[--coral]'
                      : 'bg-[--ocean]/20 text-[--ocean]'
                  }`}
                >
                  <FileText className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{report.title}</p>
                  <div className="flex items-center gap-2 mt-1 text-xs text-white/40">
                    <Calendar className="w-3 h-3" />
                    <span>{format(report.generatedAt, 'MMM d, yyyy')}</span>
                  </div>
                </div>
                {report.status === 'ready' && (
                  <CheckCircle className="w-4 h-4 text-[--mint] flex-shrink-0" />
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Generate New */}
        <div className="p-4 border-t border-[--border]">
          <button className="w-full py-3 px-4 bg-gradient-to-r from-[--coral] to-[--sunset] rounded-xl text-sm font-semibold hover:shadow-lg hover:shadow-[--coral]/25 transition-all flex items-center justify-center gap-2">
            <FileText className="w-4 h-4" />
            Generate New Report
          </button>
        </div>
      </div>

      {/* Main Content - Report View */}
      <div className="flex-1 overflow-y-auto">
        {selectedReport ? (
          <WeeklyReport />
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-4">
              <FileText className="w-10 h-10 text-white/20" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Select a Report</h3>
            <p className="text-white/50">
              Choose a report from the sidebar to view its contents
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
