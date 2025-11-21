import React, { useState, useEffect, useCallback } from 'react';
import { Department, EmployeeData, FormErrors, SKILL_OPTIONS, HOBBY_OPTIONS } from './types';
import { validateField, validateForm } from './utils/validation';
import { FormInput } from './components/FormInput';
import { FormSelect } from './components/FormSelect';
import { FormMultiSelect } from './components/FormMultiSelect';
import { EmployeeCard } from './components/EmployeeCard';
import { Trash2, Send, UserPlus, CheckCircle } from 'lucide-react';

const INITIAL_DATA: EmployeeData = {
  fullName: '',
  email: '',
  contactNumber: '',
  gender: '',
  skills: [],
  department: '',
  joiningDate: '',
  hobbies: [],
  address: '',
  profilePhoto: null,
};

const App: React.FC = () => {
  const [formData, setFormData] = useState<EmployeeData>(INITIAL_DATA);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submittedData, setSubmittedData] = useState<EmployeeData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Real-time validation for touched fields
  useEffect(() => {
    const newErrors: FormErrors = {};
    let hasErrors = false;

    Object.keys(touched).forEach((key) => {
      const fieldKey = key as keyof EmployeeData;
      const error = validateField(fieldKey, formData[fieldKey], formData);
      if (error) {
        newErrors[fieldKey] = error;
        hasErrors = true;
      }
    });
    
    setErrors(prev => ({ ...prev, ...newErrors }));
    
    // Clear errors for fields that are now valid
    Object.keys(formData).forEach(key => {
        const fieldKey = key as keyof EmployeeData;
        if (touched[fieldKey] && !validateField(fieldKey, formData[fieldKey], formData)) {
            setErrors(prev => {
                const next = { ...prev };
                delete next[fieldKey];
                return next;
            });
        }
    });

  }, [formData, touched]);

  const handleChange = (name: keyof EmployeeData, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleChange('profilePhoto', e.target.files[0]);
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, option: string) => {
    const isChecked = e.target.checked;
    const currentHobbies = formData.hobbies;
    let newHobbies;
    if (isChecked) {
      newHobbies = [...currentHobbies, option];
    } else {
      newHobbies = currentHobbies.filter((h) => h !== option);
    }
    handleChange('hobbies', newHobbies);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mark all as touched to trigger full validation display
    const allTouched: Record<string, boolean> = {};
    Object.keys(formData).forEach(key => allTouched[key] = true);
    setTouched(allTouched);

    const validationErrors = validateForm(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);
      
      // Simulate PHP backend processing delay
      await new Promise(resolve => setTimeout(resolve, 800));

      // Create object URL for preview
      const photoUrl = formData.profilePhoto ? URL.createObjectURL(formData.profilePhoto) : undefined;
      
      setSubmittedData({
        ...formData,
        profilePhotoUrl: photoUrl
      });
      setIsSubmitting(false);
      
      // Scroll to result
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    } else {
       // Scroll to top error
       const firstErrorField = document.querySelector('.text-red-500');
       if(firstErrorField) {
           firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
       }
    }
  };

  const handleReset = () => {
    if (submittedData?.profilePhotoUrl) {
      URL.revokeObjectURL(submittedData.profilePhotoUrl);
    }
    setFormData(INITIAL_DATA);
    setErrors({});
    setTouched({});
    setSubmittedData(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="mx-auto h-12 w-12 bg-teal-600 rounded-xl flex items-center justify-center shadow-lg shadow-teal-200">
            <UserPlus className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Employee Registration</h1>
          <p className="text-lg text-slate-600 max-w-lg mx-auto">Complete the form below to register a new employee in the system.</p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
          <div className="bg-slate-50/50 border-b border-slate-100 px-8 py-4">
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Personal & Professional Details</h3>
          </div>
          
          <form onSubmit={handleSubmit} className="p-8 space-y-8" noValidate>
            
            {/* Personal Information Group */}
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormInput
                  label="Employee Name"
                  name="fullName"
                  value={formData.fullName}
                  onChange={(e) => handleChange('fullName', e.target.value)}
                  error={errors.fullName}
                  placeholder="e.g. John Doe"
                  required
                />
                <FormInput
                  label="Email ID"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  error={errors.email}
                  placeholder="example@gmail.com"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormInput
                  label="Contact Number"
                  type="tel"
                  name="contactNumber"
                  prefix="+91"
                  value={formData.contactNumber}
                  onChange={(e) => handleChange('contactNumber', e.target.value)}
                  error={errors.contactNumber}
                  placeholder="9876543210"
                  maxLength={10}
                  required
                />
                
                 <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-slate-700">Gender <span className="text-red-500">*</span></label>
                  <div className="flex gap-6 mt-1">
                    {['Male', 'Female', 'Other'].map((option) => (
                      <label key={option} className="flex items-center gap-2 cursor-pointer group">
                        <div className="relative flex items-center">
                          <input
                            type="radio"
                            name="gender"
                            value={option}
                            checked={formData.gender === option}
                            onChange={(e) => handleChange('gender', e.target.value)}
                            className="peer sr-only"
                          />
                          <div className="w-5 h-5 border-2 border-slate-300 rounded-full peer-checked:border-teal-600 peer-checked:border-[6px] transition-all duration-200 bg-white"></div>
                        </div>
                        <span className="text-sm text-slate-700 group-hover:text-slate-900">{option}</span>
                      </label>
                    ))}
                  </div>
                  {errors.gender && <span className="text-xs font-medium text-red-500">{errors.gender}</span>}
                </div>
              </div>
            </div>

            <hr className="border-slate-100" />

            {/* Professional Information Group */}
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormSelect
                  label="Department"
                  name="department"
                  value={formData.department}
                  onChange={(e) => handleChange('department', e.target.value)}
                  options={Object.values(Department)}
                  error={errors.department}
                  required
                />
                
                <FormInput
                  label="Joining Date & Time"
                  type="datetime-local"
                  name="joiningDate"
                  value={formData.joiningDate}
                  onChange={(e) => handleChange('joiningDate', e.target.value)}
                  error={errors.joiningDate}
                  required
                />
              </div>

              <FormMultiSelect
                label="Skills"
                options={SKILL_OPTIONS}
                value={formData.skills}
                onChange={(val) => handleChange('skills', val)}
                error={errors.skills}
              />
            </div>

            <hr className="border-slate-100" />

            {/* Additional Details Group */}
            <div className="space-y-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-slate-700">Hobbies <span className="text-red-500">*</span></label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {HOBBY_OPTIONS.map((hobby) => (
                    <label key={hobby} className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-all ${formData.hobbies.includes(hobby) ? 'border-teal-500 bg-teal-50' : 'border-slate-200 hover:bg-slate-50'}`}>
                      <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${formData.hobbies.includes(hobby) ? 'bg-teal-500 border-teal-500' : 'border-slate-300 bg-white'}`}>
                         {formData.hobbies.includes(hobby) && <CheckCircle className="w-3 h-3 text-white" />}
                      </div>
                      <input
                        type="checkbox"
                        value={hobby}
                        checked={formData.hobbies.includes(hobby)}
                        onChange={(e) => handleCheckboxChange(e, hobby)}
                        className="sr-only"
                      />
                      <span className={`text-sm ${formData.hobbies.includes(hobby) ? 'text-teal-800 font-medium' : 'text-slate-600'}`}>{hobby}</span>
                    </label>
                  ))}
                </div>
                {errors.hobbies && <span className="text-xs font-medium text-red-500">{errors.hobbies}</span>}
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-slate-700">Address <span className="text-red-500">*</span></label>
                <textarea
                  name="address"
                  rows={3}
                  value={formData.address}
                  onChange={(e) => handleChange('address', e.target.value)}
                  className={`w-full rounded-lg border ${
                    errors.address ? 'border-red-500 focus:ring-red-200' : 'border-slate-300 focus:ring-teal-200'
                  } bg-white px-4 py-2.5 text-slate-900 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-opacity-20 transition-all duration-200`}
                  placeholder="Enter full address..."
                />
                {errors.address && <span className="text-xs font-medium text-red-500">{errors.address}</span>}
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-slate-700">Profile Photo <span className="text-red-500">*</span></label>
                <div className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-lg hover:bg-slate-50 transition-colors ${errors.profilePhoto ? 'border-red-300 bg-red-50' : 'border-slate-300'}`}>
                  <div className="space-y-1 text-center">
                    <div className="mx-auto h-12 w-12 text-slate-400">
                        {formData.profilePhoto ? 
                            <img src={URL.createObjectURL(formData.profilePhoto)} alt="Preview" className="h-full w-full object-cover rounded-full" /> 
                            : <UserPlus className="mx-auto h-12 w-12 text-slate-300" />
                        }
                    </div>
                    <div className="flex text-sm text-slate-600 justify-center">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md font-medium text-teal-600 hover:text-teal-500 focus-within:outline-none"
                      >
                        <span>Upload a file</span>
                        <input id="file-upload" name="profilePhoto" type="file" className="sr-only" accept="image/*" onChange={handleFileChange} />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-slate-500">PNG, JPG, GIF up to 5MB</p>
                    {formData.profilePhoto && <p className="text-sm text-green-600 font-medium">{formData.profilePhoto.name}</p>}
                  </div>
                </div>
                {errors.profilePhoto && <span className="text-xs font-medium text-red-500">{errors.profilePhoto}</span>}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-4 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={handleReset}
                className="flex items-center gap-2 px-6 py-2.5 rounded-lg border border-slate-300 text-slate-700 font-medium hover:bg-slate-50 hover:text-slate-900 transition-colors focus:ring-4 focus:ring-slate-100"
              >
                <Trash2 className="w-4 h-4" />
                Clear
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center gap-2 px-8 py-2.5 rounded-lg bg-teal-600 text-white font-medium hover:bg-teal-700 active:bg-teal-800 transition-all shadow-lg shadow-teal-200 focus:ring-4 focus:ring-teal-100 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Submit Application
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Results Section */}
        {submittedData && (
          <div className="scroll-mt-12">
             <div className="text-center mb-6">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm font-medium animate-fade-in">
                    <CheckCircle className="w-4 h-4" /> Application Submitted Successfully
                </span>
             </div>
            <EmployeeCard data={submittedData} />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;