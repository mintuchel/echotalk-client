import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { FormCard } from "./FormCard";
import { AuthLayout } from "./layout";
import { Submit } from "./Submit";
import { useState } from "react";
import { signup } from "@/apis/auth";
import { useNavigate } from "react-router-dom";

export function SignUpForm() {
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // 폼 제출 시 자동 새로고침을 막아줌
    // 자동 새로고침이 되면 아래 signup 비동기 함수로 인자값들이 제대로 안넘어갈 수 있음
    e.preventDefault();

    try {
      const response = await signup(name, email, password);
      console.log("회원가입 성공:", response.data);
      navigate("/");
    } catch (error) {
      console.error("회원가입 실패:", error);
    }
  };

  return (
    <AuthLayout>
    <FormCard
      title="회원가입"
      footer={{ label: "이미 계정이 있으신가요?", href: "auth/login" }}
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