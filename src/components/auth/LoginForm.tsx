import { FormCard } from "./FormCard";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Submit } from "./Submit";
import { AuthLayout } from "./layout";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "@/apis/auth";
import { Link } from "react-router-dom"
import logo from "@/assets/logo.png"

export function LoginForm() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // 폼 제출 시 자동 새로고침을 막아줌
    // 자동 새로고침이 되면 아래 signup 비동기 함수로 인자값들이 제대로 안넘어갈 수 있음
    e.preventDefault();

    try {
      const response = await login(email, password);
      console.log("로그인 성공:", response.data);
      navigate("/chat");
    } catch (error) {
      console.error("로그인 실패:", error);
    }
  };

  return (
    <AuthLayout>
      <div className="flex flex-col items-center justify-center min-h-screen w-full gap-6">
        <Link to="http://localhost:8000" className="flex items-center gap-2">
          <img width={60} height={60} src={logo} alt="logo"/>
          <h1 className="text-5xl font-bold">EchoTalk</h1>
        </Link>
        <FormCard title="로그인" footer={{ label: "아직 계정이 없으신가요?", href: "/signup" }}>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 이메일 */}
            <div className="space-y-1">
              <Label htmlFor="email">이메일</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="example@echoit.co.kr"
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
      </div>
    </AuthLayout>
  );
}