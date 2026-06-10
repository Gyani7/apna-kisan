import React from 'react';
import { ShieldCheck, Sprout, TrendingUp, Award, Crown, Star } from 'lucide-react';

interface ReputationBadgeProps {
  reputation_points: number;
  is_verified: boolean;
  className?: string;
}

const ReputationBadge: React.FC<ReputationBadgeProps> = ({ 
  reputation_points, 
  is_verified, 
  className = "" 
}) => {
  const getLevelDetails = (points: number) => {
    if (points >= 5001) {
      return {
        label: "Kisan Guru",
        color: "bg-amber-100 text-amber-700 border-amber-200",
        icon: <Star className="w-3 h-3 mr-1" />
      };
    }
    if (points >= 2001) {
      return {
        label: "Master Farmer",
        color: "bg-purple-100 text-purple-700 border-purple-200",
        icon: <Crown className="w-3 h-3 mr-1" />
      };
    }
    if (points >= 501) {
      return {
        label: "Expert Farmer",
        color: "bg-blue-100 text-blue-700 border-blue-200",
        icon: <Award className="w-3 h-3 mr-1" />
      };
    }
    if (points >= 101) {
      return {
        label: "Progressive Farmer",
        color: "bg-green-100 text-green-700 border-green-200",
        icon: <TrendingUp className="w-3 h-3 mr-1" />
      };
    }
    return {
      label: "Seed Farmer",
      color: "bg-slate-100 text-slate-600 border-slate-200",
      icon: <Sprout className="w-3 h-3 mr-1" />
    };
  };

  const level = getLevelDetails(reputation_points);

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${level.color}`}>
        {level.icon}
        {level.label}
      </div>
      
      {is_verified && (
        <div className="flex items-center text-blue-600" title="Verified Farmer">
          <ShieldCheck className="w-5 h-5 fill-blue-600 text-white" />
        </div>
      )}
    </div>
  );
};

export default ReputationBadge;