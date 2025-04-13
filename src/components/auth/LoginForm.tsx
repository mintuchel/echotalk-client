import { FormCard } from "./FormCard";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Submit } from "./Submit";

export function LoginForm() {

  return (
    <FormCard
      title="로그인"
      footer={{ label: "아직 계정이 없으신가요?", href: "/signup" }}
    >
      <form className="space-y-6">
        {/* 이메일 */}
        <div className="space-y-1">
          <Label htmlFor="email">이메일</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="example@example.com"
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
          />
        </div>
        <Submit className="w-full">로그인</Submit>
      </form>
    </FormCard>
  );
}