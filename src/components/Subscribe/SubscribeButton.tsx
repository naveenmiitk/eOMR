"use client";
import React, { useTransition } from 'react'
import { Button } from '../ui/button';
import { Lock } from 'lucide-react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

interface SubscribeButtonProps {
    id: string;
}

const SubscribeButton:React.FC<SubscribeButtonProps> = ({id}) => {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();
    const handleSubmit = async () => {
        startTransition(async () => {
          const mail = await fetch("/api/modulesubscribe", {
            method: "PUT",
            body: JSON.stringify({id}),
            headers: { "Content-Type": "application/json" },
          });
  
          if (mail.status === 200) {
            toast.success("Successfully Subscribed!");
          }
          router.push('/testseries');
        });
    }
    
  return (
    <div className="flex items-center justify-end max-w-4xl mx-auto">
      <Button onClick={handleSubmit} className="max-w-fit cursor-pointer" asChild>
        <div className="flex items-center">
          <Lock className="mr-2 h-4 w-4" />
          <h1>Subscribe</h1>
        </div>
      </Button>
    </div>
  );
}

export default SubscribeButton
