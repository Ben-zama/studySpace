import { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/use-auth';

export function AuthPage() {
  const { login, register } = useAuth();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form states
  const [name, setName] = useState('');
  const [level, setLevel] = useState('');
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      if (activeTab === 'login') {
        await login(email, password);
      } else {
        await register(name, email, password, level, gender, phone);
      }
      
      // Navigate to home after successful auth
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-12 flex items-center justify-center px-4 sm:px-6 lg:px-8 relative">
      {/* Back Button */}
      <div className="absolute top-6 left-6 md:top-10 md:left-10 z-20">
        <Link 
          to="/" 
          className="flex items-center gap-2 text-white/80 hover:text-white transition-colors bg-white/10 hover:bg-white/20 backdrop-blur-md px-4 py-2 rounded-full font-medium text-sm border border-white/10"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to homepage
        </Link>
      </div>

      <div className="w-full max-w-5xl glass-panel rounded-[2rem] overflow-hidden flex flex-col md:flex-row shadow-2xl animate-fade-in relative z-10 border border-white/20">
        
        {/* Branding Side */}
        <div className="hidden md:flex flex-col justify-between p-12 w-1/2 bg-navy relative overflow-hidden">
          {/* Subtle background decoration */}
          <div className="absolute top-0 right-0 -translate-y-1/3 translate-x-1/3 w-[500px] h-[500px] bg-teal rounded-full blur-[120px] opacity-30 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-[400px] h-[400px] bg-blue-500 rounded-full blur-[100px] opacity-20 pointer-events-none"></div>
          
          <div className="relative z-10">
            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-8 backdrop-blur-md border border-white/20">
              <svg className="w-6 h-6 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h2 className="text-4xl font-bold font-geist text-white mb-6 leading-tight">Master your studies with <span className="text-teal">StudySpace</span></h2>
            <p className="text-white/80 text-lg leading-relaxed max-w-md">
              Join thousands of students organizing their academics, connecting with peers, and elevating their learning experience in a unified platform.
            </p>
          </div>

          <div className="relative z-10 mt-12 flex items-center gap-4">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-navy bg-gradient-to-br from-teal/20 to-blue-500/20 flex items-center justify-center backdrop-blur-sm">
                  <span className="text-teal font-bold text-xs">{i}</span>
                </div>
              ))}
            </div>
            <p className="text-white/60 text-sm font-medium">Join 10,000+ top students</p>
          </div>
        </div>

        {/* Form Side */}
        <div className="w-full md:w-1/2 p-8 md:p-12 bg-white/60 backdrop-blur-xl flex flex-col justify-center">
          <div className="w-full max-w-md mx-auto">
            <div className="text-center md:text-left mb-8">
              <h1 className="text-navy text-3xl font-bold font-geist mb-2">Welcome Back</h1>
              <p className="text-navy/70">Enter your details to access your account.</p>
            </div>
            
        <Tabs value={activeTab} onValueChange={(v) => { setActiveTab(v as any); setError(null); }} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8 bg-navy/5 p-1 rounded-xl">
            <TabsTrigger value="login" className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-navy data-[state=active]:shadow-sm transition-all font-medium">Login</TabsTrigger>
            <TabsTrigger value="signup" className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-navy data-[state=active]:shadow-sm transition-all font-medium">Sign Up</TabsTrigger>
          </TabsList>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="p-4 bg-red-50 text-red-700 text-sm rounded-xl border border-red-100 flex items-start gap-3">
                <svg className="w-5 h-5 text-red-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                <span>{error}</span>
              </div>
            )}
            
            <TabsContent value="signup" className="space-y-5 mt-0">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-navy font-medium">Full Name</Label>
                <Input 
                  id="name" 
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required={activeTab === 'signup'}
                  className="rounded-xl border-navy/10 focus-visible:ring-teal h-11 bg-white/50"
                />
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="level" className="text-navy font-medium">Level</Label>
                  <Input 
                    id="level" 
                    placeholder="e.g. Freshman"
                    value={level}
                    onChange={(e) => setLevel(e.target.value)}
                    required={activeTab === 'signup'}
                    className="rounded-xl border-navy/10 focus-visible:ring-teal h-11 bg-white/50"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="gender" className="text-navy font-medium">Gender</Label>
                  <select 
                    id="gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    required={activeTab === 'signup'}
                    className="flex h-11 w-full rounded-xl border border-navy/10 bg-white/50 px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-teal disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="" disabled>Select...</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-navy font-medium">Phone Number</Label>
                <Input 
                  id="phone" 
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required={activeTab === 'signup'}
                  className="rounded-xl border-navy/10 focus-visible:ring-teal h-11 bg-white/50"
                />
              </div>
            </TabsContent>
            
            <div className="space-y-2 mt-2">
              <Label htmlFor="email" className="text-navy font-medium">Email Address</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="john@example.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="rounded-xl border-navy/10 focus-visible:ring-teal h-11 bg-white/50"
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-navy font-medium">Password</Label>
                {activeTab === 'login' && (
                  <a href="#" className="text-xs text-teal hover:text-teal/80 font-medium">Forgot password?</a>
                )}
              </div>
              <Input 
                id="password" 
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="rounded-xl border-navy/10 focus-visible:ring-teal h-11 bg-white/50"
              />
            </div>
            
            <Button type="submit" className="w-full bg-teal text-navy hover:brightness-105 font-bold mt-8 rounded-xl h-12 text-md shadow-lg shadow-teal/20 transition-all active:scale-[0.98]" disabled={isLoading}>
              {isLoading ? 'Please wait...' : (activeTab === 'login' ? 'Sign in to StudySpace' : 'Create Account')}
            </Button>
          </form>
        </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
