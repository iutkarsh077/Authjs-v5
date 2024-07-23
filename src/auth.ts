import NextAuth, { CredentialsSignin } from "next-auth"
import GoogelAuthProvider from "next-auth/providers/google";
import CredentialProvider from "next-auth/providers/credentials";
import dbConnect from "./lib/dbConnect";
import Auth from "./models/User";
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GoogelAuthProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    CredentialProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email"
        },
        password: {
          label: "Password",
          type: "password"
        }
      },
      authorize: async (credentials: any): Promise<any> => {
        let email = credentials.email;
        let password = credentials.password;

        if (!email || !password) {
          throw new Error("Please provide both email and password.");
        }

        await dbConnect();
        const user = await Auth.findOne({ email: email });
        if (!user) {
          throw new Error("User does not exist.");
        }

        if (user.password !== password) {
          throw new Error("Invalid Password");
        }

        console.log("After all done", user);
        return { email: user.email, name: user.name, message: "success" };
      }
    })
  ],
  pages: {
    signIn: '/login'
  },
  callbacks: {
    signIn: async ({ user, account, profile, email }): Promise<any> => {
      if (account?.provider === "google") {
        try {
          const { email, name, id } = user;
          await dbConnect();

          const alreadyHaveUser = await Auth.findOne({ email: email });
          if (!alreadyHaveUser) {
            await Auth.create({
              email,
              name,
              googleId: id
            })
          }
          return true;
        } catch (error) {
          throw new Error("Something went wrong while authorize with google");
        }
      }
      return false;
    }
  }
})