
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { doctorUser, patientUser } from "@/lib/data";
import { SendHorizonal } from "lucide-react";

export default function ChatPage() {
  const messages = [
    { from: 'doctor', text: 'Hello! How are you feeling today?', time: '10:00 AM' },
    { from: 'patient', text: 'I am feeling a bit better, thanks for asking.', time: '10:01 AM' },
    { from: 'doctor', text: 'That is great to hear. Remember to take your medication.', time: '10:02 AM' },
    { from: 'patient', text: 'Yes, I will. Thank you, doctor.', time: '10:03 AM' },
  ];

  return (
    <div className="h-full flex flex-col">
      <Card className="flex-1 flex flex-col">
        <CardHeader className="flex flex-row items-center gap-4">
           <Avatar>
            <AvatarImage src={`https://picsum.photos/seed/${doctorUser.avatar}/100/100`} alt={doctorUser.name} />
            <AvatarFallback>{doctorUser.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <CardTitle>{doctorUser.name}</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex items-end gap-2 ${
                message.from === 'patient' ? 'justify-end' : ''
              }`}
            >
              {message.from === 'doctor' && (
                <Avatar className="h-8 w-8">
                  <AvatarImage src={`https://picsum.photos/seed/${doctorUser.avatar}/100/100`} alt={doctorUser.name} />
                  <AvatarFallback>{doctorUser.name.charAt(0)}</AvatarFallback>
                </Avatar>
              )}
              <div
                className={`max-w-xs rounded-lg p-3 ${
                  message.from === 'patient'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted'
                }`}
              >
                <p className="text-sm">{message.text}</p>
                <p className="text-xs text-right mt-1 opacity-70">{message.time}</p>
              </div>
               {message.from === 'patient' && (
                <Avatar className="h-8 w-8">
                  <AvatarImage src={`https://picsum.photos/seed/${patientUser.avatar}/100/100`} alt={patientUser.name} />
                  <AvatarFallback>{patientUser.name.charAt(0)}</AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
        </CardContent>
        <CardFooter className="p-4 border-t">
          <div className="flex w-full items-center gap-2">
            <Input placeholder="Type your message..." />
            <Button size="icon">
              <SendHorizonal className="h-5 w-5" />
              <span className="sr-only">Send</span>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
