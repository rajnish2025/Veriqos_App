import React, { useRef } from 'react'
import { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';


const DocSubscribe = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const location  = useLocation();
    const emailRef = useRef();

    useEffect(() => {
    setIsDialogOpen(true);
    }, [location.pathname]);
    const handleSubscribe = () =>{
        const email = emailRef.current.value;
        if(email){
            localStorage.setItem('email', email);
            setIsDialogOpen(false);
            window.location.reload();
        } 
    }   
    return (
    <div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        
            <DialogContent className="sm:max-w-[550px] py-10">
            <DialogHeader>
                <DialogTitle>Subscribe To Docs</DialogTitle>
                <DialogDescription>
                Write your email here. Click subscribe when you&apos;re
                done.
                </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4">
                <div className="grid gap-3">
                <Label htmlFor="email-1">Email</Label>
                <Input id="email-1" name="email" placeholder="example@gmail.com" ref={emailRef}/>
                </div>
            </div>
            <DialogFooter>
                <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button onClick={handleSubscribe}>Subscribe</Button>
            </DialogFooter>
            </DialogContent>
        </Dialog>
    </div>
    );
}

export default DocSubscribe;



