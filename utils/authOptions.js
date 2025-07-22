import GoogleProvider from "next-auth/providers/google";
import connectDB from "@/config/database";
import User from "@/models/User";

// 匯出認證選項物件
export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID, // Google 用戶端 ID
      clientSecret: process.env.GOOGLE_CLIENT_SECRET, // Google 用戶端密鑰
      authorization: {
        params: {
          prompt: "consent", // 強制要求用戶同意
          access_type: "offline", // 取得離線權限
          response_type: "code", // 回傳授權碼
        },
      },
    }),
  ],
  callbacks: {
    // 使用者成功登入時呼叫
    async signIn({ profile }) {
      try {
        console.log("User trying to sign in:", profile.email);
        // 暫時移除資料庫操作，直接允許登入
        return true;
      } catch (error) {
        console.log("SignIn error:", error);
        return false;
      }
    },
    // 修改 session 物件的 callback 函式
    async session({ session }) {
      try {
        console.log("Session callback:", session.user.email);
        // 暫時移除資料庫操作
        return session;
      } catch (error) {
        console.log("Session error:", error);
        return session;
      }
    },
  },
};
