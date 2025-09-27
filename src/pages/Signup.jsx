// import veriqosLogo from "../assets/veriqos.png";
import { SignUpForm } from "@/components/signup-form";
import veriqosLogo from "../assets/veriqosRealLogo.png";
import { Link } from "react-router-dom";
import signupImage from "../assets/signup_image.png";
import { useForm } from "react-hook-form";

function Signup() {
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    reset();
  };

  return (
    <div className="grid min-h-svh lg:grid-cols-2 no-scrollbar overflow-y-hidden">
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
            <SignUpForm
              submit={handleSubmit}
              register={register}
              onSubmit={onSubmit}
            />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <img
          src={signupImage}
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}

export default Signup;
