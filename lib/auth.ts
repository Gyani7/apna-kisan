
import { NextAuthOptions, User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { SupabaseAdapter } from '@next-auth/supabase-adapter';
import GoogleProvider from 'next-auth/providers/google';
import GithubProvider from 'next-auth/providers/github';
import EmailProvider from 'next-auth/providers/email';
import { createTransport } from 'nodemailer';

async function sendVerificationRequest(params) {
  const { identifier, url, provider } = params;
  const { host } = new URL(url);
  const transport = createTransport(provider.server);
  const result = await transport.sendMail({
    to: identifier,
    from: provider.from,
    subject: `Sign in to ${host}`,
    text: text({ url, host }),
    html: html({ url, host, email: identifier }),
  });
  const failed = result.rejected.filter(Boolean);
  if (failed.length) {
    throw new Error(`Email(s) (${failed.join(", ")}) could not be sent`);
  }
}

function html(params: { url: string; host: string; email: string }) {
  const { url, host, email } = params;

  const escapedEmail = encodeURIComponent(email);
  const brandColor = "#346df1";
  const color = {
    background: "#f9f9f9",
    text: "#444",
    mainBackground: "#fff",
    buttonBackground: brandColor,
    buttonBorder: brandColor,
    buttonText: "#fff",
  };

  return `
    <div style="background: ${color.background}; padding: 20px;">
      <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: auto;">
        <tr>
          <td align="center" style="background: ${color.mainBackground}; padding: 40px; border-radius: 8px;">
            <h1 style="color: ${color.text};">Sign in to <strong>${host}</strong></h1>
            <p style="color: ${color.text};">Click the button below to sign in to your account.</p>
            <a href="${url}" target="_blank" style="background: ${color.buttonBackground}; color: ${color.buttonText}; padding: 12px 24px; border-radius: 4px; text-decoration: none; display: inline-block; margin-top: 20px;">
              Sign In
            </a>
            <p style="color: ${color.text}; font-size: 12px; margin-top: 20px;">If you did not request this email, you can safely ignore it.</p>
          </td>
        </tr>
      </table>
    </div>
  `;
}

function text({ url, host }: { url: string; host: string }) {
  return `Sign in to ${host}\n${url}\n\n`;
}

export const authOptions: NextAuthOptions = {
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
      sendVerificationRequest,
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
          const user: User = {
            id: credentials.phone, // Using phone number as ID for this example
            // @ts-ignore
            phone: credentials.phone,
            email: null, // No email when signing in with phone
          };
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
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
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
};