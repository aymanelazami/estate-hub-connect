
import { Building } from 'lucide-react';
import { MainNav } from '@/components/MainNav';
import { Footer } from '@/components/Footer';
import { SignUpForm } from '@/components/auth/SignUpForm';

const SignUp = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <MainNav />

      <div className="flex-1 flex flex-col md:flex-row">
        {/* Left side - Image */}
        <div className="hidden md:block md:w-1/2 bg-cover bg-center" 
             style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=1000&auto=format&fit=crop)' }}>
          <div className="h-full w-full bg-black/20 backdrop-blur-[2px] p-12 flex items-center justify-center">
            <div className="glass p-8 rounded-xl max-w-md">
              <h2 className="text-white text-2xl font-bold mb-4">Join EstateHub Today</h2>
              <p className="text-white/90 mb-6">
                Connect with clients, list properties, and grow your real estate business with our comprehensive platform.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-white/20 p-2 rounded-full mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-white">For Agents</h3>
                    <p className="text-white/80 text-sm">List properties and connect with potential clients</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-white/20 p-2 rounded-full mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-white">For Agencies</h3>
                    <p className="text-white/80 text-sm">Manage your team and showcase your listings</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Form */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-8">
          <div className="absolute top-20 md:relative md:top-0 md:hidden mx-auto">
            <Building className="h-12 w-12 text-estate-600" strokeWidth={1.5} />
          </div>
          <SignUpForm />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SignUp;
