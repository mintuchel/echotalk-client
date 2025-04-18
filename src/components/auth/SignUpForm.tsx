import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { FormCard } from "./FormCard";
import { AuthLayout } from "./layout";
import { Submit } from "./Submit";
import { useState } from "react";
import axios from "axios";

export function SignUpForm() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // 페이지 리로드 방지

    try {
      const response = await axios.post("http://localhost:8000/auth/signup", {
        name,
        email,
        password,
      });

      console.log("회원가입 성공:", response.data);
      // TODO: 회원가입 성공 후 처리 (예: 로그인 페이지로 리다이렉트, 사용자 안내 메시지 등)
    } catch (error: any) {
      console.error("회원가입 실패:", error.response?.data || error.message);
      // TODO: 에러 처리 (예: 사용자에게 에러 메시지 표시)
    }
  };

  return (
    <AuthLayout>
    <FormCard
      title="회원가입"
      footer={{ label: "이미 계정이 있으신가요?", href: "/login" }}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 이름 */}
        <div className="space-y-1">
          <Label htmlFor="name">이름</Label>
          <Input
            id="name"
            name="name"
            placeholder="이름을 입력해주세요"
            onChange={(e) => setName(e.target.value)}  
          />
        </div>
        {/* 이메일 */}
        <div className="space-y-1">
          <Label htmlFor="email">이메일</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="example@example.com"
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
            onChange={(e) => setPassword(e.target.value)}  
          />
        </div>
        <Submit className="w-full">가입하기</Submit>
      </form>
      </FormCard>
    </AuthLayout>
  );
}