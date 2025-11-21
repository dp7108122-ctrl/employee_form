import React from 'react';
import { EmployeeData } from '../types';
import { Mail, Phone, MapPin, Briefcase, Calendar, Award, Heart, User } from 'lucide-react';

interface EmployeeCardProps {
  data: EmployeeData;
}

export const EmployeeCard: React.FC<EmployeeCardProps> = ({ data }) => {
  return (
    <div className="animate-slide-up bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100 max-w-2xl mx-auto mt-8">
      <div className="bg-gradient-to-r from-teal-600 to-emerald-600 px-6 py-8 text-white text-center relative">
        <div className="absolute inset-0 bg-white/10 pattern-grid-lg opacity-20"></div>
        
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg overflow-hidden mb-4 bg-white">
            {data.profilePhotoUrl ? (
              <img src={data.profilePhotoUrl} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <User className="w-full h-full p-4 text-slate-300" />
            )}
          </div>
          <h2 className="text-3xl font-bold tracking-tight">{data.fullName}</h2>
          <div className="flex items-center gap-2 mt-2 text-teal-100 bg-white/20 px-3 py-1 rounded-full text-sm backdrop-blur-sm">
            <Briefcase className="w-4 h-4" />
            <span>{data.department}</span>
          </div>
        </div>
      </div>

      <div className="p-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
             <div className="flex items-start gap-3">
              <div className="p-2 bg-teal-50 rounded-lg text-teal-600">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Email ID</p>
                <p className="text-slate-900 font-medium">{data.email}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 bg-teal-50 rounded-lg text-teal-600">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Contact</p>
                <p className="text-slate-900 font-medium">+91 {data.contactNumber}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 bg-teal-50 rounded-lg text-teal-600">
                <User className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Gender</p>
                <p className="text-slate-900 font-medium capitalize">{data.gender}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
             <div className="flex items-start gap-3">
              <div className="p-2 bg-teal-50 rounded-lg text-teal-600">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Joining Date</p>
                <p className="text-slate-900 font-medium">
                  {new Date(data.joiningDate).toLocaleString('en-IN', { 
                    dateStyle: 'medium', 
                    timeStyle: 'short' 
                  })}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 bg-teal-50 rounded-lg text-teal-600">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Address</p>
                <p className="text-slate-900 font-medium">{data.address}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-100 pt-6">
          <div className="flex items-start gap-3 mb-3">
            <Award className="w-5 h-5 text-teal-600 mt-0.5" />
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Skills</p>
          </div>
          <div className="flex flex-wrap gap-2 pl-8">
            {data.skills.map(skill => (
              <span key={skill} className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm font-medium border border-slate-200">
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="border-t border-slate-100 pt-6">
          <div className="flex items-start gap-3 mb-3">
            <Heart className="w-5 h-5 text-purple-500 mt-0.5" />
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Hobbies</p>
          </div>
          <div className="flex flex-wrap gap-2 pl-8">
            {data.hobbies.map(hobby => (
              <span key={hobby} className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-sm font-medium border border-purple-100">
                {hobby}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};