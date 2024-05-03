import React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Reset = () => {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Password Reset Request</CardTitle>
        <CardDescription>
          Confirm the email below and click proceed. You will recieve otp on
          your email.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <input
                className="border outline-none p-1 text-md rounded-md pl-2"
                id="name"
                placeholder="Email"
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-end ">
        <Button>Proceed</Button>
      </CardFooter>
    </Card>
  );
};

export default Reset;
