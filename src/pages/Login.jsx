import { LoginForm } from "@/components/login-form";
import { Link } from "react-router-dom";
import veriqosLogo from "../assets/veriqosRealLogo.png";

function Login() {
  return (
    <div className="grid min-h-screen overflow-hidden lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link to="/" className="flex items-center gap-2 font-medium">
            <div className="text-primary-foreground flex w-48 items-center justify-center rounded-md">
              <img src={veriqosLogo} className="w-48 h-20" />
            </div>
            {/* <span className="bg-gradient-to-r from-[#021f33] to-[#00859D] bg-clip-text text-transparent">
              Veriqos Technologies.
            </span> */}
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <img
          src="https://ui.shadcn.com/placeholder.svg"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}

export default Login;
