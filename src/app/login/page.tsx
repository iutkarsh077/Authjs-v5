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
import { signIn } from "@/auth";
import { redirect } from "next/navigation";

const Login = () => {
    const loginHandler = async (data: FormData) =>{
        "use server";
        const email = data.get("email");
        const password = data.get("password");

        if(!email || !password){
            throw new Error("Please provide all fields");
        }

        try {
            await signIn("credentials", {
                email,
                password,
                redirect: false,
                // redirectTo: '/'
            })
            // redirect("/");
        } catch (error) {
            throw new Error("not able to login")
        }
    }
  return (
    <Card className="h-screen w-screen overflow-hidden flex flex-col justify-center items-center border-2 border-gray-700">
      <CardHeader>
        <CardTitle>Login</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={loginHandler} className="flex flex-col gap-4">
          <Input type="email" name="email" placeholder="email here..." />
          <Input type="password" name="password" placeholder="Password here..." />
          <Button type="submit">Login Now</Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col">
        <form action={async()=>{
            "use server";
            await signIn("google")
        }}>
          <Button className="bg-gray-200" variant={"outline"}>Login With Google</Button>
        </form>

        <Link href="/signup" className="text-blue-500 hover:text-blue-700">Dont have an account?</Link>
      </CardFooter>
    </Card>
  );
};

export default Login;
