import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { redirect } from "next/navigation";
import { error } from "console";
import Auth from "@/models/User";
import dbConnect from "@/lib/dbConnect";

const Login = () => {
  const signUp = async (data: FormData) => {
    "use server";
    let name = data.get("name");
    let email = data.get("email");
    let password = data.get("password");

    if (!name || !email || !password) {
      throw new Error("Fields are empty");
    }

    await dbConnect();
    const findUser = await Auth.findOne({ email: email });

    if (findUser) {
      throw new Error("User already exist");
    }

    const createUser = await Auth.create({
        name: name,
        email: email,
        password: password
    })
    redirect("/login");
  };
  return (
    <Card className="h-screen w-screen overflow-hidden flex flex-col justify-center items-center border-2 border-gray-700">
      <CardHeader>
        <CardTitle>Signup</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={signUp} className="flex flex-col gap-4">
          <Input type="text" name="name" placeholder="your name here..." />

          <Input type="email" name="email" placeholder="email here..." />
          <Input
            type="password"
            name="password"
            placeholder="Password here..."
          />
          <Button type="submit">Create Account</Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col">
        <form action="">
          <Button className="bg-gray-200" variant={"outline"}>
            Signup With Google
          </Button>
        </form>

        <Link href="/login" className="text-blue-500 hover:text-blue-700">
          Already have an account?
        </Link>
      </CardFooter>
    </Card>
  );
};

export default Login;
