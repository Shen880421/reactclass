import GoogleProvider from "next-auth/providers/google";
import connectDB from "@/config/database";
import User from "@/models/User";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ profile }) {
      try {
        console.log("SignIn callback - profile:", profile);
        await connectDB();

        const userExists = await User.findOne({ email: profile.email });
        console.log("User exists:", userExists);

        if (!userExists) {
          const username = profile.name.slice(0, 20);
          const newUser = await User.create({
            email: profile.email,
            username: username,
            image: profile.picture,
          });
          console.log("New user created:", newUser);
        }

        return true;
      } catch (error) {
        console.log("SignIn error:", error);
        return false;
      }
    },
    async session({ session }) {
      try {
        console.log("Session callback - initial session:", session);
        await connectDB();

        const user = await User.findOne({ email: session.user.email });
        console.log("Found user in session callback:", user);

        if (user) {
          session.user.id = user._id.toString();
          console.log("Session with user ID:", session);
        } else {
          console.log("User not found in database");
        }

        return session;
      } catch (error) {
        console.log("Session callback error:", error);
        return session;
      }
    },
  },
};
