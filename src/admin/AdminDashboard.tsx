import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import {
  Users, Eye, TrendingUp, FileText, BookOpen, Activity,
  BarChart3, Calendar
} from 'lucide-react';

interface Stats {
  totalPageViews: number;
  todayViews: number;
  caseStudiesCount: number;
  insightsCount: number;
  totalAdmins: number;
  recentEvents: { event_type: string; page: string; created_at: string }[];
  topPages: { page: string; count: number }[];
  eventsByDay: { date: string; count: number }[];
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const [
        { count: totalViews },
        { count: todayViews },
        { count: caseStudies },
        { count: insightsCount },
        { count: admins },
        { data: recentEvents },
        { data: allEvents },
      ] = await Promise.all([
        supabase.from('analytics_events').select('*', { count: 'exact', head: true }),
        supabase.from('analytics_events').select('*', { count: 'exact', head: true }).gte('created_at', today.toISOString()),
        supabase.from('case_studies').select('*', { count: 'exact', head: true }),
        supabase.from('insights').select('*', { count: 'exact', head: true }),
        supabase.from('admin_roles').select('*', { count: 'exact', head: true }),
        supabase.from('analytics_events').select('event_type, page, created_at').order('created_at', { ascending: false }).limit(10),
        supabase.from('analytics_events').select('page, created_at').order('created_at', { ascending: false }).limit(500),
      ]);

      // Aggregate top pages
      const pageCounts: Record<string, number> = {};
      (allEvents ?? []).forEach((e) => {
        pageCounts[e.page] = (pageCounts[e.page] ?? 0) + 1;
      });
      const topPages = Object.entries(pageCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([page, count]) => ({ page, count }));

      // Events by day (last 7 days)
      const dayMap: Record<string, number> = {};
      for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        dayMap[d.toISOString().slice(0, 10)] = 0;
      }
      (allEvents ?? []).forEach((e) => {
        const day = e.created_at.slice(0, 10);
        if (day in dayMap) dayMap[day]++;
      });
      const eventsByDay = Object.entries(dayMap).map(([date, count]) => ({ date, count }));

      setStats({
        totalPageViews: totalViews ?? 0,
        todayViews: todayViews ?? 0,
        caseStudiesCount: caseStudies ?? 0,
        insightsCount: insightsCount ?? 0,
        totalAdmins: admins ?? 0,
        recentEvents: recentEvents ?? [],
        topPages,
        eventsByDay,
      });
      setLoading(false);
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-6 h-6 border-2 border-brand-green border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const statCards = [
    { icon: Eye, label: 'Total Page Views', value: stats?.totalPageViews ?? 0, color: 'text-sky-400' },
    { icon: TrendingUp, label: "Today's Views", value: stats?.todayViews ?? 0, color: 'text-brand-green' },
    { icon: FileText, label: 'Case Studies', value: stats?.caseStudiesCount ?? 0, color: 'text-amber-400' },
    { icon: BookOpen, label: 'Insights', value: stats?.insightsCount ?? 0, color: 'text-rose-400' },
    { icon: Users, label: 'Admin Users', value: stats?.totalAdmins ?? 0, color: 'text-violet-400' },
    { icon: Activity, label: 'Events (Last 7d)', value: stats?.eventsByDay.reduce((s, d) => s + d.count, 0) ?? 0, color: 'text-orange-400' },
  ];

  const maxCount = Math.max(...(stats?.eventsByDay.map((d) => d.count) ?? [1]), 1);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-black text-white">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Site analytics and content overview</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {statCards.map(({ icon: Icon, label, value, color }) => (
          <div key={label} className="bg-[#141414] border border-[#1a1a1a] p-5">
            <div className="flex items-start justify-between mb-4">
              <Icon size={16} className={color} />
              <span className={`text-2xl font-black ${color}`}>{value.toLocaleString()}</span>
            </div>
            <p className="text-xs text-gray-500 font-medium">{label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart — Events last 7 days */}
        <div className="bg-[#141414] border border-[#1a1a1a] p-6">
          <div className="flex items-center gap-2 mb-6">
            <BarChart3 size={15} className="text-brand-green" />
            <h3 className="text-sm font-semibold text-white">Page Views — Last 7 Days</h3>
          </div>
          <div className="flex items-end gap-2 h-32">
            {stats?.eventsByDay.map(({ date, count }) => (
              <div key={date} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className="w-full bg-brand-green/20 hover:bg-brand-green/40 transition-colors relative group"
                  style={{ height: `${(count / maxCount) * 100}%`, minHeight: count > 0 ? '4px' : '2px' }}
                >
                  <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-brand-green text-black text-[10px] font-bold px-1.5 py-0.5 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {count}
                  </div>
                </div>
                <span className="text-[10px] text-gray-600">
                  {new Date(date).toLocaleDateString('en', { weekday: 'short' })}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Pages */}
        <div className="bg-[#141414] border border-[#1a1a1a] p-6">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp size={15} className="text-brand-green" />
            <h3 className="text-sm font-semibold text-white">Top Pages</h3>
          </div>
          {stats?.topPages.length === 0 ? (
            <p className="text-gray-600 text-sm">No data yet</p>
          ) : (
            <div className="space-y-3">
              {stats?.topPages.map(({ page, count }, i) => (
                <div key={page} className="flex items-center gap-3">
                  <span className="text-xs text-gray-600 w-4">{i + 1}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-300 truncate">{page}</span>
                      <span className="text-xs text-brand-green ml-2">{count}</span>
                    </div>
                    <div className="h-0.5 bg-[#222]">
                      <div
                        className="h-full bg-brand-green/50"
                        style={{ width: `${(count / (stats.topPages[0]?.count ?? 1)) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Recent Events */}
      <div className="bg-[#141414] border border-[#1a1a1a] p-6">
        <div className="flex items-center gap-2 mb-6">
          <Calendar size={15} className="text-brand-green" />
          <h3 className="text-sm font-semibold text-white">Recent Activity</h3>
        </div>
        {(stats?.recentEvents.length ?? 0) === 0 ? (
          <p className="text-gray-600 text-sm">No events tracked yet. Events will appear here as visitors browse the site.</p>
        ) : (
          <div className="space-y-1">
            {stats?.recentEvents.map((event, i) => (
              <div key={i} className="flex items-center gap-4 py-2 border-b border-[#1a1a1a] last:border-0">
                <div className="w-2 h-2 rounded-full bg-brand-green/40 flex-shrink-0" />
                <span className="text-xs text-gray-400 font-medium">{event.event_type}</span>
                <span className="text-xs text-gray-600 flex-1 truncate">{event.page}</span>
                <span className="text-xs text-gray-700 flex-shrink-0">
                  {new Date(event.created_at).toLocaleTimeString()}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
