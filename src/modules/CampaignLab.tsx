import { useState } from 'react';
import { useCreatorOSStore } from '@/store';
import type { Project } from '@/types';
import { 
  Megaphone, 
  Plus, 
  Target,
  Lightbulb,
  TrendingUp,
  Users,
  BarChart3
} from 'lucide-react';
import { cn } from '@/lib/utils';

export function CampaignLab() {
  const { projects } = useCreatorOSStore();
  const campaigns = projects.filter((p: Project) => p.project_type === 'campaign');
  const [selectedCampaign, setSelectedCampaign] = useState<string | null>(null);
  const [showNewCampaignModal, setShowNewCampaignModal] = useState(false);

  const activeCampaigns = campaigns.filter((c: Project) => c.status !== 'archived');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#F0F0F5]">Campaign Lab</h1>
          <p className="text-[#A0A0B0] mt-1">Develop strategic campaigns from brief to pitch</p>
        </div>
        <button
          onClick={() => setShowNewCampaignModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span className="text-sm font-medium">New Campaign</span>
        </button>
      </div>

      {/* Studios */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        <StudioTab icon={Target} label="Strategy Studio" active />
        <StudioTab icon={Lightbulb} label="Ideation Studio" />
        <StudioTab icon={Megaphone} label="Copywriting" />
        <StudioTab icon={Users} label="Art Direction" />
        <StudioTab icon={BarChart3} label="Analytics" />
      </div>

      {/* Active Campaigns */}
      <div>
        <h2 className="text-lg font-semibold text-[#F0F0F5] mb-4">Active Campaigns</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {activeCampaigns.map((campaign) => (
            <CampaignCard 
              key={campaign.id} 
              campaign={campaign}
              isSelected={selectedCampaign === campaign.id}
              onSelect={() => setSelectedCampaign(selectedCampaign === campaign.id ? null : campaign.id)}
            />
          ))}
        </div>
      </div>

      {/* AI Tools */}
      <div className="bg-[#12121A] border border-[#2A2A3A] rounded-xl p-6">
        <h2 className="text-lg font-semibold text-[#F0F0F5] mb-4">AI Campaign Tools</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <AIActionButton 
            icon={Lightbulb}
            label="Idea Generator"
            description="Generate campaign territories"
          />
          <AIActionButton 
            icon={Target}
            label="Insight Miner"
            description="Find consumer insights"
          />
          <AIActionButton 
            icon={Megaphone}
            label="Copy Writer"
            description="Write taglines & copy"
          />
          <AIActionButton 
            icon={TrendingUp}
            label="Fame Predictor"
            description="Score campaign potential"
          />
        </div>
      </div>

      {showNewCampaignModal && (
        <NewCampaignModal onClose={() => setShowNewCampaignModal(false)} />
      )}
    </div>
  );
}

function StudioTab({ icon: Icon, label, active = false }: { icon: React.ElementType; label: string; active?: boolean }) {
  return (
    <button className={cn(
      'flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-colors',
      active ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' : 'text-[#A0A0B0] hover:bg-[#1A1A25] hover:text-[#F0F0F5]'
    )}>
      <Icon className="w-4 h-4" />
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
}

function CampaignCard({ campaign, isSelected, onSelect }: { campaign: Project; isSelected: boolean; onSelect: () => void }) {
  const statusColors: Record<string, string> = {
    briefing: 'text-amber-400 bg-amber-400/10',
    strategy: 'text-blue-400 bg-blue-400/10',
    ideation: 'text-purple-400 bg-purple-400/10',
    development: 'text-indigo-400 bg-indigo-400/10',
    presentation: 'text-green-400 bg-green-400/10',
    approved: 'text-green-400 bg-green-400/10',
  };

  return (
    <div 
      onClick={onSelect}
      className={cn(
        'bg-[#12121A] border rounded-xl p-5 cursor-pointer transition-all',
        isSelected ? 'border-indigo-500/50 shadow-lg shadow-indigo-500/10' : 'border-[#2A2A3A] hover:border-[#3A3A4A]'
      )}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-[#F0F0F5]">{campaign.title}</h3>
          {campaign.stage && (
            <p className="text-sm text-[#606070]">{campaign.stage}</p>
          )}
        </div>
        <span className={cn('text-xs px-2 py-1 rounded-full', statusColors[campaign.status])}>
          {campaign.status}
        </span>
      </div>

      {campaign.description && (
        <p className="text-sm text-[#A0A0B0] mb-4 line-clamp-2">{campaign.description}</p>
      )}

      {isSelected && (
        <div className="flex gap-2 pt-4 border-t border-[#2A2A3A]">
          <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-indigo-500/10 text-indigo-400 rounded-lg hover:bg-indigo-500/20 transition-colors text-sm">
            <Lightbulb className="w-4 h-4" />
            Generate Ideas
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-[#1A1A25] text-[#A0A0B0] rounded-lg hover:bg-[#2A2A3A] transition-colors text-sm">
            <Megaphone className="w-4 h-4" />
            Create Deck
          </button>
        </div>
      )}
    </div>
  );
}

function AIActionButton({ icon: Icon, label, description }: { icon: React.ElementType; label: string; description: string }) {
  return (
    <button className="flex flex-col items-center gap-3 p-4 bg-[#1A1A25] rounded-lg hover:bg-[#2A2A3A] transition-colors text-left">
      <div className="w-10 h-10 bg-indigo-500/10 rounded-lg flex items-center justify-center">
        <Icon className="w-5 h-5 text-indigo-400" />
      </div>
      <div className="text-center">
        <p className="text-sm font-medium text-[#F0F0F5]">{label}</p>
        <p className="text-xs text-[#606070] mt-1">{description}</p>
      </div>
    </button>
  );
}

function NewCampaignModal({ onClose }: { onClose: () => void }) {
  const { addProject } = useCreatorOSStore();
  const [formData, setFormData] = useState({
    brand_name: '',
    campaign_name: '',
    category: '',
    business_problem: '',
    campaign_objective: '',
    key_message: '',
  });

  const handleSubmit = () => {
    addProject({
      domain_id: '2',
      title: `${formData.brand_name} — ${formData.campaign_name || 'Campaign'}`,
      description: formData.campaign_objective,
      project_type: 'campaign',
      status: 'active',
      priority: 'medium',
      visibility: 'private',
      last_activity_at: new Date().toISOString(),
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-lg bg-[#12121A] border border-[#2A2A3A] rounded-xl shadow-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-[#2A2A3A]">
          <h2 className="text-lg font-semibold text-[#F0F0F5]">New Campaign</h2>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm text-[#A0A0B0] mb-1">Brand Name *</label>
            <input
              type="text"
              value={formData.brand_name}
              onChange={(e) => setFormData({ ...formData, brand_name: e.target.value })}
              className="w-full bg-[#1A1A25] border border-[#2A2A3A] rounded-lg px-4 py-2 text-[#F0F0F5] focus:outline-none focus:border-indigo-500"
              placeholder="Brand or company name"
            />
          </div>
          <div>
            <label className="block text-sm text-[#A0A0B0] mb-1">Campaign Name</label>
            <input
              type="text"
              value={formData.campaign_name}
              onChange={(e) => setFormData({ ...formData, campaign_name: e.target.value })}
              className="w-full bg-[#1A1A25] border border-[#2A2A3A] rounded-lg px-4 py-2 text-[#F0F0F5] focus:outline-none focus:border-indigo-500"
              placeholder="Internal campaign name"
            />
          </div>
          <div>
            <label className="block text-sm text-[#A0A0B0] mb-1">Category</label>
            <input
              type="text"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full bg-[#1A1A25] border border-[#2A2A3A] rounded-lg px-4 py-2 text-[#F0F0F5] focus:outline-none focus:border-indigo-500"
              placeholder="e.g., FMCG, Technology, Fashion"
            />
          </div>
          <div>
            <label className="block text-sm text-[#A0A0B0] mb-1">Business Problem</label>
            <textarea
              value={formData.business_problem}
              onChange={(e) => setFormData({ ...formData, business_problem: e.target.value })}
              className="w-full h-20 bg-[#1A1A25] border border-[#2A2A3A] rounded-lg px-4 py-2 text-[#F0F0F5] focus:outline-none focus:border-indigo-500 resize-none"
              placeholder="What problem are we solving?"
            />
          </div>
          <div>
            <label className="block text-sm text-[#A0A0B0] mb-1">Campaign Objective</label>
            <textarea
              value={formData.campaign_objective}
              onChange={(e) => setFormData({ ...formData, campaign_objective: e.target.value })}
              className="w-full h-20 bg-[#1A1A25] border border-[#2A2A3A] rounded-lg px-4 py-2 text-[#F0F0F5] focus:outline-none focus:border-indigo-500 resize-none"
              placeholder="What do we want to achieve?"
            />
          </div>
        </div>
        <div className="flex justify-end gap-2 px-6 py-4 border-t border-[#2A2A3A]">
          <button onClick={onClose} className="px-4 py-2 text-sm text-[#A0A0B0] hover:text-[#F0F0F5]">Cancel</button>
          <button 
            onClick={handleSubmit}
            disabled={!formData.brand_name}
            className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 disabled:opacity-50 text-white rounded-lg text-sm"
          >
            Create Campaign
          </button>
        </div>
      </div>
    </div>
  );
}
