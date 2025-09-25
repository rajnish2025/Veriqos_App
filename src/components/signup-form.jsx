import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

export function SignUpForm({ className, ...props }) {
  const { register, handleSubmit, reset } = useForm();
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-[#00538C] to-[#00859D] bg-clip-text text-transparent">
          Create New account
        </h1>
        <p className="text-balance text-sm text-muted-foreground">
          Enter your email below to signup to your account
        </p>
      </div>
      <div className="grid gap-6">
        <form className="grid gap-6">
          <div className="grid gap-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" type="text" placeholder="your name" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="mobile">Mobile Number</Label>
            <Input id="mobile" type="text" placeholder="+91XXXXXXXX" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="name">Company Name</Label>
            <Input id="name" type="text" placeholder="company name" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <Link
                to="/forget-password"
                className="ml-auto text-sm underline-offset-4 hover:underline"
              >
                Forgot your password?
              </Link>
            </div>
            <Input id="password" type="password" required />
          </div>
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-[#00538C] to-[#00859D]"
          >
            SignUp
          </Button>
        </form>
      </div>
      <div className="text-center text-sm">
        Already have an account?{" "}
        <Link to="/login" className="underline underline-offset-4">
          Login
        </Link>
      </div>
    </form>
  );
}
