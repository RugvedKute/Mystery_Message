"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { usePathname } from "next/navigation";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { Loader2 } from "lucide-react";

const page = () => {
  const messageArray = [
    `If you could instantly learn any new skill or subject, what would it be and why?`,
    `What is your favorite project you’ve worked on, and what made it special for you?`,
    `What is your favorite hobby, and why?`,
  ];
  const [messages, setMessages] = useState(messageArray);
  const [anonymousMessage, setAnonymousMessage] = useState("");
  const pathname = usePathname();
  const username = pathname.split("/")[2];
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const onButtonClick = (message: string) => {
    setAnonymousMessage(message);
  };

  const handleSendMessage = async () => {
    const data = {
      username,
      content: anonymousMessage,
    };
    try {
      const response = await axios.post("/api/send-message", data);

      toast({
        title: "Message sent!",
        description: "Your message has been sent.",
      });
    } catch (err) {
      console.log(err);
      toast({
        title: "Error",
        description: "User is not accepting messages right now",
        variant: "destructive",
      });
    } finally {
      setAnonymousMessage("");
    }
  };

  const generateAIMessages = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`/api/suggest-messages`);

      console.log(response);
      setMessages(response.data.messages);
    } catch (err) {
      console.log(err);

      toast({
        title: "Failed",
        description: "Failed to generate messages",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container max-w-4xl">
      <div className="mt-10">
        <h1 className="text-4xl font-bold text-center">Public Profile Link</h1>
        <p className="mt-6 text-sm font-semibold">
          Send Anonymous Message to @{username}
        </p>
        <div className="mt-2 w-full gap-2 flex flex-col items-center">
          <Textarea
            placeholder="Type your message here."
            minLength={10}
            onChange={(e) => {
              setAnonymousMessage(e.target.value);
            }}
            value={anonymousMessage}
          />
          <Button
            className="w-fit"
            disabled={anonymousMessage.length < 10}
            onClick={handleSendMessage}
          >
            Send It
          </Button>
        </div>
      </div>

      <div className="mt-10">
        <Button onClick={generateAIMessages}>Suggest Messages</Button>
        <p className="mt-6">Click on any message below to select it.</p>
        <div className="mt-3">
          <Card>
            <CardHeader>
              <span className="text-2xl font-semibold">Messages</span>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="h-[100%] w-[100%] flex items-center justify-center">
                  <Loader2 className="animate-spin" />
                </div>
              ) : (
                messages?.map((message, index) => (
                  <div className="mt-4 text-center">
                    <Button
                      key={index}
                      className="w-full"
                      variant={"outline"}
                      onClick={() => onButtonClick(message)}
                    >
                      {message}
                    </Button>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      <Separator className="mt-6 mb-5"></Separator>
      <div className="flex flex-col items-center pb-10">
        <p>Get Your Message Board</p>
        <Link href={"/sign-up"}>
          <Button className="mt-2">Create Your Account</Button>
        </Link>
      </div>
    </div>
  );
};

export default page;
