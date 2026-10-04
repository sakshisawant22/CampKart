import React, { useState } from 'react';
import { useCampusKart } from '../context/CampusKartContext';
import { 
  TrendingUp, 
  Users, 
  ShoppingBag, 
  DollarSign, 
  ShieldAlert, 
  CheckCircle, 
  X, 
  Eye, 
  Trash2, 
  Building2, 
  Tag, 
  CheckCheck,
  BarChart3,
  Sparkles
} from 'lucide-react';
import { StatCard } from '../components/common/StatCard';
import { Button } from '../components/common/Button';

export const AdminPage: React.FC = () => {
  const { products, deleteProduct, showToast, partnerships } = useCampusKart();
  
  const [activeTab, setActiveTab] = useState<'overview' | 'listings' | 'reports' | 'colleges'>('overview');
  
  const [reportedItems, setReportedItems] = useState([
    {
      id: 'rep-1',
      itemTitle: 'Unverified Engineering Notes Photocopy',
      reportedBy: 'Amaan (Commerce)',
      reason: 'Low quality scanned pages missing 2 modules',
      status: 'pending',
      date: '2 hours ago',
    },
    {
      id: 'rep-2',
      itemTitle: 'Old Bicycle Lock with 1 Key',
      reportedBy: 'Rahul (Mech)',
      reason: 'Duplicate listing spam',
      status: 'pending',
      date: '1 day ago',
    },
    {
      id: 'rep-3',
      itemTitle: 'Pre-owned Chemistry Lab Goggles',
      reportedBy: 'sakshi (BioTech)',
      reason: 'Incorrect category tag',
      status: 'resolved',
      date: '3 days ago',
    },
  ]);

  const handleDismissReport = (id: string) => {
    setReportedItems((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: 'dismissed' } : r))
    );
    showToast('Report dismissed after review', 'info');
  };

  const handleResolveReport = (id: string) => {
    setReportedItems((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: 'resolved' } : r))
    );
    showToast('Report marked as resolved and action taken', 'success');
  };

  return (
    <div className="space-y-8 pb-12">
      
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-4xl bg-gradient-to-r from-purple-100 via-white to-pastel-mint-light border border-purple-200 shadow-soft flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 bg-purple-50 px-3 py-1 rounded-full border border-purple-200 text-xs font-bold text-purple-700 shadow-xs">
            <TrendingUp size={14} />
            <span>Platform Admin & Moderation Console</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-brand-dark tracking-tight">
            CampusKart Admin Portal
          </h1>
          <p className="text-xs sm:text-sm text-brand-muted">
            Monitor verified student enrollment, transactions, listing compliance, and revenue performance.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-3 py-1.5 rounded-full border border-emerald-300">
            ● System Operational
          </span>
        </div>
      </div>

      {/* 1. TOP METRICS OVERVIEW */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
        <StatCard
          label="Total Students"
          value="1,250"
          change="+18% MoM"
          variant="mint"
          icon={<Users size={20} />}
        />
        <StatCard
          label="Active Listings"
          value={`${products.length + 474}`}
          change="+12 today"
          variant="sage"
          icon={<Tag size={20} />}
        />
        <StatCard
          label="Transactions"
          value="2,104"
          change="99.4% safe"
          variant="peach"
          icon={<ShoppingBag size={20} />}
        />
        <StatCard
          label="Total Revenue"
          value="₹48,500"
          change="+24% rev"
          variant="lavender"
          icon={<DollarSign size={20} />}
        />
        <StatCard
          label="Reports Queue"
          value={`${reportedItems.filter((r) => r.status === 'pending').length}`}
          change="Urgent"
          isPositive={false}
          variant="white"
          icon={<ShieldAlert size={20} className="text-rose-500" />}
        />
      </div>

      {/* 2. ADMIN TABS */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
        {[
          { id: 'overview', label: 'Analytics & Growth', icon: BarChart3 },
          { id: 'listings', label: `Marketplace Listings (${products.length})`, icon: Tag },
          { id: 'reports', label: `Moderation Reports (${reportedItems.filter((r) => r.status === 'pending').length})`, icon: ShieldAlert },
          { id: 'colleges', label: `College Requests (${partnerships.length + 2})`, icon: Building2 },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
                isActive
                  ? 'bg-purple-800 text-white shadow-soft'
                  : 'bg-white text-brand-muted hover:text-brand-dark hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <Icon size={16} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB: ANALYTICS & CHARTS */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Chart 1: Category Listing Volume */}
            <div className="p-6 rounded-3xl bg-white border border-brand-border shadow-soft space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-extrabold text-sm sm:text-base text-brand-dark">Listing Distribution by Category</h3>
                <span className="text-xs text-brand-muted font-semibold">Live Real-time</span>
              </div>

              <div className="space-y-3 pt-2">
                {[
                  { name: 'Books & Textbooks', count: 42, color: 'bg-emerald-400' },
                  { name: 'Study Materials & Kits', count: 28, color: 'bg-blue-400' },
                  { name: 'Electronics & Calculators', count: 18, color: 'bg-purple-400' },
                  { name: 'Hostel Essentials & Gear', count: 12, color: 'bg-amber-400' },
                ].map((item, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-xs font-bold text-brand-dark">
                      <span>{item.name}</span>
                      <span>{item.count}%</span>
                    </div>
                    <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${item.color}`}
                        style={{ width: `${item.count}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chart 2: Monthly Transaction Revenue */}
            <div className="p-6 rounded-3xl bg-white border border-brand-border shadow-soft space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-extrabold text-sm sm:text-base text-brand-dark">Monthly Revenue (₹ in Thousands)</h3>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                  +34% Growth
                </span>
              </div>

              <div className="flex items-end justify-between h-44 pt-6 px-4 border-b border-slate-100">
                {[
                  { month: 'Oct', val: 18, height: '40%' },
                  { month: 'Nov', val: 24, height: '55%' },
                  { month: 'Dec', val: 21, height: '48%' },
                  { month: 'Jan', val: 38, height: '78%' },
                  { month: 'Feb', val: 42, height: '88%' },
                  { month: 'Mar', val: 48.5, height: '100%' },
                ].map((bar, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-2 flex-1">
                    <span className="text-[10px] font-bold text-brand-muted">₹{bar.val}k</span>
                    <div className="w-8 sm:w-10 bg-gradient-to-t from-purple-700 to-pastel-mint rounded-t-xl transition-all" style={{ height: bar.height }} />
                    <span className="text-[11px] font-bold text-brand-dark">{bar.month}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* TAB: LISTINGS MODERATION */}
      {activeTab === 'listings' && (
        <div className="bg-white rounded-3xl border border-brand-border shadow-soft overflow-hidden">
          <div className="p-4 bg-pastel-warm/50 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-bold text-sm text-brand-dark">All Campus Listings ({products.length})</h3>
            <span className="text-xs text-brand-muted">Real-time database moderation</span>
          </div>

          <div className="divide-y divide-slate-100 max-h-[550px] overflow-y-auto">
            {products.map((item) => (
              <div key={item.id} className="p-4 flex items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors">
                <div className="flex items-center gap-3 min-w-0">
                  <img src={item.images[0]} alt="" className="w-12 h-12 rounded-xl object-cover border border-slate-200 flex-shrink-0" />
                  <div className="min-w-0">
                    <h4 className="text-xs sm:text-sm font-bold text-brand-dark truncate">{item.title}</h4>
                    <p className="text-[11px] text-brand-muted">
                      {item.seller.name} • {item.category} • {item.location} • ₹{item.price}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                    item.status === 'active' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-slate-100 text-slate-700 border-slate-200'
                  }`}>
                    {item.status.toUpperCase()}
                  </span>
                  <button
                    onClick={() => deleteProduct(item.id)}
                    className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-xl transition-colors"
                    title="Remove listing"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB: REPORTS MODERATION */}
      {activeTab === 'reports' && (
        <div className="space-y-4">
          <div className="bg-white rounded-3xl border border-brand-border shadow-soft overflow-hidden divide-y divide-slate-100">
            {reportedItems.map((report) => (
              <div key={report.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-brand-dark">{report.itemTitle}</h4>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                      report.status === 'pending'
                        ? 'bg-rose-50 text-rose-700 border-rose-200'
                        : report.status === 'resolved'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : 'bg-slate-100 text-slate-700 border-slate-200'
                    }`}>
                      {report.status.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-xs text-brand-muted">
                    Reported by: <strong>{report.reportedBy}</strong> • {report.date}
                  </p>
                  <p className="text-xs text-rose-700 bg-rose-50/70 p-2 rounded-xl border border-rose-100 inline-block mt-1">
                    Reason: {report.reason}
                  </p>
                </div>

                {report.status === 'pending' && (
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDismissReport(report.id)}
                      className="text-xs font-bold"
                    >
                      Dismiss
                    </Button>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => handleResolveReport(report.id)}
                      className="text-xs font-bold"
                    >
                      Take Action
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB: COLLEGE PARTNERSHIPS INBOX */}
      {activeTab === 'colleges' && (
        <div className="space-y-4">
          <div className="bg-white rounded-3xl border border-brand-border shadow-soft p-5 space-y-4">
            <h3 className="text-sm font-bold text-brand-dark">Institutional Partnership Requests</h3>

            <div className="space-y-3">
              <div className="p-4 rounded-2xl bg-pastel-warm/50 border border-slate-200 space-y-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-xs sm:text-sm text-brand-dark">St. Xavier’s College of Engineering</h4>
                  <span className="text-[10px] bg-pastel-mint-light text-pastel-mint-dark font-bold px-2 py-0.5 rounded-full">
                    Approved Pilot
                  </span>
                </div>
                <p className="text-xs text-brand-muted">Contact: Dr. Rajiv Sen (Students Welfare) • 8,500 Students</p>
              </div>

              {partnerships.map((p) => (
                <div key={p.id} className="p-4 rounded-2xl bg-pastel-mint-light/40 border border-pastel-mint space-y-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-xs sm:text-sm text-brand-dark">{p.collegeName}</h4>
                    <span className="text-[10px] bg-purple-100 text-purple-800 font-bold px-2 py-0.5 rounded-full">
                      New Request
                    </span>
                  </div>
                  <p className="text-xs text-brand-muted">
                    Contact: {p.contactPerson} ({p.collegeEmail}) • {p.numberOfStudents}
                  </p>
                  <p className="text-xs text-brand-dark italic">“{p.message}”</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
