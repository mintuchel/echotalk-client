import { FormCard } from "./FormCard";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Submit } from "./Submit";
import { AuthLayout } from "./layout";
import axios from "axios";
import { useState } from "react";

export function LoginForm() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8000/auth/login", {
        email,
        password,
      });

      console.log("로그인 성공:", response.data);
      // TODO: 성공 시 처리 (예: 토큰 저장, 페이지 이동 등)
    } catch (error: any) {
      console.error("로그인 실패:", error.response?.data || error.message);
      // TODO: 에러 처리
    }
  };

  return (
    <AuthLayout>
    <FormCard
      title="로그인"
      footer={{ label: "아직 계정이 없으신가요?", href: "/signup" }}
    >
        <form onSubmit={handleSubmit} className="space-y-6">
        {/* 이메일 */}
        <div className="space-y-1">
          <Label htmlFor="email">이메일</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="example@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}  
          />
        </div>
        {/* 비밀번호 */}
        <div className="space-y-1">
          <Label htmlFor="password">비밀번호</Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}  
          />
        </div>
        <Submit className="w-full">로그인</Submit>
      </form>
      </FormCard>
    </AuthLayout>
  );
}