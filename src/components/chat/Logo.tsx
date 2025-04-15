import { Link } from "react-router-dom"

export function Logo() {
  return (
    <Link to="http://localhost:8000"className="flex items-center gap-2">
      <img width={40} height={40} src="https://www.echoit.co.kr/images/echoSymbol.png" alt="logo" />
      <h1 className="text-2xl font-bold">EchoTalk</h1>
    </Link>
  );
}