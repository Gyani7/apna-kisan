import NextAuth from "next-auth";
import { SupabaseAdapter } from "@auth/supabase-adapter";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import EmailProvider from "next-auth/providers/email";
import CredentialsProvider from "next-auth/providers/credentials";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    EmailProvider({
      from: process.env.EMAIL_FROM,
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: Number(process.env.EMAIL_SERVER_PORT),
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
    }),
    CredentialsProvider({
      name: 'Phone',
      credentials: {
        phone: { label: "Phone", type: "text", placeholder: "Enter your phone number" },
        otp: { label: "OTP", type: "text", placeholder: "Enter your OTP" },
      },
      async authorize(credentials, req) {
        // This is where you would verify the OTP
        // In this example, we'll just accept any OTP for demonstration purposes
        if (credentials?.phone && credentials?.otp) {
          const user = {
            id: credentials.phone, // Using phone number as ID for this example
            phone: credentials.phone,
            email: null, // No email when signing in with phone
          };
          // @ts-ignore
          return user;
        }
        return null;
      },
    }),
  ],
  adapter: SupabaseAdapter({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    secret: process.env.SUPABASE_SERVICE_ROLE_KEY!,
  }),
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        // @ts-ignore
        session.user.id = token.sub!;
        // @ts-ignore
        session.user.phone = token.phone;
      }
      return session;
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        // @ts-ignore
        token.phone = user.phone;

      }
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
  },
  pages: {
    signIn: '/login',
  }
});
