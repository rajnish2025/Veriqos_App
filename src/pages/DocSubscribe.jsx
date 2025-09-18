import React, { useRef } from "react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useForm, ValidationError } from "@formspree/react";

const DocSubscribe = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const location = useLocation();
  const emailRef = useRef();
  const [state, handleSubmit] = useForm("mandggpl");

  useEffect(() => {
    setIsDialogOpen(true);
  }, [location.pathname]);

  if (state.succeeded) {
    console.log(state, emailRef.current.value);
    localStorage.setItem("email", emailRef.current.value);
    setIsDialogOpen(false);
    window.location.reload();
  }

  return (
    <div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[550px] py-10">
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>Subscribe To Docs</DialogTitle>
              <DialogDescription>
                Write your email here. Click subscribe when you&apos;re done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4">
              <div className="grid gap-3">
                <Label htmlFor="email-1">Email</Label>
                <Input
                  id="email-1"
                  name="email"
                  type="email"
                  placeholder="example@gmail.com"
                  ref={emailRef}
                />
                <ValidationError
                  prefix="Email"
                  field="email"
                  errors={state.errors}
                />
              </div>
            </div>
            <DialogFooter className="mt-5">
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit" disabled={state.submitting}>
                Subscribe
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DocSubscribe;
