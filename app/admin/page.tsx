tsx
import { createClient } from '@/lib/supabase';
import Link from 'next/link';
import { 
  Users, 
  HelpCircle, 
  CheckCircle, 
  AlertCircle, 
  ArrowRight,
  TrendingUp
} from 'lucide-react';

async function getStats() {
  const supabase = await createClient();

  const [
    { count: totalUsers },
    { count: pendingQuestions },
    { count: pendingVerifications },
    { data: recentQuestions }
  ] = await Promise.all([
    supabase.from('profiles').select('*', { count: 'exact', head: true }),
    supabase.from('community_questions').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
    supabase.from('verification_requests').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
    supabase.from('community_questions').select('*').order('created_at', { ascending: false }).limit(5)
  ]);

  return {
    totalUsers: totalUsers || 0,
    pendingQuestions: pendingQuestions || 0,
    pendingVerifications: pendingVerifications || 0,
    recentQuestions: recentQuestions || []
  };
}

export default async function AdminDashboard() {
  const stats = await getStats();

  const cards = [
    { 
      label: 'Total Farmers', 
      value: stats.totalUsers, 
      icon: Users, 
      color: 'text-blue-600', 
      bg: 'bg-blue-100' 
    },
    { 
      label: 'Pending Questions', 
      value: stats.pendingQuestions, 
      icon: HelpCircle, 
      color: 'text-amber-600', 
      bg: 'bg-amber-100' 
    },
    { 
      label: 'Verify Requests', 
      value: stats.pendingVerifications, 
      icon: CheckCircle, 
      color: 'text-green-600', 
      bg: 'bg-green-100' 
    },
    { 
      label: 'Active Reports', 
      value: 0, 
      icon: AlertCircle, 
      color: 'text-red-600', 
      bg: 'bg-red-100' 
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">System Overview</h1>
        <p className="text-slate-500">Welcome back, Admin. Here is what is happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card) => (
          <div key={card.label} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">{card.label}</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">{card.value}</p>
              </div>
              <div className={`${card.bg} p-3 rounded-lg`}>
                <card.icon className={`w-6 h-6 ${card.color}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Pending Questions */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
            <h2 className="font-semibold text-slate-800">Recent Guest Questions</h2>
            <Link href="/admin/questions" className="text-sm text-green-600 font-medium hover:underline flex items-center">
              View All <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          <div className="divide-y divide-slate-100">
            {stats.recentQuestions.length > 0 ? (
              stats.recentQuestions.map((q) => (
                <div key={q.id} className="p-6 hover:bg-slate-50 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider px-2 py-1 bg-slate-100 text-slate-600 rounded">
                      {q.category}
                    </span>
                    <span className="text-xs text-slate-400">
                      {new Date(q.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-slate-800 font-medium line-clamp-2">{q.question}</p>
                  <p className="text-sm text-slate-500 mt-2">By: {q.name} ({q.state})</p>
                </div>
              ))
            ) : (
              <div className="p-10 text-center text-slate-400">
                No pending questions at the moment.
              </div>
            )}
          </div>
        </div>

        {/* System Health / Quick Actions */}
        <div className="space-y-6">
          <div className="bg-slate-900 rounded-xl p-6 text-white">
            <h3 className="flex items-center text-lg font-semibold mb-4">
              <TrendingUp className="w-5 h-5 mr-2 text-green-400" />
              Platform Growth
            </h3>
            <p className="text-slate-400 text-sm mb-6">
              User engagement is up 12% this week. Verification requests are increasing.
            </p>
            <div className="space-y-4">
              <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 w-[70%]"></div>
              </div>
              <div className="flex justify-between text-xs text-slate-400">
                <span>Storage Limit</span>
                <span>70% Used</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h3 className="font-semibold text-slate-800 mb-4">Admin Quick Links</h3>
            <div className="grid grid-cols-1 gap-2">
              <Link href="/admin/users" className="p-3 text-sm bg-slate-50 hover:bg-slate-100 rounded-lg text-slate-700 font-medium">
                Manage User Roles
              </Link>
              <Link href="/admin/moderation" className="p-3 text-sm bg-slate-50 hover:bg-slate-100 rounded-lg text-slate-700 font-medium">
                Content Moderation
              </Link>
              <Link href="/admin/settings" className="p-3 text-sm bg-slate-50 hover:bg-slate-100 rounded-lg text-slate-700 font-medium">
                System Settings
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}